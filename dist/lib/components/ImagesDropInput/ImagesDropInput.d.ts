import { FC, HTMLProps } from 'react';
export interface FileWithSize extends File {
    label?: string;
    preview?: string;
    width?: number;
    height?: number;
}
export interface ImagesDropInputProps extends HTMLProps<HTMLInputElement> {
    text?: string;
    className?: string;
    fileType?: string;
    thumbnailSize?: {
        width: number;
        height: number;
    };
    getFiles: (files: FileWithSize[]) => void;
}
declare const ImagesDropInput: FC<ImagesDropInputProps>;
export default ImagesDropInput;
