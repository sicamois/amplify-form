import React, { FC, VFC, Fragment } from 'react';
import { ErrorMessage, Field, useField } from 'formik';
import ReactSelect, { MultiValue, StylesConfig } from 'react-select';
import FilesDropInput from '../FilesDropInput';
import chroma from 'chroma-js';
import {
  FieldProps,
  SelectFieldProps,
  Option,
  FilesDropFieldProps,
  FileWithSize,
  SubmitButtonProps,
  FormValues,
} from '../../types';
import {
  accentColorMap,
  bgColorMap,
  bgLightColorMap,
  borderColorMap,
  fieldSizeMap,
  focusBorderColorMap,
  optionColorMap,
  peerFocusTextColorMap,
  textColorMap,
} from '../../utils/theme-maps';
import capitalize from 'lodash/capitalize';

const fieldSetStyle =
  'flex flex-wrap flex-row justify-start border-2 p-4 gap-3';
const legendStyle = 'font-black text-lg px-2';
const labelStyle =
  'text-gray-400 px-2 absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm';
const fieldStyle =
  'bg-transparent border-gray-300 text-gray-600 peer h-10 border-0 border-b-2 placeholder-transparent focus:outline-none focus:ring-0';
const checkboxStyle =
  'bg-transparent border-gray-300 rounded border-2 w-5 h-5 focus:ring-0';
const multiSelectStyle = 'border-gray-300 border-0 border-b-2 relative';
const errorStyle = 'text-red-700 text-xs';
const submitButtonStyle =
  'hover:opacity-90 w-min my-4 px-14 py-2 text-center text-xl font-bold rounded shadow-xl';

export const FieldWithError: FC<FieldProps> = ({
  name,
  label,
  labelCentered,
  fieldSize = 'full',
  theme,
  children,
}) => {
  console.log('renders FieldWithError');
  const safeFieldSize = fieldSizeMap.get(fieldSize) ? fieldSize : 'full';
  if (!fieldSizeMap.get(fieldSize)) {
    const fieldSizeValues = Array.from(fieldSizeMap.keys());
    console.warn(
      `Problem in FieldWithError: fieldSize '${fieldSize}' is unknown, fieldSize is set to default : '${safeFieldSize}' (Possible fieldSize are : '${fieldSizeValues.join(
        `', '`
      )}')`
    );
  }
  return (
    <Fragment>
      <div className='py-2'>
        <div className='relative'>
          {children}
          {label && (
            <label
              className={`${labelStyle} ${peerFocusTextColorMap.get(
                theme?.color
              )} ${labelCentered ? 'text-center' : ''} ${fieldSizeMap.get(
                safeFieldSize
              )}`}
              htmlFor={name}>
              {label}
            </label>
          )}
        </div>
        <ErrorMessage
          name={name}
          render={msg => (
            <div className={`${errorStyle} ${fieldSizeMap.get(safeFieldSize)}`}>
              {msg}
            </div>
          )}
        />
      </div>
    </Fragment>
  );
};

export const FieldSet: FC<FieldProps> = ({ name, label, theme, children }) => {
  console.log('renders FieldSet');
  const safeLabel = label || capitalize(name).replaceAll('_', ' ');
  return (
    <fieldset
      name={name}
      className={`${
        theme?.branding == 'full' ? borderColorMap.get(theme.color) : ''
      } ${fieldSetStyle}`}>
      <legend
        data-testid={`${name}-legend`}
        className={`${textColorMap.get(theme?.color)} ${legendStyle}`}>
        {safeLabel}
      </legend>
      {children}
    </fieldset>
  );
};

export const TextField: VFC<FieldProps> = ({
  name,
  fieldSize = 'full',
  theme,
  placeholder = ' ',
  ...rest
}) => {
  console.log('renders TextField');
  const safeFieldSize = fieldSizeMap.get(fieldSize) ? fieldSize : 'full';
  if (!fieldSizeMap.get(fieldSize)) {
    const fieldSizeValues = Array.from(fieldSizeMap.keys());
    console.warn(
      `Problem in TextField: fieldSize '${fieldSize}' is unknown, fieldSize is set to default : '${safeFieldSize}' (Possible fieldSize are : '${fieldSizeValues.join(
        `', '`
      )}')`
    );
  }
  return (
    <FieldWithError
      name={name}
      fieldSize={safeFieldSize}
      theme={theme}
      {...rest}>
      <Field
        className={`${fieldStyle} ${focusBorderColorMap.get(
          theme?.color
        )} ${fieldSizeMap.get(safeFieldSize)}`}
        type='text'
        id={name}
        name={name}
        placeholder={placeholder}
        {...rest}
      />
    </FieldWithError>
  );
};

export const TextAreaField: VFC<FieldProps> = ({
  name,
  fieldSize = '2xl',
  theme,
  placeholder = ' ',
  ...rest
}) => {
  console.log('renders TextAreaField');
  const safeFieldSize = fieldSizeMap.get(fieldSize) ? fieldSize : '2xl';
  if (!fieldSizeMap.get(fieldSize)) {
    const fieldSizeValues = Array.from(fieldSizeMap.keys());
    console.warn(
      `Problem in TextAreaField: fieldSize '${fieldSize}' is unknown, fieldSize is set to default : '${safeFieldSize}' (Possible fieldSize are : '${fieldSizeValues.join(
        `', '`
      )}')`
    );
  }
  return (
    <FieldWithError
      name={name}
      fieldSize={safeFieldSize}
      theme={theme}
      {...rest}>
      <Field
        as='textarea'
        className={`${fieldStyle} ${focusBorderColorMap.get(
          theme?.color
        )} ${fieldSizeMap.get(safeFieldSize)} focus:h-32`}
        id={name}
        name={name}
        placeholder={placeholder}
        {...rest}
      />
    </FieldWithError>
  );
};

export const NumberField: VFC<FieldProps> = ({
  name,
  fieldSize = 'md',
  theme,
  placeholder = ' ',
  step = 1,
  ...rest
}) => {
  console.log('renders NumberField');
  const safeFieldSize = fieldSizeMap.get(fieldSize) ? fieldSize : 'md';
  if (!fieldSizeMap.get(fieldSize)) {
    const fieldSizeValues = Array.from(fieldSizeMap.keys());
    console.warn(
      `Problem in NumberField: fieldSize '${fieldSize}' is unknown, fieldSize is set to default : '${safeFieldSize}' (Possible fieldSize are : '${fieldSizeValues.join(
        `', '`
      )}')`
    );
  }
  return (
    <FieldWithError
      name={name}
      fieldSize={safeFieldSize}
      theme={theme}
      {...rest}>
      <Field
        className={`${fieldStyle} ${focusBorderColorMap.get(
          theme?.color
        )} ${fieldSizeMap.get(safeFieldSize)}`}
        type='number'
        id={name}
        name={name}
        placeholder={placeholder}
        step={step}
        {...rest}
      />
    </FieldWithError>
  );
};

export const CheckboxField: VFC<FieldProps> = ({
  name,
  fieldSize = 'md',
  theme,
  ...rest
}) => {
  const safeFieldSize = fieldSizeMap.get(fieldSize) ? fieldSize : 'md';
  if (!fieldSizeMap.get(fieldSize)) {
    const fieldSizeValues = Array.from(fieldSizeMap.keys());
    console.warn(
      `Problem in CheckboxField: fieldSize '${fieldSize}' is unknown, fieldSize is set to default : '${safeFieldSize}' (Possible fieldSize are : '${fieldSizeValues.join(
        `', '`
      )}')`
    );
  }
  console.log('renders CheckboxField');
  return (
    <FieldWithError
      name={name}
      fieldSize={safeFieldSize}
      theme={theme}
      labelCentered={true}
      {...rest}>
      <div
        data-testid={`${name}-div`}
        className={`relative p-3 flex justify-center ${fieldSizeMap.get(
          safeFieldSize
        )}`}>
        <Field
          className={`${accentColorMap.get(theme?.color)} ${checkboxStyle}`}
          type='checkbox'
          id={name}
          name={name}
          {...rest}
        />
      </div>
    </FieldWithError>
  );
};

export const SelectField: VFC<SelectFieldProps> = ({
  fieldSize,
  theme,
  placeholder = '',
  options,
  selectLabel = 'Select',
  multiple,
  ...rest
}) => {
  console.log('renders SelectField');
  const fieldname = rest.name;
  const adaptiveFieldSize =
    (fieldSize && fieldSizeMap.get(fieldSize) ? fieldSize : undefined) ||
    multiple
      ? '2xl'
      : 'md';

  const color =
    theme?.branding == 'full'
      ? chroma(optionColorMap.get(theme?.color)!)
      : chroma('#9ca3af');
  const customStyles: StylesConfig<Option, true> = {
    control: styles => ({
      ...styles,
      backgroundColor: 'transparent',
      border: 0,
      boxShadow: 'transparent',
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      'backgroundColor': isSelected
        ? color.css()
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      ':active': {
        ...styles[':active'],
        backgroundColor: isSelected ? color.css() : color.alpha(0.3).css(),
      },
    }),
    input: styles => ({
      ...styles,
      backgroundColor: 'transparent',
    }),
    placeholder: styles => ({
      ...styles,
      color: 'black',
    }),
  };

  const validate = (value: FormValues) => {
    if (value[fieldname] == '') {
      return 'Required';
    }
    return;
  };

  const [{ name, onChange, ...otherFieldProps }, , { setValue }] = useField<
    MultiValue<Option>
  >({
    validate,
    ...rest,
  });

  return (
    <FieldWithError fieldSize={fieldSize} theme={theme} {...rest}>
      <div
        className={`${multiSelectStyle} ${fieldSizeMap.get(
          adaptiveFieldSize
        )}`}>
        <ReactSelect
          className='peer'
          styles={customStyles}
          options={options}
          isMulti={multiple || undefined}
          isSearchable={false}
          placeholder={selectLabel}
          onChange={values => setValue(values)}
          {...otherFieldProps}
        />
      </div>
    </FieldWithError>
  );
};

export const FilesDropField: VFC<FilesDropFieldProps> = ({
  name,
  fieldSize = 'max',
  theme,
  label,
  required,
  multiple,
  defaultValue,
  ...rest
}) => {
  console.log('renders FilesDropField');
  const [field, , helpers] = useField({ name, multiple });

  const { setValue } = helpers;
  const { value } = field;
  const processValue = (files: FileWithSize[]) => {
    multiple ? setValue(files) : setValue(files[0]);
  };

  return (
    <Fragment>
      <fieldset
        className={`${
          theme?.branding == 'full' ? borderColorMap.get(theme?.color) : ''
        } ${fieldSetStyle}`}>
        <legend className={`${textColorMap.get(theme?.color)} ${legendStyle}`}>
          {label}
        </legend>
        <div className='px-2'>
          <FieldWithError
            name={name}
            fieldSize={fieldSize}
            theme={theme}
            {...rest}>
            <FilesDropInput
              name={name}
              id={name}
              multiple={multiple}
              value={value}
              theme={theme}
              required={required}
              setValue={processValue}
              {...rest}
            />
          </FieldWithError>
        </div>
      </fieldset>
    </Fragment>
  );
};

export const SubmitButton: VFC<SubmitButtonProps> = ({
  title,
  theme,
  type,
  ...rest
}) => {
  console.log('renders SubmitButton');
  return (
    <Fragment>
      <button
        type='submit'
        className={`disabled:opacity-70 ${
          theme?.branding == 'full'
            ? bgLightColorMap.get(theme?.color)
            : bgColorMap.get(theme?.color) || 'bg-gray-200'
        } ${
          theme?.branding == 'full'
            ? textColorMap.get(theme?.color)
            : 'text-white'
        } ${submitButtonStyle}`}
        {...rest}>
        {title}
      </button>
    </Fragment>
  );
};
