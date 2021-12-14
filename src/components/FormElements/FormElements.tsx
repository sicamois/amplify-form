import React, { FC, Fragment } from 'react';
import { ErrorMessage, Field, useField } from 'formik';
import ReactSelect, { MultiValue, StylesConfig } from 'react-select';
import FilesDropInput from '../FilesDropInput';
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
  bgColorMap,
  bgLightColorMap,
  borderColorMap,
  fieldSizeMap,
  focusBorderColorMap,
  peerFocusTextColorMap,
  textColorMap,
} from '../../utils/theme-maps';

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

const FieldWithError: FC<FieldProps> = ({
  name,
  label,
  labelCentered,
  fieldSize = 'full',
  theme,
  children,
}) => {
  return (
    <Fragment>
      <div className="py-2">
        <div className="relative">
          {children}
          {label && (
            <label
              className={`${labelStyle} ${peerFocusTextColorMap.get(
                theme?.color
              )} ${labelCentered ? 'text-center' : ''} ${fieldSizeMap.get(
                fieldSize
              )}`}
              htmlFor={name}>
              {label}
            </label>
          )}
        </div>
        <ErrorMessage
          name={name}
          render={msg => (
            <div className={`${errorStyle} ${fieldSizeMap.get(fieldSize)}`}>
              {msg}
            </div>
          )}
        />
      </div>
    </Fragment>
  );
};

export const FieldSet: FC<FieldProps> = ({ label, theme, children }) => {
  return (
    <fieldset
      className={`${
        theme?.branding == 'full' ? borderColorMap.get(theme.color) : ''
      } ${fieldSetStyle}`}>
      <legend className={`${textColorMap.get(theme?.color)} ${legendStyle}`}>
        {label}
      </legend>
      {children}
    </fieldset>
  );
};

export const TextField: FC<FieldProps> = ({
  name,
  fieldSize = 'full',
  theme,
  placeholder = ' ',
  ...rest
}) => {
  return (
    <FieldWithError name={name} fieldSize={fieldSize} theme={theme} {...rest}>
      <Field
        className={`${fieldStyle} ${focusBorderColorMap.get(
          theme?.color
        )} ${fieldSizeMap.get(fieldSize)}`}
        type="text"
        id={name}
        name={name}
        placeholder={placeholder}
        {...rest}
      />
    </FieldWithError>
  );
};

export const TextAreaField: FC<FieldProps> = ({
  name,
  fieldSize = '2xl',
  theme,
  placeholder = ' ',
  ...rest
}) => {
  return (
    <FieldWithError name={name} fieldSize={fieldSize} theme={theme} {...rest}>
      <Field
        as="textarea"
        className={`${fieldStyle} ${focusBorderColorMap.get(
          theme?.color
        )} ${fieldSizeMap.get(fieldSize)} focus:h-32`}
        id={name}
        name={name}
        placeholder={placeholder}
        {...rest}
      />
    </FieldWithError>
  );
};

export const NumberField: FC<FieldProps> = ({
  name,
  fieldSize = 'md',
  theme,
  placeholder = ' ',
  step = 1,
  ...rest
}) => {
  return (
    <FieldWithError name={name} fieldSize={fieldSize} theme={theme} {...rest}>
      <Field
        className={`${fieldStyle} ${focusBorderColorMap.get(
          theme?.color
        )} ${fieldSizeMap.get(fieldSize)}`}
        type="number"
        id={name}
        name={name}
        placeholder={placeholder}
        step={step}
        {...rest}
      />
    </FieldWithError>
  );
};

export const CheckboxField: FC<FieldProps> = ({
  name,
  fieldSize = 'md',
  theme,
  step = 1,
  ...rest
}) => {
  return (
    <FieldWithError
      name={name}
      fieldSize={fieldSize}
      theme={theme}
      labelCentered={true}
      {...rest}>
      <div
        className={`relative p-3 flex justify-center ${fieldSizeMap.get(
          fieldSize
        )}`}>
        <Field
          className={checkboxStyle}
          type="checkbox"
          id={name}
          name={name}
          {...rest}
        />
      </div>
    </FieldWithError>
  );
};

// export const SelectField: FC<SelectFieldProps> = ({
//   name,
//   fieldSize = 'full',
//   theme,
//   options,
//   selectLabel = 'Select',
//   ...rest
// }) => {
//   return (
//     <FieldWithError name={name} fieldSize={fieldSize} theme={theme} {...rest}>
//       <Field
//         as="select"
//         className={`${theme.fieldStyle || fieldStyle} ${fieldSizeMap.get(fieldSize)}`}
//         id={name}
//         name={name}
//         {...rest}>
//         <option value="">{selectLabel}</option>
//         {options.map(option => (
//           <option key={option.value} value={option.value} label={option.label || option.value} />
//         ))}
//       </Field>
//     </FieldWithError>
//   );
// };

const customStyles: StylesConfig<Option, true> = {
  control: styles => ({
    ...styles,
    backgroundColor: 'transparent',
    border: 0,
    boxShadow: 'transparent',
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

export const SelectField: FC<SelectFieldProps> = ({
  fieldSize = 'md',
  theme,
  placeholder = '',
  options,
  selectLabel = 'Select',
  multiple,
  ...rest
}) => {
  const fieldname = rest.name;

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
      <div className={`${multiSelectStyle} ${fieldSizeMap.get(fieldSize)}`}>
        <ReactSelect
          className="peer"
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

export const FilesDropField: FC<FilesDropFieldProps> = ({
  name,
  fieldSize = 'max',
  theme,
  label,
  required,
  multiple,
  defaultValue,
  ...rest
}) => {
  const [field, , helpers] = useField({ name, multiple });

  const { setValue } = helpers;
  const { value } = field;
  const processValue = (files: FileWithSize[]) => {
    console.log(`processValue - files (${files.length}) ${files}`)
    multiple ? setValue(files) : setValue(files[0])
  }

  return (
    <Fragment>
      <fieldset
        className={`${
          theme?.branding == 'full' ? borderColorMap.get(theme?.color) : ''
        } ${fieldSetStyle}`}>
        <legend className={`${textColorMap.get(theme?.color)} ${legendStyle}`}>
          {label}
        </legend>
        <div className="px-2">
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
              setValue={processValue}
              {...rest}
            />
          </FieldWithError>
        </div>
      </fieldset>
    </Fragment>
  );
};

export const SubmitButton: FC<SubmitButtonProps> = ({
  title,
  theme,
  type,
  ...rest
}) => {
  return (
    <Fragment>
      <button
        type="submit"
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
