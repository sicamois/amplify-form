import { VFC, Fragment, useEffect, useState } from 'react';
import {
  FieldSet,
  TextField,
  TextAreaField,
  CheckboxField,
  NumberField,
  SelectField,
  FilesDropField,
  SubmitButton,
} from '../FormElements';
import {
  AnySchema,
  object as yupObject,
  string as yupString,
  number as yupNumber,
  boolean as yupBoolean,
  array as yupArray,
  mixed as yupMixed,
  setLocale as yupSetLocale,
} from 'yup';
import { Formik, Form, FormikHelpers } from 'formik';
import loadashSet from 'lodash/set';
import loadashGet from 'lodash/get';
import {
  FormComponentProps,
  FormSchema,
  FormTheme,
  FormValues,
  Option,
} from '../../types';
import { textColorMap } from '../../utils/theme-maps';

const FormComponent: VFC<FormComponentProps> = ({
  name,
  label,
  formSchema,
  onSubmit,
  theme = {},
  messages = {},
}) => {
  const defaultLabel = label;

  const safeTheme: FormTheme = {
    color: textColorMap.has(theme.color) ? theme.color : undefined,
    branding: theme.branding == 'full' ? 'full' : 'basic',
  };

  const {
    invalidError = 'Some fields are invalid',
    required = 'required',
    select = 'Select',
    submitAction = 'Create',
    creating = 'Creating item...',
  } = messages;

  const listFields: Set<string> = new Set();

  const [formData, setFormData] = useState<{
    initialValues: FormValues;
    validationSchema: AnySchema;
  }>();

  useEffect(() => {
    yupSetLocale({
      mixed: {
        required: '${label} ' + required,
      },
    });
    const getInitialValues = (aFormSchema: FormSchema) => {
      const {
        label,
        kind,
        options,
        of,
        required,
        defaultValue,
        fileType,
        text,
        ...otherFormSchemaFields
      } = aFormSchema;
      const initialValuesTemp: FormValues = {};
      Object.keys(otherFormSchemaFields).map(fieldName => {
        const fieldInfos = otherFormSchemaFields[fieldName]! as FormSchema;
        if (!fieldInfos.kind) {
          initialValuesTemp[fieldName] = getInitialValues(fieldInfos);
        } else {
          initialValuesTemp[fieldName] = fieldInfos.defaultValue || '';
        }
      });
      return initialValuesTemp;
    };

    const getValidationSchema = (aFormSchema: FormSchema) => {
      const validationSchemaTemp = yupObject();

      const validationObjectFrom = (aFormSchema: FormSchema): AnySchema => {
        const {
          label,
          kind,
          options,
          of,
          required,
          multiple,
          defaultValue,
          fileType,
          text,
          ...otherFormSchemaFields
        } = aFormSchema;
        if (kind == 'string') return yupString();
        if (kind == 'textarea') return yupString();
        if (kind == 'email') return yupString().email();
        if (kind == 'url') return yupString().url();
        if (kind == 'int') return yupNumber().integer();
        if (kind == 'float') return yupNumber();
        if (kind == 'number') return yupNumber();
        if (kind == 'boolean') return yupBoolean();
        if ((kind == 'select' || kind == 'relationship') && options) {
          const shape: { [k: string]: AnySchema } = {};
          if (options!.length > 0) {
            Object.keys(options![0]).forEach(
              field => (shape[field] = yupString())
            );
            return yupObject().shape(shape);
          }
        }
        if (kind == 'list') {
          let ofObject = yupObject();
          if (of?.kind == 'select' && of?.options) {
            const shape: { [k: string]: AnySchema } = {};
            Object.keys(of!.options![0]).forEach(
              field => (shape[field] = yupString())
            );
            ofObject = yupObject().shape(shape);
          }
          return yupArray().of(ofObject);
        }
        if (kind == 'file') return yupMixed();
        if (kind == 'id') return yupString();
        return getValidationSchema(otherFormSchemaFields);
      };

      const shape: { [k: string]: AnySchema } = {};
      Object.keys(aFormSchema).map(fieldName => {
        const fieldInfos = aFormSchema[fieldName]! as FormSchema;
        const validationObject = validationObjectFrom(fieldInfos);
        shape[fieldName] = (
          fieldInfos.required && !fieldInfos.readOnly
            ? validationObject.required()
            : validationObject
        ).label(fieldInfos.label || fieldName);
      });
      return validationSchemaTemp.shape(shape);
    };

    const initialValues = getInitialValues(formSchema);
    const validationSchema = getValidationSchema(formSchema);

    setFormData({ initialValues, validationSchema });
  }, [formSchema, required]);

  const getFormElement = (
    name: string,
    formSchema: FormSchema,
    prefix = '',
    theme?: FormTheme
  ) => {
    const { kind, label, options, of, required, defaultValue, ...props } =
      formSchema;
    const explicitName = (prefix ? prefix + '.' : '') + name;

    if (!formSchema) {
      return <Fragment></Fragment>;
    }

    if (!kind)
      return (
        <FieldSet
          name={explicitName}
          label={label || defaultLabel}
          theme={theme}>
          {Object.keys(props!).map(fieldName => (
            <Fragment key={fieldName}>
              {getFormElement(
                fieldName,
                props[fieldName]! as FormSchema,
                name,
                (theme = theme)
              )}
            </Fragment>
          ))}
        </FieldSet>
      );

    if (kind == 'string' || kind == 'email' || kind == 'url')
      return (
        <TextField
          name={explicitName}
          label={label}
          theme={theme}
          required={required}
          {...props}
        />
      );

    if (kind == 'textarea')
      return (
        <TextAreaField
          name={explicitName}
          label={label}
          theme={theme}
          required={required}
          {...props}
        />
      );

    if (kind == 'int')
      return (
        <NumberField
          name={explicitName}
          label={label}
          theme={theme}
          required={required}
          {...props}
        />
      );

    if (kind == 'float')
      return (
        <NumberField
          name={explicitName}
          label={label}
          theme={theme}
          required={required}
          {...props}
          step={0.01}
        />
      );

    if (kind == 'boolean')
      return (
        <CheckboxField
          name={explicitName}
          label={label}
          theme={theme}
          required={required}
          {...props}
        />
      );

    if ((kind == 'list' && of?.kind == 'select') || kind == 'select') {
      listFields.add(explicitName);
      return (
        <SelectField
          name={explicitName}
          label={label}
          options={of?.options || options!}
          selectLabel={select}
          theme={theme}
          required={required}
          {...props}
        />
      );
    }

    if (kind == 'relationship') {
      listFields.add(explicitName);
      return (
        <FieldSet name={explicitName} label={label} theme={theme}>
          <SelectField
            name={explicitName}
            label={''}
            options={options!}
            selectLabel={select}
            theme={theme}
            required={required}
            {...props}
          />
        </FieldSet>
      );
    }

    if (kind == 'file')
      return (
        <FilesDropField
          name={explicitName}
          label={label}
          theme={theme}
          required={required}
          {...props}></FilesDropField>
      );

    return <Fragment></Fragment>;
  };

  const deepCopyValues = (values: FormValues) => {
    const copiedValue = { ...values };
    Object.keys(values).forEach(key => {
      const value = values[key];
      if (
        typeof value === 'object' &&
        !(value instanceof File) &&
        !Array.isArray(value) &&
        value !== null
      ) {
        loadashSet(copiedValue, key, deepCopyValues({ ...value }));
      }
    });
    return copiedValue;
  };

  const fixMultipleSelectValues = (values: FormValues) => {
    const fixedValues = deepCopyValues(values) as FormValues;
    listFields.forEach(key => {
      const value = loadashGet(fixedValues, key) as Option | Option[];
      if (Array.isArray(value)) {
        const options = value as Option[];
        if (options)
          loadashSet(
            fixedValues,
            key,
            options.map(option => option.value)
          );
      } else {
        const option = value as Option;
        if (option) loadashSet(fixedValues, key, option.value);
      }
    });
    return fixedValues;
  };

  const submitHandler = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    const fixedValues = fixMultipleSelectValues(values);
    onSubmit ? await onSubmit(fixedValues, formikHelpers) : null;
  };

  return (
    <Fragment>
      {formData ? (
        <Formik
          enableReinitialize
          initialValues={formData.initialValues}
          validationSchema={formData.validationSchema}
          onSubmit={submitHandler}>
          {({ isSubmitting, isValid }) => {
            return (
              <Form noValidate name={name}>
                <div className='flex flex-col gap-4 w-full'>
                  {getFormElement('', formSchema, '', (theme = safeTheme))}
                  <div className='flex flex-row gap-4 items-center'>
                    <SubmitButton
                      title={submitAction}
                      theme={theme}
                      disabled={isSubmitting && !isValid}
                    />
                    {!isValid ? (
                      <p className='pt-1 text-red-500 font-semibold'>
                        {invalidError}
                      </p>
                    ) : null}
                    {isSubmitting && isValid ? (
                      <p className='pt-1'>{creating}</p>
                    ) : null}
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      ) : null}
    </Fragment>
  );
};

export default FormComponent;
