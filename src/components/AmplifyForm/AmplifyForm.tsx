import React, { FC } from 'react';
import { Amplify, Storage } from 'aws-amplify';
import FormComponent from '../FormComponent';
import { formSchemaFor } from '../../utils/form-schema';
import { parseObject } from '../../utils/parse-object';
import { FormikHelpers } from 'formik';
import loadashSet from 'lodash/set';
import {
  AmplifyFormProps,
  FormSchema,
  FileWithSize,
  FormValues,
  FileWithStorageKey,
  ObjectWithKey,
} from '../../types';

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
    } catch (value) {
      if ((value as any)?.errors) {
        const readbleErrors = value as unknown as { message: string }[]
        throw new Error(readbleErrors.map(error => error.message).join(','));
      } else {
        const error = value as Error
        throw error
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

  const submitAndUpload = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    const { resetForm, setSubmitting } = formikHelpers;
    try {
      await Promise.all(
        Object.keys(formSchema).map(async fieldname => {
          const fieldProps = formSchema[fieldname] as FormSchema;
          if (fieldProps.kind == 'file') values[fieldname] = await uploadFiles(values, fieldname);
        })
      );
      trimValues(values);
      onSubmit ? await onSubmit(values, formikHelpers) : null;
      resetForm()
    } catch (error) {
      const typedError = error as Error;
      alert(`Error : ${typedError.message} \n${typedError.stack}`)
    } finally {
      setSubmitting(false)
    }
  };

  const trimValues = (values: FormValues) => {
    const action = (object: ObjectWithKey, _key: string, keyWithPrefix: string, value: any) => {
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
