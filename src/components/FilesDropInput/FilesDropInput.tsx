/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { FilesDropInputProps, FileWithSize } from '../../helpers/types';

const defaultInstructionsStyle =
  'bg-gray-100 border-2 border-gray-400 border-dashed h-24 px-4 py-2 text-sm font-light w-[60vw]';

const FilesDropInput: React.FC<FilesDropInputProps> = ({
  text = "Drag 'n' drop some files here, or click to select files",
  className = defaultInstructionsStyle,
  fileType = 'image/*',
  thumbnailSize,
  getFiles,
  multiple,
  value
}) => {
  const [files, setFiles] = React.useState<FileWithSize[]>([]);
  const [dragId, setDragId] = React.useState<number | undefined>();


  // Reset Files when Form is reset (initialValue = '')
  React.useEffect(() => {
    if (value == '') {
      // make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => file.preview ? URL.revokeObjectURL(file.preview) : null)
      setFiles([])
    }
  }, [value])

  const onDrop = React.useCallback(
    async (acceptedFiles: FileWithSize[]) => {
      if (fileType.startsWith('image/')) {
        const readImageAsync = async (imageSrc: string) => {
          return new Promise<HTMLImageElement>((resolve, reject) => {
            const image = new Image();

            image.onload = () => {
              resolve(image);
            };

            image.onerror = reject;

            image.src = imageSrc;
          });
        };

        const imageFromFile = async (file: FileWithSize) => {
          return new Promise<HTMLImageElement>((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = async () => {
              const image = await readImageAsync(reader.result as string);
              resolve(image);
            };

            reader.onerror = reject;

            reader.readAsDataURL(file);
          });
        };

        await Promise.all(
          acceptedFiles.map(async file => {
            const image = await imageFromFile(file);
            file.preview = URL.createObjectURL(file);
            file.width = image.width;
            file.height = image.height;
          })
        );
      }

      setFiles(acceptedFiles);
      getFiles(acceptedFiles);
    },
    [getFiles, fileType]
  );

  const onDragStart: React.DragEventHandler<HTMLImageElement> = dragEvent => {
    const image = dragEvent.target as HTMLImageElement;
    setDragId(+image.id);
    dragEvent.dataTransfer.effectAllowed = 'move';
    dragEvent.dataTransfer.setDragImage(image, 30, 30);
    image.style.opacity = '0.01';
  };

  const onDragOver: React.DragEventHandler<HTMLElement> = dragEvent => {
    dragEvent.preventDefault();
    return false;
  };

  const onDragEnter: React.DragEventHandler<HTMLElement> = dragEvent => {
    const imageUnderneath = dragEvent.target as HTMLImageElement;
    if (+imageUnderneath.id != dragId) imageUnderneath.style.opacity = '0.5';
  };

  const onDragLeave: React.DragEventHandler<HTMLElement> = dragEvent => {
    const imageUnderneath = dragEvent.target as HTMLImageElement;
    if (+imageUnderneath.id != dragId) imageUnderneath.style.opacity = '1';
  };

  const onDragEnd: React.DragEventHandler<HTMLElement> = dragEvent => {
    const image = dragEvent.target as HTMLImageElement;
    image.style.opacity = '1';
  };

  const onDropImage: React.DragEventHandler<HTMLImageElement> = dragEvent => {
    const dropImage = dragEvent.target as HTMLImageElement;
    dropImage.style.opacity = '1';
    const dropId = +dropImage.id;
    const newFiles = [...files];
    const dragFile = files[dragId!];
    newFiles.splice(dragId!, 1);
    newFiles.splice(dropId, 0, dragFile);
    setFiles(newFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: fileType,
    onDrop,
    multiple,
  });

  const imageThumbs = (
    <aside className="flex flex-row flex-wrap mt-4 gap-4">
      {files.map((file, index) => (
        <div className="flex min-w-0 overflow-hidden" key={index}>
          <img
            id={index.toString()}
            src={file.preview!}
            alt="Preview image of property"
            width={thumbnailSize?.width ?? 120}
            height={thumbnailSize?.height ?? 80}
            className="block object-cover rounded"
            draggable="true"
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDropImage}
          />
        </div>
      ))}
    </aside>
  );

  const fileList = (
    <aside className="flex flex-col flex-wrap mt-4 gap-4">
      {files.map((file, index) => (
        <ul className="text-sm" key={index}>
          <li>
            File: <span className="font-light">{file.name}</span>
          </li>
        </ul>
      ))}
    </aside>
  );

  return (
    <section className="container">
      <div
        {...getRootProps({
          className: className,
        })}>
        <input {...getInputProps()} />
        <p>{text}</p>
      </div>
      {files.length ? (fileType.startsWith('image/') ? imageThumbs : fileList) : null}
    </section>
  );
};

export default FilesDropInput;
