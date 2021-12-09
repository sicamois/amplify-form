import React, { FC, Fragment, useEffect, useState } from 'react';
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
import { FormComponentProps, FormSchema, FormTheme, FormValues, Option } from '../../types';

const FormComponent: FC<FormComponentProps> = ({
  label,
  formSchema,
  onSubmit,
  theme = {},
  messages = {},
}) => {
  const defaultLabel = label;

  const {
    invalidError = 'Some fields are invalid',
    required = 'required',
    select = 'Select',
    submitAction = 'Create',
  } = messages;

  const defaultFieldSetStyle =
    'flex flex-wrap flex-row justify-start border-2 border-gray-300 p-4 gap-3';
  const defaultLegendStyle = 'text-red-900 font-black text-lg px-2';

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
        if (kind == 'select' || kind == 'relationship') {
          const shape: { [k: string]: AnySchema } = {};
          Object.keys(options![0]).forEach(field => (shape[field] = yupString()));
          return yupObject().shape(shape);
        }
        if (kind == 'list' && of!.options) {
          const shape: { [k: string]: AnySchema } = {};
          Object.keys(of!.options![0]).forEach(field => (shape[field] = yupString()));
          return yupArray().of(yupObject().shape(shape));
        }
        if (kind == 'file') return yupMixed();
        if (kind == 'id') return yupString();
        return getValidationSchema(otherFormSchemaFields);
      };

      const shape: { [k: string]: AnySchema } = {};
      Object.keys(aFormSchema).map(fieldName => {
        const fieldInfos = aFormSchema[fieldName]! as FormSchema;
        const validationObject = validationObjectFrom(fieldInfos);
        shape[fieldName] = (fieldInfos.required && !fieldInfos.readOnly
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

  const { fieldSetStyle, legendStyle, ...otherThemeFields } = theme;

  theme = {
    fieldSetStyle: fieldSetStyle || defaultFieldSetStyle,
    legendStyle: legendStyle || defaultLegendStyle,
    ...otherThemeFields,
  };

  const getFormElement = (name: string, formSchema: FormSchema, prefix = '', theme?: FormTheme) => {
    const { kind, label, options, of, required, defaultValue, ...props } = formSchema;
    const explicitName = (prefix ? prefix + '.' : '') + name;

    if (!formSchema) {
      return <Fragment></Fragment>;
    }

    if (!kind)
      return (
        <FieldSet name={name} label={label || defaultLabel}>
          {Object.keys(props!).map(fieldName => (
            <Fragment key={fieldName}>
              {getFormElement(fieldName, props[fieldName]! as FormSchema, name, theme)}
            </Fragment>
          ))}
        </FieldSet>
      );

    if (kind == 'string' || kind == 'email' || kind == 'url')
      return <TextField name={explicitName} label={label} {...props} />;

    if (kind == 'textarea') return <TextAreaField name={explicitName} label={label} {...props} />;

    if (kind == 'int') return <NumberField name={explicitName} label={label} {...props} />;

    if (kind == 'float')
      return <NumberField name={explicitName} label={label} {...props} step={0.01} />;

    if (kind == 'boolean') return <CheckboxField name={explicitName} label={label} {...props} />;

    // if (kind == 'select')
    //   return (
    //     <SelectField
    //       name={explicitName}
    //       label={label}
    //       options={options!}
    //       selectLabel={select}
    //       {...props}
    //     />
    //   );

    if ((kind == 'list' && of?.kind == 'select') || kind == 'select') {
      listFields.add(explicitName);
      return (
        <SelectField
          name={explicitName}
          label={label}
          options={of?.options || options!}
          selectLabel={select}
          {...props}
        />
      );
    }

    if (kind == 'relationship')
      return (
        <FieldSet name={name} label={label}>
          <SelectField
            name={explicitName}
            label={''}
            options={options!}
            selectLabel={select}
            {...props}
          />
        </FieldSet>
      );

    if (kind == 'file')
      return <FilesDropField name={explicitName} label={label} {...props}></FilesDropField>;

    return <Fragment></Fragment>;
  };

  const deepCopyValues = (values: FormValues) => {
    const copiedValue = {...values};
    Object.keys(values).forEach(key => {
      const value = values[key]
      if (
        typeof value === 'object' &&
        !(value instanceof File) &&
        !Array.isArray(value) &&
        value !== null) {
          loadashSet(copiedValue, key, deepCopyValues({...value})) 
        }
    })
    return copiedValue;
  }

  const fixMultipleSelectValues = (values: FormValues) => {
    const fixedValues = deepCopyValues(values) as FormValues;
    listFields.forEach(key => {
      const value = loadashGet(fixedValues, key) as (Option | Option[]);
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

  const submitHandler = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    const fixedValues = fixMultipleSelectValues(values);
    alert(JSON.stringify(fixedValues, null, 2));
    onSubmit ? await onSubmit(fixedValues, formikHelpers) : null;
  };

  return (
    <Fragment>
      {formData ? (
        <Formik
          enableReinitialize
          initialValues={formData.initialValues}
          validationSchema={formData.validationSchema}
          onSubmit={submitHandler}
        >
          {({ isSubmitting, isValid }) => {
            return (
              <Form noValidate>
                <div className="flex flex-col gap-4">
                  {getFormElement('', formSchema, '', theme)}
                  <div className="flex flex-row gap-4 items-center">
                    <SubmitButton
                      title={submitAction}
                      theme={theme}
                      disabled={isSubmitting && !isValid}
                    />
                    {!isValid ? (
                      <p className="pt-1 text-red-500 font-semibold">{invalidError}</p>
                    ) : null}
                    {isSubmitting && isValid ? <p className="pt-1">Création en cours...</p> : null}
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
