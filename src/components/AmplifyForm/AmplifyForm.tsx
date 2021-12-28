import { VFC } from 'react';
import { Storage } from 'aws-amplify';
import FormComponent from '../FormComponent';
import { formSchemaFor } from '../../utils/form-schema';
import { parseObject } from '../../utils/parse-object';
import { FormikHelpers } from 'formik';
import lodashSet from 'lodash/set';
import lodashGet from 'lodash/get';
import camelCase from 'lodash/camelCase';
import capitalize from 'lodash/capitalize';
import {
  AmplifyFormProps,
  FormSchema,
  FileWithSize,
  FormValues,
  FileWithStorageKey,
  ObjectWithKey,
  FileFields,
  TextAreas,
  Messages,
  FieldsProps,
} from '../../types';

const AmplifyForm: VFC<AmplifyFormProps> = ({
  graphQLJSONSchema,
  entity,
  onSubmit,
  label = entity,
  textAreas,
  fieldsSize,
  fieldsProps,
  labelMap,
  imageFields,
  fileFields,
  relationships,
  storageConfig,
  theme,
  ...rest
}) => {
  const { storagePrefix = '', storageLevel = 'public' } = storageConfig || {};

  const errorMessageFor = (
    fieldname: string,
    kind?: string,
    images?: boolean
  ) => {
    if (kind) {
      if (images) {
        return `Unable to set '${fieldname}' as image field: '${fieldname}' does not exist in the schema`;
      }
      return `Unable to set '${fieldname}' as ${kind} field: '${fieldname}' does not exist in the schema`;
    }
    return `Unable to update '${fieldname}' props': '${fieldname}' does not exist in the schema`;
  };

  const updateFormSchema: (
    fields: TextAreas | FileFields | FieldsProps,
    kind?: string,
    images?: boolean
  ) => void = (fields, kind, images = false) => {
    if (Array.isArray(fields)) {
      fields.forEach(fieldname => {
        if (!lodashGet(formSchema, fieldname))
          throw new Error(errorMessageFor(fieldname, kind, images));
        if (typeof fieldname == 'string') {
          kind ? lodashSet(formSchema, `${fieldname}.kind`, kind) : null;
          if (images) lodashSet(formSchema, `${fieldname}.fileType`, 'image/*');
        }
      });
    } else {
      Object.keys(fields).forEach(fieldname => {
        if (!lodashGet(formSchema, fieldname))
          throw new Error(errorMessageFor(fieldname, kind, images));
        kind ? lodashSet(formSchema, `${fieldname}.kind`, kind) : null;
        const fieldProps = fields[fieldname];
        Object.keys(fieldProps).forEach(prop => {
          const value = lodashGet(fieldProps, prop);
          lodashSet(formSchema, `${fieldname}.${prop}`, value);
        });
      });
    }
  };

  // Create formSchema
  const formSchema = formSchemaFor(
    graphQLJSONSchema,
    entity,
    'create',
    labelMap
  );

  if (fieldsProps) updateFormSchema(fieldsProps);
  if (fileFields) updateFormSchema(fileFields, 'file');
  if (imageFields) updateFormSchema(imageFields, 'file', true);
  if (textAreas) updateFormSchema(textAreas, 'textarea');

  // Add fields size
  if (fieldsSize) {
    Object.keys(fieldsSize).forEach(fieldname => {
      if (!lodashGet(formSchema, fieldname))
        console.warn(
          `Unable to set field size for fiels '${fieldname}': '${fieldname}' does not exist in the schema`
        );
      lodashSet(formSchema, `${fieldname}.fieldSize`, fieldsSize[fieldname]);
    });
  }

  // Add relationships
  if (relationships) {
    relationships.forEach(relationship => {
      const relationEntity = capitalize(relationship.entity);
      const path =
        relationship.path || camelCase(`${entity}${relationEntity}Id`);
      if (lodashGet(formSchema, `${path}.kind`) !== 'relationship')
        throw new Error(
          `Error in relationship definition : Relationship with ${relationship.entity} doesn't exist in ${entity} (looking for field '${path}')`
        );

      const options = relationship.items.map(item => {
        const label = lodashGet(item, relationship.labelField);
        if (!label) {
          console.error(
            `Error in relationship definition : ${relationship.entity} items:`,
            relationship.items
          );
          throw new Error(
            `Error in relationship definition : ${
              relationship.labelField
            } does not exist in ${capitalize(
              relationship.entity
            )} items (see console logs)`
          );
        } else if (typeof label == 'string') {
          return {
            label: label,
            value: item.id,
          };
        } else if (typeof label == 'number') {
          return {
            label: label.toString(),
            value: item.id,
          };
        } else {
          throw new Error(
            `Error in relationship definition : ${
              relationship.labelField
            } in 'items' must be a string or a number (${
              relationship.labelField
            } is of type '${typeof label}')`
          );
        }
      });
      lodashSet(formSchema, `${path}.options`, options);

      relationship.label
        ? lodashSet(formSchema, `${path}.label`, relationship.label)
        : null;
      relationship.size
        ? lodashSet(formSchema, `${path}.size`, relationship.size)
        : null;
    });
  }

  const uploadFile = async (file: FileWithSize) => {
    try {
      const putResult = await Storage.put(storagePrefix + file.name, file, {
        level: storageLevel,
        contentType: file.type,
      });
      return putResult.key;
    } catch (response) {
      if (response instanceof Error) {
        const error = response as Error;
        throw error;
      } else {
        const { errors } = response as any as { errors: { message: string }[] };
        console.error(...errors);
        throw new Error(errors.map(error => error.message).join(','));
      }
    }
  };

  const uploadFiles = async (values: FormValues, fileFieldName: string) => {
    if (Array.isArray(values[fileFieldName])) {
      const files = values[fileFieldName] as FileWithSize[];
      if (files.length) {
        return await Promise.all(
          files.map(async file => {
            const fileWithStorage = file as FileWithStorageKey;
            fileWithStorage.storageKey = await uploadFile(file);
            return fileWithStorage;
          })
        );
      }
      return;
    } else {
      const file = values[fileFieldName] as FileWithStorageKey;
      if (file.name) {
        file.storageKey = await uploadFile(file);
        return file;
      }
      return;
    }
  };

  const submitAndUpload = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    const { resetForm, setSubmitting } = formikHelpers;
    try {
      await Promise.all(
        Object.keys(formSchema).map(async fieldname => {
          const fieldProps = formSchema[fieldname] as FormSchema;
          if (fieldProps.kind == 'file')
            values[fieldname] = await uploadFiles(values, fieldname);
        })
      );
      trimValues(values);
      onSubmit ? await onSubmit(values) : null;
      resetForm();
    } catch (error) {
      const typedError = error as Error;
      console.error('AmplifyForm has encountered an error:', typedError);
      console.error('values:', values);
      alert(`Error : ${typedError.message} (see console logs)`);
    } finally {
      setSubmitting(false);
    }
  };

  const trimValues = (values: FormValues) => {
    const action = (
      object: ObjectWithKey,
      _key: string,
      keyWithPrefix: string,
      value: any
    ) => {
      if (value == '') {
        lodashSet(object, keyWithPrefix, null);
      }
    };
    parseObject(values, action);
  };

  const messages: Messages = {
    invalidError: labelMap?.get('message:invalidError'),
    required: labelMap?.get('message:required'),
    select: labelMap?.get('message:select'),
    submitAction: labelMap?.get('message:submitAction'),
    creating: labelMap?.get('message:creating'),
  };

  return (
    <FormComponent
      name={entity}
      formSchema={formSchema}
      onSubmit={submitAndUpload}
      label={label}
      messages={messages}
      theme={theme}
      {...rest}
    />
  );
};

export default AmplifyForm;
