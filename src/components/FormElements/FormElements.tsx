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

const fieldSetStyle = 'flex flex-wrap flex-row justify-start border-2 border-gray-300 p-4 gap-3';
const legendStyle = 'font-black text-lg px-2';
const labelStyle =
  'text-gray-400 px-2 absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm';
const fieldStyle =
  'bg-transparent border-gray-300 text-gray-900 peer h-10 border-0 border-b-2 placeholder-transparent focus:outline-none focus:ring-0';
const checkboxStyle = 'bg-transparent border-gray-300 rounded border-2 w-5 h-5 focus:ring-0';
const multiSelectStyle = 'border-gray-300 border-0 border-b-2 relative';
const errorStyle = 'text-red-700 text-xs';
const submitButtonStyle =
  'hover:opacity-90 w-min my-4 px-14 py-2 text-center text-xl font-bold text-white rounded shadow-xl';

export const fieldSizeMap: Map<string, string> = new Map([
  ['xs', 'w-14'],
  ['sm', 'w-20'],
  ['md', 'w-36'],
  ['lg', 'w-64'],
  ['xl', 'w-96'],
  ['2xl', 'w-100'],
  ['3xl', 'w-200'],
  ['full', 'w-full'],
  ['max', 'w-max'],
  ['screen', 'w-screen'],
]);

export const textColorMap: Map<string | undefined, string> = new Map([
  ['black', 'text-black'],
  ['white', 'text-white'],
  ['gray', 'text-gray-900'],
  ['red', 'text-red-900'],
  ['blue', 'text-blue-900'],
  ['yellow', 'text-yellow-900'],
  ['green', 'text-green-900'],
  ['indigo', 'text-indigo-900'],
  ['purple', 'text-purple-900'],
  ['pink', 'text-pink-900'],
  [undefined, 'text-red-900'],
]);

export const peerFocusTextColorMap: Map<string | undefined, string> = new Map([
  ['black', 'peer-focus:text-black'],
  ['white', 'peer-focus:text-white'],
  ['gray', 'peer-focus:text-gray-900'],
  ['red', 'peer-focus:text-red-900'],
  ['blue', 'peer-focus:text-blue-900'],
  ['yellow', 'peer-focus:text-yellow-900'],
  ['green', 'peer-focus:text-green-900'],
  ['indigo', 'peer-focus:text-indigo-900'],
  ['purple', 'peer-focus:text-purple-900'],
  ['pink', 'peer-focus:text-pink-900'],
  [undefined, 'peer-focus:text-red-900'],
]);

export const focusBorderColorMap: Map<string | undefined, string> = new Map([
  ['black', 'focus:border-black'],
  ['white', 'focus:border-white'],
  ['gray', 'focus:border-gray-900'],
  ['red', 'focus:border-red-900'],
  ['blue', 'focus:border-blue-900'],
  ['yellow', 'focus:border-yellow-900'],
  ['green', 'focus:border-green-900'],
  ['indigo', 'focus:border-indigo-900'],
  ['purple', 'focus:border-purple-900'],
  ['pink', 'focus:border-pink-900'],
  [undefined, 'focus:border-red-900'],
]);

export const bgColorMap: Map<string | undefined, string> = new Map([
  ['black', 'bg-black'],
  ['gray', 'bg-gray-900'],
  ['red', 'bg-red-900'],
  ['blue', 'bg-blue-900'],
  ['yellow', 'bg-yellow-900'],
  ['green', 'bg-green-900'],
  ['indigo', 'bg-indigo-900'],
  ['purple', 'bg-purple-900'],
  ['pink', 'bg-pink-900'],
  [undefined, 'bg-red-900'],
]);

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
              className={`${labelStyle} ${peerFocusTextColorMap.get(theme?.color)} ${
                labelCentered ? 'text-center' : ''
              } ${fieldSizeMap.get(fieldSize)}`}
              htmlFor={name}
            >
              {label}
            </label>
          )}
        </div>
        <ErrorMessage
          name={name}
          render={msg => (
            <div className={`${errorStyle} ${fieldSizeMap.get(fieldSize)}`}>{msg}</div>
          )}
        />
      </div>
    </Fragment>
  );
};

export const FieldSet: FC<FieldProps> = ({ label, theme, children }) => {
  return (
    <fieldset className={fieldSetStyle}>
      <legend className={`${textColorMap.get(theme?.color)} ${legendStyle}`}>{label}</legend>
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
        className={`${fieldStyle} ${focusBorderColorMap.get(theme?.color)} ${fieldSizeMap.get(
          fieldSize
        )}`}
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
  fieldSize = 'full',
  theme,
  placeholder = ' ',
  ...rest
}) => {
  return (
    <FieldWithError name={name} fieldSize={fieldSize} theme={theme} {...rest}>
      <Field
        as="textarea"
        className={`${fieldStyle} ${focusBorderColorMap.get(theme?.color)} ${fieldSizeMap.get(
          fieldSize
        )} focus:h-32`}
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
        className={`${fieldStyle} ${focusBorderColorMap.get(theme?.color)} ${fieldSizeMap.get(
          fieldSize
        )}`}
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
    <FieldWithError name={name} fieldSize={fieldSize} theme={theme} labelCentered={true} {...rest}>
      <div className={`relative p-3 flex justify-center ${fieldSizeMap.get(fieldSize)}`}>
        <Field
          className={`${textColorMap.get(theme?.color)} ${checkboxStyle}`}
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

  const [{ name, onChange, ...otherFieldProps }, , { setValue }] = useField<MultiValue<Option>>({
    validate,
    ...rest,
  });

  return (
    <FieldWithError fieldSize={fieldSize} theme={theme} {...rest}>
      <div className={`${multiSelectStyle} ${fieldSizeMap.get(fieldSize)}`}>
        <ReactSelect
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
  const processFiles = (files: FileWithSize[]) => {
    multiple ? setValue(files) : setValue(files[0]);
  };

  return (
    <Fragment>
      <fieldset className={fieldSetStyle}>
        <legend className={`${textColorMap.get(theme?.color)} ${legendStyle}`}>{label}</legend>
        <div className="px-2">
          <FieldWithError name={name} fieldSize={fieldSize} theme={theme} {...rest}>
            <FilesDropInput
              name={name}
              id={name}
              getFiles={processFiles}
              multiple={multiple}
              value={value}
              {...rest}
            />
          </FieldWithError>
        </div>
      </fieldset>
    </Fragment>
  );
};

export const SubmitButton: FC<SubmitButtonProps> = ({ title, theme, type, ...rest }) => {
  return (
    <Fragment>
      <button
        type="submit"
        className={`disabled:opacity-70 ${bgColorMap.get(theme?.color)} ${submitButtonStyle}`}
        {...rest}
      >
        {title}
      </button>
    </Fragment>
  );
};
