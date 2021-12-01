import { FC } from 'react';
import { FieldProps, TextFieldProps, TextAreaProps, SelectFieldProps, FieldTheme } from '../FormElements';
import { FormikHelpers } from 'formik';
import { FileWithSize } from '../ImagesDropInput';
export declare type ElementProps = TextFieldProps | TextAreaProps | SelectFieldProps | FieldProps;
interface Option {
    label: string;
    value: string;
}
declare type Value = string | number | boolean | string[] | Option[] | FileWithSize | FileWithSize[];
export interface FormSchema {
    [k: string]: ElementProps | FormSchema;
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
    prefix?: string;
}
declare const FormComponent: FC<FormComponentProps>;
export default FormComponent;
