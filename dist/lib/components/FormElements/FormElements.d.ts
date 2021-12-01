import { FC, HTMLProps } from 'react';
import { ImagesDropInputProps } from '../ImagesDropInput';
export interface FieldTheme {
    labelStyle?: string;
    fieldStyle?: string;
    checkboxStyle?: string;
    multiSelectStyle?: string;
    errorStyle?: string;
    imagesDropLabelStyle?: string;
    submitButtonStyle?: string;
}
declare type FieldSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full' | 'max' | 'screen';
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
export declare const TextField: FC<TextFieldProps>;
export interface TextAreaProps extends HTMLProps<HTMLTextAreaElement> {
    name: string;
    fieldSize?: FieldSize;
    theme?: FieldTheme;
}
export declare const TextAreaField: FC<TextAreaProps>;
export interface SelectFieldProps extends FieldProps {
    options: {
        value: string;
        label: string;
    }[];
}
export declare const SelectField: FC<SelectFieldProps>;
export declare const MultipleSelectField: FC<SelectFieldProps>;
export declare const NumberField: FC<FieldProps>;
export declare const CheckboxField: FC<FieldProps>;
export interface ImagesDropFieldProps extends FieldProps, Omit<ImagesDropInputProps, 'getFiles'> {
    name: string;
    errorMessage?: string;
}
export declare const ImagesDropField: FC<ImagesDropFieldProps>;
interface SubmitButtonProps extends HTMLProps<HTMLButtonElement> {
    title: string;
    theme?: FieldTheme;
    isSubmitting?: boolean;
}
export declare const SubmitButton: FC<SubmitButtonProps>;
export {};
