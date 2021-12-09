// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FC, Fragment } from 'react';
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
} from '../../helpers/types';

const fieldSetStyle = 'flex flex-wrap flex-row justify-start border-2 border-gray-300 p-4 gap-3';
const legendStyle = 'text-red-900 font-black text-lg px-2';
const labelStyle =
  'text-gray-400 px-2 absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-red-900 peer-focus:text-sm';
const fieldStyle =
  'bg-transparent border-gray-300 text-gray-900 peer h-10 border-0 border-b-2 placeholder-transparent focus:outline-none focus:border-red-900 focus:ring-0';
const checkboxStyle =
  'bg-transparent border-gray-300 text-red-900 text-red-900 rounded border-2 w-5 h-5 focus:ring-0';
const multiSelectStyle = 'border-gray-300 border-0 border-b-2 relative';
// const imagesDropLabelStyle = 'text-gray-400 text-sm';
const errorStyle = 'text-red-700 text-xs';
const submitButtonStyle =
  'bg-red-900 hover:bg-red-800 w-min my-4 px-14 py-2 text-center text-xl font-bold text-white rounded shadow-xl';

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
              className={`${theme?.labelStyle || labelStyle} ${
                labelCentered ? 'text-center' : ''
              } ${fieldSizeMap.get(fieldSize)}`}
              htmlFor={name}>
              {label}
            </label>
          )}
        </div>
        <ErrorMessage
          name={name}
          render={msg => (
            <div className={`${theme?.errorStyle || errorStyle} ${fieldSizeMap.get(fieldSize)}`}>
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
    <Fragment>
      <fieldset className={theme?.fieldSetStyle || fieldSetStyle}>
        <legend className={theme?.legendStyle || legendStyle}>{label}</legend>
        {children}
      </fieldset>
    </Fragment>
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
        className={`${theme?.fieldStyle || fieldStyle} ${fieldSizeMap.get(fieldSize)}`}
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
        className={`${theme?.fieldStyle || fieldStyle} ${fieldSizeMap.get(fieldSize)} focus:h-32`}
        id={name}
        name={name}
        placeholder={placeholder}
        {...rest}
      />
    </FieldWithError>
  );
};

export const SelectField: FC<SelectFieldProps> = ({
  name,
  fieldSize = 'full',
  theme,
  options,
  selectLabel = 'Select',
  ...rest
}) => {
  return (
    <FieldWithError name={name} fieldSize={fieldSize} theme={theme} {...rest}>
      <Field
        as="select"
        className={`${theme?.fieldStyle || fieldStyle} ${fieldSizeMap.get(fieldSize)}`}
        id={name}
        name={name}
        {...rest}>
        <option value="">{selectLabel}</option>
        {options.map(option => (
          <option key={option.value} value={option.value} label={option.label || option.value} />
        ))}
      </Field>
    </FieldWithError>
  );
};

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

export const MultipleSelectField: FC<SelectFieldProps> = ({
  fieldSize = '3xl',
  theme,
  options,
  selectLabel = 'Select',
  ...rest
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ name, onChange, ...otherFieldProps }, _, { setValue }] =
    useField<MultiValue<Option>>(rest);

  return (
    <FieldWithError fieldSize={fieldSize} theme={theme} {...rest}>
      <div
        className={`${theme?.multiSelectStyle || multiSelectStyle} ${fieldSizeMap.get(fieldSize)}`}>
        <ReactSelect
          styles={customStyles}
          options={options}
          isMulti
          isSearchable={false}
          placeholder={selectLabel}
          onChange={values => setValue(values)}
          {...otherFieldProps}
        />
      </div>
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
        className={`${theme?.fieldStyle || fieldStyle} ${fieldSizeMap.get(fieldSize)}`}
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
  ...rest
}) => {
  return (
    <FieldWithError name={name} fieldSize={fieldSize} theme={theme} labelCentered={true} {...rest}>
      <div className={`relative p-3 flex justify-center ${fieldSizeMap.get(fieldSize)}`}>
        <Field
          className={theme?.checkboxStyle || checkboxStyle}
          type="checkbox"
          id={name}
          name={name}
          {...rest}
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  required,
  multiple,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultValue,
  ...rest
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, _meta, helpers] = useField({ name, multiple });

  const { setValue } = helpers;
  const { value } = field;
  const processFiles = (files: FileWithSize[]) => {
    multiple ? setValue(files) : setValue(files[0]);
  };

  return (
    <Fragment>
      <fieldset className="flex flex-wrap flex-row justify-start border-2 border-gray-300 px-2 py-4">
        <legend className="text-red-900 font-black text-lg px-2">{label}</legend>
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const SubmitButton: FC<SubmitButtonProps> = ({ title, theme, type, ...rest }) => {
  return (
    <Fragment>
      <button
        type="submit"
        className={`disabled:opacity-70 ${theme?.submitButtonStyle || submitButtonStyle}`}
        {...rest}>
        {title}
      </button>
    </Fragment>
  );
};
