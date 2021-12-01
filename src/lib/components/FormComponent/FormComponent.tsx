import { FC, Fragment, useEffect, useState } from 'react';
import {
  FieldProps,
  TextFieldProps,
  TextAreaProps,
  SelectFieldProps,
  FieldTheme,
  TextField,
  TextAreaField,
  CheckboxField,
  NumberField,
  SelectField,
  MultipleSelectField,
  SubmitButton,
} from '../FormElements';
import * as yup from 'yup';
import { Formik, Form, FormikHelpers } from 'formik';
import loadashSet from 'lodash/set';
import loadashGet from 'lodash/get';
import { FileWithSize } from '../ImagesDropInput';
import { ImagesDropField, ImagesDropFieldProps } from '../FormElements/FormElements';
import { capitalize } from '../../helpers/string-helpers';

// import { fieldLabel } from '../../../helpers/label-helpers';

export type ElementProps = TextFieldProps | TextAreaProps | SelectFieldProps | FieldProps;

interface Option {
  label: string;
  value: string;
}

type Value = string | number | boolean | string[] | Option[] | FileWithSize | FileWithSize[];

export interface FormSchema {
  [k: string]: ElementProps | FormSchema;
}

interface ValidationSchema {
  [k: string]: yup.AnySchema | ValidationSchema;
}

export interface FormValues {
  [k: string]: Value | FormValues | undefined;
}

export interface Relationship {
  name: string;
  label: string;
  options: {
    value: string;
    label: string;
  }[];
}

export interface FileField {
  name: string;
  text?: string;
  type: string;
}

export interface FormTheme extends FieldTheme {
  fieldSetStyle?: string;
  legendStyle?: string;
}

export interface FormComponentProps {
  label: string;
  formSchema: FormSchema;
  onSubmit?: (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => void;
  relationships?: Relationship[];
  fileFields?: FileField[];
  theme?: FormTheme;
  prefix?: string
}

const defaultFieldSetStyle =
  'flex flex-wrap flex-row justify-start border-2 border-gray-300 p-4 gap-3';
const defaultLegendStyle = 'text-red-900 font-black text-lg px-2';

const FormComponent: FC<FormComponentProps> = ({
  label,
  formSchema,
  onSubmit,
  relationships,
  fileFields = [],
  theme = {},
  prefix = ''
}) => {
  const [formData, setFormData] = useState<FormValues | undefined>();
  const [, setValidationSchema] = useState<ValidationSchema | undefined>();

  const listFields: string[] = [];

  const { fieldSetStyle, legendStyle, ...otherThemeFields } = theme;

  theme = {
    fieldSetStyle: fieldSetStyle || defaultFieldSetStyle,
    legendStyle: legendStyle || defaultLegendStyle,
    ...otherThemeFields,
  };

  useEffect(() => {
    const getFormFromSchema = (formSchema: FormSchema) => {
      const _formData: FormValues = {};
      const _validationSchema: ValidationSchema = {};

      for (let key of Object.keys(formSchema)) {
        switch (formSchema[key].type) {
          case 'text':
          case 'textarea':
            _formData[key] =
              (formSchema[key].defaultValue as string) || (formSchema[key].value as string) || '';
            _validationSchema[key] = yup.string();
            break;
          case 'email':
            _formData[key] =
              (formSchema[key].defaultValue as string) || (formSchema[key].value as string) || '';
            _validationSchema[key] = yup.string().email();
            break;
          case 'select':
          case 'list':
            _formData[key] =
              (formSchema[key].defaultValue as string) ||
              (formSchema[key].value as string) ||
              undefined;
            const selectFieldProps = formSchema[key] as SelectFieldProps;
            if (selectFieldProps.options) {
              _validationSchema[key] = yup
                .string()
                .oneOf(selectFieldProps.options.map(option => option.value));
            } else {
              _validationSchema[key] = yup.string();
            }
            break;
          case 'number':
            _formData[key] =
              (formSchema[key].defaultValue as number) ||
              (formSchema[key].value as number) ||
              undefined;
            _validationSchema[key] = yup.number();
            break;
          case 'checkbox':
            _formData[key] = !!formSchema[key].defaultValue || !!formSchema[key].value || undefined;
            _validationSchema[key] = yup.boolean();
            break;
          case 'relationship':
            _formData[key] = !!formSchema[key].defaultValue || !!formSchema[key].value || '';
            _validationSchema[key] = yup.string();
            break;
          case 'file':
            _formData[key] = [] as FileWithSize[];
            _validationSchema[key] = yup.array();
            break;

          case undefined:
            const { formDataInit, validationSchemaInit } = getFormFromSchema(
              formSchema[key] as FormSchema
            );
            _formData[key] = formDataInit;
            _validationSchema[key] = validationSchemaInit;
            break;

          default:
            break;
        }

        if (formSchema[key].required) {
          _validationSchema[key] = (_validationSchema[key] as yup.AnySchema).required('Required');
        }
      }

      return {
        formDataInit: _formData,
        validationSchemaInit: _validationSchema,
      };
    };

    const initForm = (formSchema: FormSchema) => {
      const { formDataInit, validationSchemaInit } = getFormFromSchema(formSchema);
      setFormData(formDataInit);
      setValidationSchema(validationSchemaInit);
    };

    initForm(formSchema);
  }, [formSchema]);

  const getFormElement = (
    elementName: string,
    elementSchema: ElementProps | FormSchema,
    elementPrefix?: string,
    elementTheme?: FormTheme
  ) => {
    const props = {
      ...elementSchema,
      name: (elementPrefix ? elementPrefix + '.' : '') + elementName,
      options: (elementSchema as SelectFieldProps)?.options || undefined,
      theme: elementTheme || { ...otherThemeFields }
    };

    switch (elementSchema.type) {
      case 'text':
      case 'email':
        return <TextField {...(props as TextFieldProps)} />;

      case 'textarea':
        return <TextAreaField {...(props as TextAreaProps)} />;

      case 'select':
        return <SelectField {...(props as SelectFieldProps)} />;

      case 'list':
        listFields.push(props.name);
        return <MultipleSelectField {...(props as SelectFieldProps)} />;

      case 'number':
        return <NumberField {...(props as FieldProps)} />;

      case 'checkbox':
        return <CheckboxField {...(props as FieldProps)} />;

      case 'relationship':
        if (relationships) {
          const typedProps = props as SelectFieldProps;
          const relation = relationships.find(
            relationship => (relationship.name = typedProps.name)
          );
          typedProps.options = relation?.options || [];
          typedProps.label = relation?.label || props.name;
          return (
            <fieldset className="flex flex-wrap flex-row justify-start border-2 border-gray-300 p-4">
              <legend className="text-red-900 font-black text-lg px-2">
                {capitalize(typedProps.label!)}
              </legend>
              <SelectField {...typedProps} />
            </fieldset>
          );
        }
        break;

      case 'file':
        const fileField = fileFields.find(field => field.name === elementName);
        if (fileField)
          return (
            <ImagesDropField
              {...(props as ImagesDropFieldProps)}
              name={fileField.name}
              fileType={fileField.type}
              text={fileField.text || 'Sélectionner des fichiers'}
            />
          );
        break;

      case undefined:
        const schema = elementSchema as FormSchema;
        return (
          <fieldset className="flex flex-wrap flex-row justify-start border-2 border-gray-300 p-4 gap-3">
            <legend className="text-red-900 font-black text-lg px-2">
              {capitalize(props.name)}
            </legend>
            {Object.keys(schema).map(key => (
              <Fragment key={key}>
                {getFormElement(key, schema[key], (elementPrefix = props.name))}
              </Fragment>
            ))}
          </fieldset>
        );
    }
  };

  const fixMultipleSelectValues = (values: FormValues) => {
    const fixedValues: FormValues = { ...values };
    listFields.forEach(key => {
      const options = loadashGet(fixedValues, key) as Option[];
      if (options)
        loadashSet(
          fixedValues,
          key,
          options.map(option => option.value)
        );
    });
    return fixedValues;
  };

  const defaultOnSubmit = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    const fixedValues = fixMultipleSelectValues(values);
    fileFields.forEach(async fileField => {
      const files = Array.isArray(values[fileField.name])
        ? (values[fileField.name] as FileWithSize[])
        : [values[fileField.name] as FileWithSize];
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => (file.preview ? URL.revokeObjectURL(file.preview) : null));
    });
    if (onSubmit) await onSubmit(fixedValues, formikHelpers);
  };

  return (
    <Fragment>
      {formData ? (
        <Formik enableReinitialize initialValues={formData} onSubmit={defaultOnSubmit}>
          {({ isSubmitting }) => {
            return (
            <Form className="needs-validation">
              <fieldset className={theme.fieldSetStyle}>
                <legend className={theme.legendStyle}>{label}</legend>
                {Object.keys(formData!).map(key => (
                  <div key={key}>{getFormElement(key, formSchema[key], prefix, theme)}</div>
                ))}
              </fieldset>
              <div className="flex flex-row gap-4 items-center">
                <SubmitButton title="Créer" theme={theme} isSubmitting={isSubmitting} />
                {isSubmitting ? <p className="pt-1">Création en cours...</p> : null}
              </div>
            </Form>
          )}}
        </Formik>
      ) : null}
    </Fragment>
  );
};

export default FormComponent;
