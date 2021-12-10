import { HTMLProps } from 'react';
import { FormikHelpers } from 'formik';
import { fieldSizeMap, textColorMap } from './components/FormElements/FormElements';

export type Value = string | number | boolean | string[] | Option[] | FileWithSize | FileWithSize[];

export interface FormTheme {
  color?: TextColor;
}

const fieldSizeMapKeys = Array.from(fieldSizeMap.keys());

export type FieldSize = typeof fieldSizeMapKeys[number];

const textColorMapKeys = Array.from(textColorMap.keys());

export type TextColor = typeof textColorMapKeys[number];

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

export interface Messages {
  invalidError?: string;
  required?: string;
  select?: string;
  submitAction?: string;
}
export interface FileWithSize extends File {
  label?: string;
  preview?: string;
  width?: number;
  height?: number;
}

export interface FileWithStorageKey extends Omit<FileWithSize, 'preview'> {
  storageKey: string;
}
export interface AmplifyFormProps extends Omit<Omit<FormComponentProps, 'formSchema'>, 'label'> {
  amplifyConfig?: any;
  graphQLJSONSchema: any;
  entity: string;
  fieldExtraProps?: FormSchema;
  labelMap?: Map<string, string>;
  storagePrefix?: string;
  label?: string;
  storageLevel?: 'public' | 'protected' | 'private';
}

export interface FilesDropInputProps extends Omit<HTMLProps<HTMLInputElement>, 'defaultValue'> {
  text?: string;
  className?: string;
  fileType?: string;
  thumbnailSize?: {
    width: number;
    height: number;
  };
  getFiles: (files: FileWithSize[]) => void;
  defaultValue?: FileWithSize[];
}

export interface FormComponentProps {
  label: string;
  formSchema: FormSchema;
  onSubmit?: (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => void;
  relationships?: Relationship[];
  theme?: FormTheme;
  messages?: Messages;
}

export interface FieldProps extends HTMLProps<HTMLInputElement> {
  name: string;
  label?: string;
  labelCentered?: boolean;
  fieldSize?: FieldSize;
  theme?: FormTheme;
  isSubmitting?: boolean;
  selectLabel?: string;
}

export interface FormSchema {
  label?: string;
  kind?: string;
  options?: Option[];
  of?: FormSchema;
  fileType?: string;
  text?: string;
  required?: boolean;
  multiple?: boolean;
  readOnly?: boolean;
  defaultValue?: Value;
  [k: string]: Value | FormSchema | undefined;
}

export interface Type {
  kind: string;
  name?: string;
  ofType?: Type;
}

export interface Field {
  kind: string;
  name: string;
  description?: string;
  args?: any[];
  type?: Type;
  fields?: Field[];
  inputFields?: Field[];
  interfaces?: any;
  enumValues?: Field[];
  isDeprecated?: boolean;
  deprecationReason?: string;
  defaultValue?: any;
  possibleTypes?: any;
}

export interface GraphQLJSONSchema {
  data: {
    __schema: {
      queryType: any;
      mutationType: any;
      subscriptionType: any;
      types: Field[];
      directives: any[];
    };
  };
}

export interface Option {
  label: string;
  value: string;
}
export interface SelectFieldProps extends FieldProps {
  options: Option[];
}

export interface FilesDropFieldProps
  extends Omit<FieldProps, 'defaultValue'>,
    Omit<FilesDropInputProps, 'getFiles'> {
  name: string;
}

export interface SubmitButtonProps extends HTMLProps<HTMLButtonElement> {
  title: string;
  theme?: FormTheme;
}

export interface ObjectWithKey {
  [key: string]: ObjectWithKey | any;
}
