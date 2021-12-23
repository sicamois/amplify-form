import { render, screen } from '@testing-library/react';
import FilesDropInput from '../src/components/FilesDropInput';
import { FilesDropInputProps } from '../src/types';

describe('FileDropInput', () => {
  it('renders correctly when files are set as default value', () => {
    const file1 = new File([], 'test-file1.txt');
    const file2 = new File([], 'test-file2.txt');
    const props: FilesDropInputProps = {
      setValue: () => {},
      defaultValue: [file1, file2],
    };
    render(<FilesDropInput {...props} />);
    const file1NameElement = screen.getByText(file1.name);
    const file2NameElement = screen.getByText(file2.name);
    expect(file1NameElement).toBeVisible();
    expect(file2NameElement).toBeVisible();
  });

  it('renders correctly when default value = []', () => {
    const props: FilesDropInputProps = {
      setValue: () => {},
      defaultValue: [],
    };
    render(<FilesDropInput {...props} />);
    const dragDropElement = screen.getByText(
      "Drag 'n' drop some files here, or click to select files"
    );
    expect(dragDropElement).toBeVisible();
  });

  it("renders correctly when value = ''", () => {
    const props: FilesDropInputProps = {
      setValue: () => {},
      value: '',
    };
    render(<FilesDropInput {...props} />);
    const dragDropElement = screen.getByText(
      "Drag 'n' drop some files here, or click to select files"
    );
    expect(dragDropElement).toBeVisible();
  });
});
