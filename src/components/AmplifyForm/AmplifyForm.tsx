import { FC } from 'react';
import { Amplify, Storage } from 'aws-amplify';
import { FormComponent, FormComponentProps, FormValues } from '../FormComponent';
import { formSchemaFromGraphQLTypes } from '../../helpers/graphql-helpers';
import { FileWithSize } from '../ImagesDropInput';
import { FormikHelpers } from 'formik';
import loadashSet from 'lodash/set';
import { FieldSize } from '../FormElements';

export interface AmplifyFormProps extends Omit<Omit<FormComponentProps, 'formSchema'>, 'label'> {
  amplifyConfig?: any;
  graphQLJSONSchema: any;
  entity: string;
  fieldExtraProps?: {
    [k: string]: {
      [k: string]: any
    };
  };
  storagePrefix?: string;
  label?: string;
  storageLevel?: 'public' | 'protected' | 'private';
}

export interface FileWithStorageKey extends Omit<FileWithSize, 'preview'> {
  storageKey: string;
}

const AmplifyForm: FC<AmplifyFormProps> = ({
  amplifyConfig,
  graphQLJSONSchema,
  entity,
  fieldExtraProps,
  storagePrefix = '',
  storageLevel = 'public',
  label = entity,
  onSubmit,
  fileFields,
  ...rest
}) => {
  if (amplifyConfig) Amplify.configure({ ...amplifyConfig });

  const formSchema = formSchemaFromGraphQLTypes(
    graphQLJSONSchema,
    `Create${entity}Input`,
    fileFields
  )!;

  if (fieldExtraProps) {
    Object.keys(fieldExtraProps).forEach(field => {
      const fieldProps = fieldExtraProps[field];
      Object.keys(fieldProps).forEach(key => {
        const value = fieldProps[key]
        loadashSet(formSchema, `${field}.${key}`, value);
      });
    });
  }

  const uploadFile = async (file: FileWithSize) => {
    try {
      const putResult = await Storage.put(storagePrefix + file.name, file, {
        level: storageLevel,
        contentType: file.type,
      });
      return putResult.key;
    } catch ({ errors }) {
      const readbleErrors = errors as unknown as { message: string }[];
      throw new Error(readbleErrors.map(error => error.message).join(','));
    }
  };

  const uploadFiles = async (values: FormValues, fileFieldName: string) => {
    const files = Array.isArray(values[fileFieldName])
      ? (values[fileFieldName] as FileWithSize[])
      : [values[fileFieldName] as FileWithSize];
    return await Promise.all(
      files.map(async file => {
        const fileWithStorage = file as FileWithStorageKey;
        fileWithStorage.storageKey = await uploadFile(file);
        return fileWithStorage;
      })
    );
  };

  const submitAndUpload = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    if (fileFields) {
      await Promise.all(
        fileFields.map(async fileField => {
          const filesWithKey = await uploadFiles(values, fileField.name);
          values[fileField.name] =
            filesWithKey.length === 0
              ? undefined
              : Array.isArray(values[fileField.name])
              ? filesWithKey
              : filesWithKey[0];
        })
      );
    }
    if (onSubmit) await onSubmit(values, formikHelpers);
  };

  return (
    <FormComponent
      formSchema={formSchema}
      onSubmit={submitAndUpload}
      label={label}
      fileFields={fileFields}
      {...rest}
    />
  );
};

export default AmplifyForm;
