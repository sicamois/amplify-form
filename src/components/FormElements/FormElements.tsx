import React, { FC, Fragment } from 'react';
import { ErrorMessage, Field, useField } from 'formik';
import ReactSelect, { MultiValue, StylesConfig } from 'react-select';
import FilesDropInput from '../FilesDropInput';
import { FieldProps, FormTheme, SelectFieldProps, Option, FilesDropFieldProps, FileWithSize, SubmitButtonProps } from '../../helpers/types';

export const fieldSizeMap: Map<string, string> = new Map([
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
              className={'text-gray-400 px-2 absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-red-900 peer-focus:text-sm'+ `${
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
            <div className={'text-red-700 text-xs' + fieldSizeMap.get(fieldSize)}>
              {msg}
            </div>
          )}
        />
      </div>
    </Fragment>
  );
};

export const FieldSet: FC<FieldProps> = ({
  name,
  label,
  fieldSize = 'full',
  theme,
  children,
  placeholder = ' ',
  ...rest
}) => {
  return (
    <fieldset className='flex flex-wrap flex-row justify-start border-2 border-gray-300 p-4 gap-3'>
      <legend className='text-red-900 font-black text-lg px-2'>{label}</legend>
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
        className={'bg-transparent border-gray-300 text-gray-900 peer h-10 border-0 border-b-2 placeholder-transparent focus:outline-none focus:border-red-900 focus:ring-0 ' + fieldSizeMap.get(fieldSize)}
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
        className={'bg-transparent border-gray-300 text-gray-900 peer h-10 border-0 border-b-2 placeholder-transparent focus:outline-none focus:border-red-900 focus:ring-0 focus:h-32' + fieldSizeMap.get(fieldSize)}
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
        className={'bg-transparent border-gray-300 text-gray-900 peer h-10 border-0 border-b-2 placeholder-transparent focus:outline-none focus:border-red-900 focus:ring-0 ' + fieldSizeMap.get(fieldSize)}
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
  placeholder = '',
  options,
  selectLabel = 'Select',
  ...rest
}) => {
  const [{ name, onChange, ...otherFieldProps }, meta, { setValue }] =
    useField<MultiValue<Option>>(rest);

  return (
    <FieldWithError fieldSize={fieldSize} theme={theme} {...rest}>
      <div
        className={'border-gray-300 border-0 border-b-2 relative ' + fieldSizeMap.get(fieldSize)}>
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
        className={'bg-transparent border-gray-300 text-gray-900 peer h-10 border-0 border-b-2 placeholder-transparent focus:outline-none focus:border-red-900 focus:ring-0 ' + fieldSizeMap.get(fieldSize)}
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
          className='bg-transparent border-gray-300 text-red-900 rounded border-2 w-5 h-5 focus:ring-0'
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
  required,
  multiple,
  defaultValue,
  ...rest
}) => {
  const [field, meta, helpers] = useField({ name, multiple });

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

export const SubmitButton: FC<SubmitButtonProps> = ({ title, theme, type, ...rest }) => {
  return (
    <Fragment>
      <button
        type="submit"
        className='disabled:opacity-70 bg-red-900 hover:bg-red-800 w-min my-4 px-14 py-2 text-center text-xl font-bold text-white rounded shadow-xl'
        {...rest}>
        {title}
      </button>
    </Fragment>
  );
};
