import { FC, Fragment, HTMLProps } from 'react';
import { ErrorMessage, Field, useField } from 'formik';
import ReactSelect, { StylesConfig } from 'react-select';
import ImagesDropInput, { FileWithSize, ImagesDropInputProps } from '../ImagesDropInput';

export interface FieldTheme {
  labelStyle?: string;
  fieldStyle?: string;
  checkboxStyle?: string;
  multiSelectStyle?: string;
  errorStyle?: string;
  imagesDropLabelStyle?: string;
  submitButtonStyle?: string;
}

export type FieldSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full' | 'max' | 'screen';

export interface FieldProps extends HTMLProps<HTMLInputElement> {
  name: string;
  label?: string;
  fieldSize?: FieldSize;
  theme?: FieldTheme;
  isSubmitting?: boolean;
}
export interface TextFieldProps extends FieldProps {
  placeholder?: string;
}

const fieldSizeMap: Map<string, string> = new Map([
  ['xs', 'w-14'],
  ['sm', 'w-[5.25rem]'],
  ['md', 'w-36'],
  ['lg', 'w-64'],
  ['xl', 'w-96'],
  ['2xl', 'w-[30rem]'],
  ['3xl', 'w-[50rem]'],
  ['full', 'w-full'],
  ['max', 'w-max'],
  ['screen', 'w-[90vw]'],
]);

const labelStyle =
  'text-gray-400 px-2 absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-red-900 peer-focus:text-sm';
const fieldStyle =
  'bg-transparent border-gray-300 text-gray-900 peer h-10 border-0 border-b-2 placeholder-transparent focus:outline-none focus:border-red-900 focus:ring-0';
const checkboxStyle =
  'bg-transparent border-gray-300 text-red-900 text-red-900 rounded border-2 w-5 h-5 focus:ring-0';
const multiSelectStyle = '';
const imagesDropLabelStyle = 'text-gray-400 text-sm';
const errorStyle = 'text-red-700';
const submitButtonStyle =
  'bg-red-900 hover:bg-red-800 w-min my-4 px-14 py-2 text-center text-xl font-bold text-white rounded shadow-xl';

const defaultTheme: FieldTheme = {
  labelStyle,
  fieldStyle,
  checkboxStyle,
  multiSelectStyle,
  imagesDropLabelStyle,
  errorStyle,
  submitButtonStyle,
};

export const TextField: FC<TextFieldProps> = ({
  name,
  label,
  placeholder,
  fieldSize = 'full',
  theme = defaultTheme,
  ...rest
}) => {
  return (
    <Fragment>
      <div className="py-2">
        <div className="relative">
          <Field
            className={`${theme.fieldStyle || fieldStyle} ${
              fieldSizeMap.get(fieldSize) || 'w-max'
            }`}
            type="text"
            name={name}
            id={name}
            placeholder={placeholder || ' '}
            {...rest}
          />
          {label && (
            <label
              className={`${theme.labelStyle || labelStyle} ${
                fieldSizeMap.get(fieldSize) || 'w-max'
              }`}
              htmlFor={name}>
              {label}
            </label>
          )}
          <ErrorMessage
            name={name}
            render={msg => (
              <div
                className={`${theme.errorStyle || errorStyle} ${
                  fieldSizeMap.get(fieldSize) || 'w-max'
                }`}>
                {msg}
              </div>
            )}
          />
        </div>
      </div>
    </Fragment>
  );
};

export interface TextAreaProps extends HTMLProps<HTMLTextAreaElement> {
  name: string;
  fieldSize?: FieldSize;
  theme?: FieldTheme;
}

export const TextAreaField: FC<TextAreaProps> = ({
  name,
  label,
  placeholder,
  fieldSize = 'full',
  theme = defaultTheme,
  ...rest
}) => {
  return (
    <Fragment>
      <div className="py-2">
        <div className="relative">
          <Field
            as="textarea"
            className={`${theme.fieldStyle || fieldStyle} ${
              fieldSizeMap.get(fieldSize) || 'w-max'
            } focus:h-32`}
            name={name}
            id={name}
            placeholder={placeholder || ' '}
            {...rest}
          />
          {label && (
            <label
              className={`${theme.labelStyle || labelStyle} ${
                fieldSizeMap.get(fieldSize) || 'w-max'
              }`}
              htmlFor={name}>
              {label}
            </label>
          )}
          <ErrorMessage
            name={name}
            render={msg => (
              <div
                className={`${theme.errorStyle || errorStyle} ${
                  fieldSizeMap.get(fieldSize) || 'w-max'
                }`}>
                {msg}
              </div>
            )}
          />
        </div>
      </div>
    </Fragment>
  );
};

export interface SelectFieldProps extends FieldProps {
  options: {
    value: string;
    label: string;
  }[];
}

export const SelectField: FC<SelectFieldProps> = ({
  name,
  label,
  options,
  fieldSize = 'max',
  theme = defaultTheme,
  ...rest
}) => {
  return (
    <Fragment>
      <div className="py-2">
        <div className="relative">
          <Field
            as="select"
            className={`${theme.fieldStyle || fieldStyle} ${fieldSizeMap.get(fieldSize)}`}
            name={name}
            {...rest}>
            <option value="">Sélectionner</option>
            {options.map(option => (
              <option
                key={option.value}
                value={option.value}
                label={option.label || option.value}
              />
            ))}
          </Field>
          {label && (
            <label
              className={`${theme.labelStyle || labelStyle} ${fieldSizeMap.get(fieldSize)}`}
              htmlFor={name}>
              {label}
            </label>
          )}
          <ErrorMessage
            className={`${theme.errorStyle || errorStyle} ${fieldSizeMap.get(fieldSize)}`}
            name={name}
            render={msg => <div style={{ color: 'red' }}>{msg}</div>}
          />
        </div>
      </div>
    </Fragment>
  );
};

const customStyles: StylesConfig<any, true> = {
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
  label,
  options,
  fieldSize = '3xl',
  theme = defaultTheme,
  children,
  ...rest
}) => {
  const [field, , helpers] = useField(rest);

  const { name, onChange, ...otherFieldProps } = field;
  const { setValue } = helpers;

  return (
    <Fragment>
      <div className={`py-2 ${fieldSizeMap.get(fieldSize)}`}>
        <div className="border-gray-300 border-0 border-b-2 relative">
          <ReactSelect
            styles={customStyles}
            options={options}
            isMulti
            isSearchable={false}
            placeholder="Sélectionner"
            onChange={option => setValue(option)}
            {...otherFieldProps}
          />
          {label && (
            <label
              className={`${theme.labelStyle || labelStyle} ${fieldSizeMap.get(fieldSize)}`}
              htmlFor={name}>
              {label}
            </label>
          )}
          <ErrorMessage
            className={`${theme.errorStyle || errorStyle} ${fieldSizeMap.get(fieldSize)}`}
            name={name}
            render={msg => <div style={{ color: 'red' }}>{msg}</div>}
          />
        </div>
      </div>
    </Fragment>
  );
};

export const NumberField: FC<FieldProps> = ({
  name,
  label,
  placeholder,
  step = 1,
  fieldSize = 'md',
  theme = defaultTheme,
  ...rest
}) => {
  return (
    <Fragment>
      <div className="py-2">
        <div className="relative">
          <Field
            className={`${theme.fieldStyle || fieldStyle} ${
              fieldSizeMap.get(fieldSize) || 'w-max'
            }`}
            type="number"
            name={name}
            id={name}
            step={step}
            placeholder={placeholder || ' '}
            {...rest}
          />
          {label && (
            <label
              className={`${theme.labelStyle || labelStyle} ${
                fieldSizeMap.get(fieldSize) || 'w-max'
              }`}
              htmlFor={name}>
              {label}
            </label>
          )}
          <ErrorMessage
            name={name}
            render={msg => (
              <div
                className={`${theme.errorStyle || errorStyle} ${
                  fieldSizeMap.get(fieldSize) || 'w-max'
                }`}>
                {msg}
              </div>
            )}
          />
        </div>
      </div>
    </Fragment>
  );
};

export const CheckboxField: FC<FieldProps> = ({
  name,
  label,
  fieldSize = 'md',
  theme = defaultTheme,
  ...rest
}) => {
  return (
    <Fragment>
      <div className="py-2">
        <div
          className={`relative p-3 flex justify-center ${fieldSizeMap.get(fieldSize) || 'w-max'}`}>
          <Field
            className={theme.checkboxStyle || checkboxStyle}
            type="checkbox"
            name={name}
            id={name}
            {...rest}
          />
          {label && (
            <label
              className={`${theme.labelStyle || labelStyle} text-center w-full`}
              htmlFor={name}>
              {label}
            </label>
          )}
          <ErrorMessage
            name={name}
            render={msg => (
              <div
                className={`${theme.errorStyle || errorStyle} ${
                  fieldSizeMap.get(fieldSize) || 'w-max'
                }`}>
                {msg}
              </div>
            )}
          />
        </div>
      </div>
    </Fragment>
  );
};
export interface ImagesDropFieldProps extends FieldProps, Omit<ImagesDropInputProps, 'getFiles'> {
  name: string;
  errorMessage?: string;
}

export const ImagesDropField: FC<ImagesDropFieldProps> = ({
  name,
  label = name,
  fieldSize = 'max',
  theme = defaultTheme,
  required,
  multiple,
  errorMessage = 'You need to select at least one file',
  ...rest
}) => {
  const validate = (value: FileWithSize | FileWithSize[]) =>
    required &&
    ((Array.isArray(value) && value.length === 0) || (!Array.isArray(value) && value === undefined))
      ? errorMessage
      : undefined;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, , helpers] = useField({ name, validate, multiple });

  const { setValue } = helpers;
  const getFiles = (files: FileWithSize[]) => {
    multiple ? setValue(files) : setValue(files[0]);
  };

  return (
    <Fragment>
      <fieldset className="flex flex-wrap flex-row justify-start border-2 border-gray-300 px-2 py-4">
        <legend className="text-red-900 font-black text-lg px-2">{label}</legend>
        <div className={`relative px-2 ${fieldSizeMap.get(fieldSize) || 'w-max'}`}>
          <ImagesDropInput
            name={name}
            id={name}
            getFiles={getFiles}
            multiple={multiple}
            {...rest}
          />
          <ErrorMessage
            name={name}
            render={msg => (
              <div
                className={`${theme.errorStyle || errorStyle} ${
                  fieldSizeMap.get(fieldSize) || 'w-max'
                }`}>
                {msg}
                <button autoFocus={true}></button>
              </div>
            )}
          />
        </div>
      </fieldset>
    </Fragment>
  );
};

interface SubmitButtonProps extends HTMLProps<HTMLButtonElement> {
  title: string;
  theme?: FieldTheme;
  isSubmitting?: boolean;
}

export const SubmitButton: FC<SubmitButtonProps> = ({
  title,
  theme = defaultTheme,
  isSubmitting = false,
  type,
  ...rest
}) => {
  return (
    <Fragment>
      <button
        type="submit"
        className={`disabled:opacity-70 ${theme.submitButtonStyle || submitButtonStyle}`}
        disabled={isSubmitting}
        {...rest}>
        {title}
      </button>
    </Fragment>
  );
};
