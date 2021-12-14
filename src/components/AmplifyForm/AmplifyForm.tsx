import React, { FC } from 'react';
import { Storage } from 'aws-amplify';
import FormComponent from '../FormComponent';
import { formSchemaFor } from '../../utils/form-schema';
import { parseObject } from '../../utils/parse-object';
import { FormikHelpers } from 'formik';
import loadashSet from 'lodash/set';
import loadashGet from 'lodash/get';
import {
  AmplifyFormProps,
  FormSchema,
  FileWithSize,
  FormValues,
  FileWithStorageKey,
  ObjectWithKey,
  FileFields,
  TextAreas,
} from '../../types';

const AmplifyForm: FC<AmplifyFormProps> = ({
  graphQLJSONSchema,
  entity,
  onSubmit,
  label = entity,
  textAreas,
  fileFields,
  fieldsSize,
  fieldsConfig,
  labelMap,
  storageConfig,
  ...rest
}) => {
  const { storagePrefix = '', storageLevel = 'public' } = storageConfig || {};

  const updateFormSchema: (
    fields: TextAreas | FileFields,
    kind: string
  ) => void = (fields, kind) => {
    if (Array.isArray(fields)) {
      fields.forEach(field => {
        if (typeof field == 'string') {
          loadashSet(formSchema, `${field}.kind`, kind);
        }
      });
    } else {
      Object.keys(fields).forEach(fieldname => {
        loadashSet(formSchema, `${fieldname}.kind`, kind);
        const fieldProps = fields[fieldname];
        Object.keys(fieldProps).forEach(prop => {
          const value = loadashGet(fieldProps, prop);
          loadashSet(formSchema, `${fieldname}.${prop}`, value);
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

  if (fieldsConfig) {
    Object.keys(fieldsConfig).forEach(field => {
      const fieldProps = fieldsConfig[field] as FormSchema;
      if (fieldProps) {
        Object.keys(fieldProps).forEach(key => {
          loadashSet(formSchema, `${field}.${key}`, fieldProps[key]);
        });
      }
    });
  }

  if (fileFields) updateFormSchema(fileFields, 'file');
  if (textAreas) updateFormSchema(textAreas, 'textarea');

  // Add fields size
  if (fieldsSize) {
    Object.keys(fieldsSize).forEach(fieldname =>
      loadashSet(formSchema, `${fieldname}.fieldSize`, fieldsSize[fieldname])
    );
  }

  const uploadFile = async (file: FileWithSize) => {
    try {
      const putResult = await Storage.put(storagePrefix + file.name, file, {
        level: storageLevel,
        contentType: file.type,
      });
      return putResult.key;
    } catch (value) {
      if ((value as any)?.errors) {
        const readbleErrors = value as unknown as { message: string }[];
        throw new Error(readbleErrors.map(error => error.message).join(','));
      } else {
        const error = value as Error;
        throw error;
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
      console.error('AmplifyForm has encountered an error :', typedError);
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
        loadashSet(object, keyWithPrefix, null);
      }
    };
    parseObject(values, action);
  };

  return (
    <FormComponent
      formSchema={formSchema}
      onSubmit={submitAndUpload}
      label={label}
      {...rest}
    />
  );
};

export default AmplifyForm;
