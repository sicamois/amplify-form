import './styles/index.css'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FC } from 'react';
import Amplify, { Storage } from 'aws-amplify';
import FormComponent from './components/FormComponent';
import { formSchemaFor } from './helpers/graphql-helpers';
import { FormikHelpers } from 'formik';
import loadashSet from 'lodash/set';
import { parseObject } from './helpers/object-helpers';
import {
  AmplifyFormProps,
  FormSchema,
  FileWithSize,
  FormValues,
  FileWithStorageKey,
  ObjectWithKey,
} from './helpers/types';

const AmplifyForm: FC<AmplifyFormProps> = ({
  amplifyConfig,
  graphQLJSONSchema,
  entity,
  fieldExtraProps,
  labelMap,
  storagePrefix = '',
  storageLevel = 'public',
  label = entity,
  onSubmit,
  ...rest
}) => {
  amplifyConfig ? Amplify.configure({ ...amplifyConfig }) : null;

  const formSchema = formSchemaFor(graphQLJSONSchema, entity, 'create', labelMap);

  if (fieldExtraProps) {
    Object.keys(fieldExtraProps).forEach(field => {
      const fieldProps = fieldExtraProps[field] as FormSchema;
      if (fieldProps) {
        Object.keys(fieldProps).forEach(key => {
          loadashSet(formSchema, `${field}.${key}`, fieldProps[key]);
        });
      }
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
    } else {
      const file = values[fileFieldName] as FileWithStorageKey;
      if (file.name) {
        file.storageKey = await uploadFile(file);
        return file;
      }
    }
    return
  };

  const submitAndUpload = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    await Promise.all(
      Object.keys(formSchema).map(async fieldname => {
        const fieldProps = formSchema[fieldname] as FormSchema;
        if (fieldProps.kind == 'file') values[fieldname] = await uploadFiles(values, fieldname);
      })
    );
    trimValues(values);
    onSubmit ? await onSubmit(values, formikHelpers) : null;
  };

  const trimValues = (values: FormValues) => {
    const action = (object: ObjectWithKey, _key: string, keyWithPrefix: string, value: unknown) => {
      if (value == '') {
        loadashSet(object, keyWithPrefix, null);
      }
    };
    parseObject(values, action);
  };

  return (
    <FormComponent formSchema={formSchema} onSubmit={submitAndUpload} label={label} {...rest} />
  );
};

export default AmplifyForm;
