import { FC } from 'react';
import { FormComponentProps } from '../FormComponent';
import { FileWithSize } from '../ImagesDropInput';
export interface AmplifyFormProps extends Omit<Omit<FormComponentProps, 'formSchema'>, 'label'> {
    amplifyConfig?: any;
    graphQLJSONSchema: any;
    entity: string;
    fieldExtraProps?: {
        [k: string]: {
            [k: string]: string | number | boolean;
        };
    };
    storagePrefix?: string;
    label?: string;
    storageLevel?: 'public' | 'protected' | 'private';
}
export interface FileWithStorageKey extends Omit<FileWithSize, 'preview'> {
    storageKey: string;
}
declare const AmplifyForm: FC<AmplifyFormProps>;
export default AmplifyForm;
