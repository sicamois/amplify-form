import { Form, Formik } from 'formik';
import { FC } from 'react';
import { act, create } from 'react-test-renderer';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  CheckboxField,
  FieldSet,
  NumberField,
  TextAreaField,
  TextField,
  SubmitButton,
  FieldWithError,
  FilesDropField,
  SelectField,
} from '../src/components/FormElements/FormElements';
import {
  FieldProps,
  FormTheme,
  SelectFieldProps,
  Option,
  FilesDropFieldProps,
  SubmitButtonProps,
} from '../src/types';
import { capitalize } from 'lodash';
import { string as yupString, object as yupObject, AnySchema } from 'yup';

const handleSubmit = jest.fn();

const TestForm: FC<{
  initialValues: Record<string, any>;
  validationSchema?: AnySchema;
}> = ({ initialValues, validationSchema, children }) => {
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {() => (
        <Form noValidate name='test-schema'>
          {children}
        </Form>
      )}
    </Formik>
  );
};

describe('FieldWithError', () => {
  let spy: jest.SpyInstance;
  let spyError: jest.SpyInstance;
  let spyWarn: jest.SpyInstance;
  beforeAll(() => {
    spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    spyError = jest.spyOn(console, 'error').mockImplementation(() => {});
    spyWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterAll(() => {
    spy.mockRestore();
    spyError.mockRestore();
    spyWarn.mockRestore();
  });

  it('renders correctly with label', () => {
    const name = 'set';
    const label = 'Infos';
    const props: FieldProps = {
      name,
      label,
    };
    const tree = create(
      <TestForm initialValues={{}}>
        <FieldWithError {...props}>
          <div></div>
        </FieldWithError>
      </TestForm>
    ).toJSON();
    expect(tree).not.toBeNull();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly without label', () => {
    const name = 'set';
    const props: FieldProps = {
      name,
    };
    const tree = create(
      <TestForm initialValues={{}}>
        <FieldWithError {...props}>
          <div></div>
        </FieldWithError>
      </TestForm>
    ).toJSON();
    expect(tree).not.toBeNull();
    expect(tree).toMatchSnapshot();
  });

  it('sets field size correctly when prop is passed', () => {
    const name = 'set';
    const label = 'Infos';
    const props: FieldProps = {
      name,
      label,
      fieldSize: 'md',
    };
    render(
      <TestForm initialValues={{ title: '' }}>
        <FieldWithError {...props} />
      </TestForm>
    );
    const labelElement = screen.getByText(label);
    expect(labelElement).toHaveClass('w-36');
    expect(labelElement).not.toHaveClass('w-full');
  });

  it('set field size to default when prop is set incorrectly', () => {
    const name = 'set';
    const label = 'Infos';
    const props: FieldProps = {
      name,
      label,
      fieldSize: 'xxx',
    };
    render(
      <TestForm initialValues={{ title: '' }}>
        <FieldWithError {...props} />
      </TestForm>
    );
    const labelElement = screen.getByText(label);
    expect(labelElement).toHaveClass('w-full');
  });

  it('sets theme correctly when prop is passed', () => {
    const name = 'set';
    const label = 'Infos';
    const theme: FormTheme = { color: 'lime' };
    const props: FieldProps = {
      name,
      label,
      theme,
    };
    render(
      <TestForm initialValues={{}}>
        <FieldWithError {...props} />
      </TestForm>
    );
    const labelElement = screen.getByText(label);
    expect(labelElement).toHaveClass('peer-focus:text-lime-600');
    expect(labelElement).not.toHaveClass('peer-focus:text-red-900');
  });

  it('sets labelCentered correctly when prop is passed', () => {
    const name = 'set';
    const label = 'Infos';
    const props: FieldProps = {
      name,
      label,
    };
    const renderResult = render(
      <TestForm initialValues={{}}>
        <FieldWithError {...props} />
      </TestForm>
    );
    const labelElement = screen.getByText(label);
    expect(labelElement).not.toHaveClass('text-center');

    renderResult.unmount();
    props.labelCentered = true;
    render(
      <TestForm initialValues={{}}>
        <FieldWithError {...props} />
      </TestForm>
    );
    const labelCenteredElement = screen.getByText(label);
    expect(labelCenteredElement).toHaveClass('text-center');
  });

  it('display a child when passed', () => {
    const name = 'set';
    const label = 'Infos';
    const props: FieldProps = {
      name,
      label,
      required: true,
    };
    const renderResult = render(
      <TestForm initialValues={{}}>
        <FieldWithError {...props}>
          <input type='text' id='tequila' required={true} />
          <label htmlFor='tequila'>Chamukos tequila</label>
        </FieldWithError>
        <SubmitButton />
      </TestForm>
    );
    const inputElement = screen.getByRole('textbox', {
      name: 'Chamukos tequila',
    });
    expect(inputElement).toBeVisible();
    expect(inputElement).toBeVisible();
  });
});

describe('TextField', () => {
  let spy: jest.SpyInstance;
  let spyError: jest.SpyInstance;
  let spyWarn: jest.SpyInstance;
  beforeAll(() => {
    spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    spyError = jest.spyOn(console, 'error').mockImplementation(() => {});
    spyWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterAll(() => {
    spy.mockRestore();
    spyError.mockRestore();
    spyWarn.mockRestore();
  });

  it('renders correctly', () => {
    const props: FieldProps = {
      name: 'title',
    };
    const tree = create(
      <TestForm initialValues={{ title: '' }}>
        <TextField {...props} />
      </TestForm>
    ).toJSON();
    expect(tree).not.toBeNull();
    expect(tree).toMatchSnapshot();
  });

  it('sets field size correctly when prop is passed', () => {
    const name = 'title';
    const props: FieldProps = {
      name,
      fieldSize: 'md',
    };
    render(
      <TestForm initialValues={{ title: '' }}>
        <TextField {...props} />
      </TestForm>
    );
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('w-36');
    expect(inputElement).not.toHaveClass('w-full');
  });

  it('set field size to default when prop is set incorrectly', () => {
    const name = 'title';
    const props: FieldProps = {
      name,
      fieldSize: 'xxx',
    };
    render(
      <TestForm initialValues={{ title: '' }}>
        <TextField {...props} />
      </TestForm>
    );
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('w-full');
  });

  it('sets basic theme correctly when prop is passed', () => {
    const name = 'title';
    const theme: FormTheme = { color: 'lime' };
    const props: FieldProps = {
      name,
      theme,
    };
    render(
      <TestForm initialValues={{ title: '' }}>
        <TextField {...props} />
      </TestForm>
    );
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('focus:border-lime-600');
    expect(inputElement).not.toHaveClass('focus:border-red-900');
  });

  it('displays error message when field required and empty', async () => {
    const name = 'title';
    const props: FieldProps = {
      name,
      required: true,
    };
    const validationSchema = yupObject().shape({
      title: yupString().required(),
    });
    render(
      <TestForm
        initialValues={{ title: '' }}
        validationSchema={validationSchema}>
        <TextField {...props} />
        <SubmitButton />
      </TestForm>
    );
    userEvent.click(screen.getByRole('button'));
    let errorElement;
    await waitFor(() => {
      errorElement = screen.getByText(`${name} is a required field`);
    });
    expect(errorElement).toBeVisible();
    expect(errorElement).toHaveClass('text-red-700 text-xs w-full', {
      exact: true,
    });
  });
});

describe('TextAreaField', () => {
  let spy: jest.SpyInstance;
  let spyError: jest.SpyInstance;
  let spyWarn: jest.SpyInstance;
  beforeAll(() => {
    spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    spyError = jest.spyOn(console, 'error').mockImplementation(() => {});
    spyWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterAll(() => {
    spy.mockRestore();
    spyError.mockRestore();
    spyWarn.mockRestore();
  });

  it('renders correctly', () => {
    const props: FieldProps = {
      name: 'title',
    };
    const tree = create(
      <TestForm initialValues={{ title: '' }}>
        <TextAreaField {...props} />
      </TestForm>
    ).toJSON();
    expect(tree).not.toBeNull();
    expect(tree).toMatchSnapshot();
  });

  it('sets field size correctly when prop is passed', () => {
    const name = 'title';
    const props: FieldProps = {
      name,
      fieldSize: 'md',
    };
    render(
      <TestForm initialValues={{ title: '' }}>
        <TextAreaField {...props} />
      </TestForm>
    );
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('w-36');
    expect(inputElement).not.toHaveClass('w-100');
  });

  it('set field size to default when prop is set incorrectly', () => {
    const name = 'title';
    const props: FieldProps = {
      name,
      fieldSize: 'xxx',
    };
    render(
      <TestForm initialValues={{ title: '' }}>
        <TextAreaField {...props} />
      </TestForm>
    );
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('w-100');
  });

  it('sets basic theme correctly when prop is passed', () => {
    const name = 'title';
    const theme: FormTheme = { color: 'lime' };
    const props: FieldProps = {
      name,
      theme,
    };
    render(
      <TestForm initialValues={{ title: '' }}>
        <TextAreaField {...props} />
      </TestForm>
    );
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('focus:border-lime-600');
    expect(inputElement).not.toHaveClass('focus:border-red-900');
  });

  it('displays error message when field required and empty', async () => {
    const name = 'title';
    const props: FieldProps = {
      name,
      required: true,
    };
    const validationSchema = yupObject().shape({
      title: yupString().required(),
    });
    render(
      <TestForm
        initialValues={{ title: '' }}
        validationSchema={validationSchema}>
        <TextAreaField {...props} />
        <SubmitButton />
      </TestForm>
    );
    userEvent.click(screen.getByRole('button'));
    let errorElement;
    await waitFor(() => {
      errorElement = screen.getByText(`${name} is a required field`);
    });
    expect(errorElement).toBeVisible();
    expect(errorElement).toHaveClass('text-red-700 text-xs w-100', {
      exact: true,
    });
  });
});

describe('NumberField', () => {
  let spy: jest.SpyInstance;
  let spyError: jest.SpyInstance;
  let spyWarn: jest.SpyInstance;
  beforeAll(() => {
    spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    spyError = jest.spyOn(console, 'error').mockImplementation(() => {});
    spyWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterAll(() => {
    spy.mockRestore();
    spyError.mockRestore();
    spyWarn.mockRestore();
  });

  it('renders correctly', () => {
    const props: FieldProps = {
      name: 'ref',
    };
    const tree = create(
      <TestForm initialValues={{ ref: '' }}>
        <NumberField {...props} />
      </TestForm>
    ).toJSON();
    expect(tree).not.toBeNull();
    expect(tree).toMatchSnapshot();
  });

  it('sets field size correctly when prop is passed', () => {
    const name = 'ref';
    const props: FieldProps = {
      name,
      fieldSize: 'sm',
    };
    render(
      <TestForm initialValues={{ ref: '' }}>
        <NumberField {...props} />
      </TestForm>
    );
    const inputElement = screen.getByRole('spinbutton');
    expect(inputElement).toHaveClass('w-20');
    expect(inputElement).not.toHaveClass('w-36');
  });

  it('set field size to default when prop is set incorrectly', () => {
    const name = 'ref';
    const props: FieldProps = {
      name,
      fieldSize: 'xxx',
    };
    render(
      <TestForm initialValues={{ ref: '' }}>
        <NumberField {...props} />
      </TestForm>
    );
    const inputElement = screen.getByRole('spinbutton');
    expect(inputElement).toHaveClass('w-36');
  });

  it('sets basic theme correctly when prop is passed', () => {
    const name = 'ref';
    const theme: FormTheme = { color: 'lime' };
    const props: FieldProps = {
      name,
      theme,
    };
    render(
      <TestForm initialValues={{ ref: '' }}>
        <NumberField {...props} />
      </TestForm>
    );
    const inputElement = screen.getByRole('spinbutton');
    expect(inputElement).toHaveClass('focus:border-lime-600');
    expect(inputElement).not.toHaveClass('focus:border-red-900');
  });

  it('sets step correctly when prop is passed', () => {
    const name = 'ref';
    const props: FieldProps = {
      name,
      step: 0.01,
    };
    render(
      <TestForm initialValues={{ ref: '' }}>
        <NumberField {...props} />
      </TestForm>
    );
    const inputElement = screen.getByRole('spinbutton') as HTMLInputElement;
    expect(inputElement.step).toBe(props.step.toString());
  });

  it('displays error message when field required and empty', async () => {
    const name = 'title';
    const props: FieldProps = {
      name,
      required: true,
    };
    const validationSchema = yupObject().shape({
      title: yupString().required(),
    });
    render(
      <TestForm
        initialValues={{ title: '' }}
        validationSchema={validationSchema}>
        <NumberField {...props} />
        <SubmitButton />
      </TestForm>
    );
    userEvent.click(screen.getByRole('button'));
    let errorElement;
    await waitFor(() => {
      errorElement = screen.getByText(`${name} is a required field`);
    });
    expect(errorElement).toBeVisible();
    expect(errorElement).toHaveClass('text-red-700 text-xs w-36', {
      exact: true,
    });
  });
});

describe('CheckboxField', () => {
  let spy: jest.SpyInstance;
  let spyError: jest.SpyInstance;
  let spyWarn: jest.SpyInstance;
  beforeAll(() => {
    spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    spyError = jest.spyOn(console, 'error').mockImplementation(() => {});
    spyWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterAll(() => {
    spy.mockRestore();
    spyError.mockRestore();
    spyWarn.mockRestore();
  });

  it('renders correctly', () => {
    const props: FieldProps = {
      name: 'public',
    };
    const tree = create(
      <TestForm initialValues={{ public: '' }}>
        <CheckboxField {...props} />
      </TestForm>
    ).toJSON();
    expect(tree).not.toBeNull();
    expect(tree).toMatchSnapshot();
  });

  it('sets field size correctly when prop is passed', () => {
    const name = 'public';
    const props: FieldProps = {
      name,
      fieldSize: 'sm',
    };
    render(
      <TestForm initialValues={{ public: '' }}>
        <CheckboxField {...props} />
      </TestForm>
    );
    const divElement = screen.getByTestId(`${name}-div`);
    expect(divElement).toHaveClass('w-20');
    expect(divElement).not.toHaveClass('w-36');
  });

  it('set field size to default when prop is set incorrectly', () => {
    const name = 'public';
    const props: FieldProps = {
      name,
      fieldSize: 'xxx',
    };
    render(
      <TestForm initialValues={{ public: '' }}>
        <CheckboxField {...props} />
      </TestForm>
    );
    const divElement = screen.getByTestId(`${name}-div`);
    expect(divElement).toHaveClass('w-36');
  });

  it('sets basic theme correctly when prop is passed', () => {
    const name = 'public';
    const theme: FormTheme = { color: 'lime' };
    const props: FieldProps = {
      name,
      theme,
    };
    render(
      <TestForm initialValues={{ public: '' }}>
        <CheckboxField {...props} />
      </TestForm>
    );
    const inputElement = screen.getByRole('checkbox');
    expect(inputElement).toHaveClass('accent-lime-600');
    expect(inputElement).not.toHaveClass('accent-red-900');
  });

  it('displays error message when field required and empty', async () => {
    const name = 'title';
    const props: FieldProps = {
      name,
      required: true,
    };
    const validationSchema = yupObject().shape({
      title: yupString().required(),
    });
    render(
      <TestForm
        initialValues={{ title: '' }}
        validationSchema={validationSchema}>
        <CheckboxField {...props} />
        <SubmitButton />
      </TestForm>
    );
    userEvent.click(screen.getByRole('button'));
    let errorElement;
    await waitFor(() => {
      errorElement = screen.getByText(`${name} is a required field`);
    });
    expect(errorElement).toBeVisible();
    expect(errorElement).toHaveClass('text-red-700 text-xs w-36', {
      exact: true,
    });
  });
});

describe('FieldSet', () => {
  let spy: jest.SpyInstance;
  let spyError: jest.SpyInstance;
  let spyWarn: jest.SpyInstance;
  beforeAll(() => {
    spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    spyError = jest.spyOn(console, 'error').mockImplementation(() => {});
    spyWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterAll(() => {
    spy.mockRestore();
    spyError.mockRestore();
    spyWarn.mockRestore();
  });

  it('renders correctly', () => {
    const name = 'set';
    const label = 'Infos';
    const props: FieldProps = {
      name,
      label,
    };
    const tree = create(
      <TestForm initialValues={{}}>
        <FieldSet {...props}>
          <div></div>
        </FieldSet>
      </TestForm>
    ).toJSON();
    expect(tree).not.toBeNull();
    expect(tree).toMatchSnapshot();
  });

  it('defaults label to name when no label is passed', () => {
    const name = 'field_set';
    const props: FieldProps = {
      name,
    };
    render(
      <TestForm initialValues={{ ref: '' }}>
        <FieldSet {...props} />
      </TestForm>
    );
    const legendElement = screen.getByTestId(
      `${name}-legend`
    ) as HTMLLegendElement;
    expect(legendElement.textContent).toBe(
      // @ts-ignore
      capitalize(name).replaceAll('_', ' ')
    );
  });

  it('sets basic theme correctly when prop is passed', () => {
    const name = 'set';
    const label = 'Infos';
    const theme: FormTheme = { color: 'lime' };
    const props: FieldProps = {
      name,
      label,
      theme,
    };
    render(
      <TestForm initialValues={{ ref: '' }}>
        <FieldSet {...props} />
      </TestForm>
    );
    const fieldsetElement = screen.getByRole('group');
    const legendElement = screen.getByTestId(`${name}-legend`);
    expect(fieldsetElement).not.toHaveClass('border-lime-600');
    expect(legendElement).toHaveClass('text-lime-600');
    expect(legendElement).not.toHaveClass('text-red-900');
  });

  it('sets full theme correctly when prop is passed', () => {
    const name = 'set';
    const label = 'Infos';
    const theme: FormTheme = { color: 'lime', branding: 'full' };
    const props: FieldProps = {
      name,
      label,
      theme,
    };
    render(
      <TestForm initialValues={{ ref: '' }}>
        <FieldSet {...props} />
      </TestForm>
    );
    const fieldsetElement = screen.getByRole('group');
    const legendElement = screen.getByTestId(`${name}-legend`);
    expect(fieldsetElement).toHaveClass('border-lime-600');
    expect(legendElement).toHaveClass('text-lime-600');
    expect(legendElement).not.toHaveClass('text-red-900');
  });
});

describe('SelectField', () => {
  let spy: jest.SpyInstance;
  let spyError: jest.SpyInstance;
  let spyWarn: jest.SpyInstance;
  beforeAll(() => {
    spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    spyError = jest.spyOn(console, 'error').mockImplementation(() => {});
    spyWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterAll(() => {
    spy.mockRestore();
    spyError.mockRestore();
    spyWarn.mockRestore();
  });

  it('renders correctly', () => {
    const options: Option[] = [
      { value: 'id1', label: 'option 1' },
      { value: 'id2', label: 'option 2' },
      { value: 'id3', label: 'option 3' },
      { value: 'id4', label: 'option 4' },
    ];
    const props: SelectFieldProps = {
      name: 'public',
      options: options,
    };
    const tree = create(
      <TestForm initialValues={{ public: '' }}>
        <SelectField {...props} />
      </TestForm>
    ).toJSON();
    expect(tree).not.toBeNull();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple=true', () => {
    const options: Option[] = [
      { value: 'id1', label: 'option 1' },
      { value: 'id2', label: 'option 2' },
      { value: 'id3', label: 'option 3' },
      { value: 'id4', label: 'option 4' },
    ];
    const props: SelectFieldProps = {
      name: 'public',
      options: options,
      multiple: true,
    };
    let root;
    act(() => {
      root = create(
        <TestForm initialValues={{ public: '' }}>
          <SelectField {...props} />
        </TestForm>
      );
    });
    expect(root.toJSON()).not.toBeNull();
    expect(root.toJSON()).toMatchSnapshot();
  });

  it('sets field size correctly when prop is passed', () => {
    const options: Option[] = [
      { value: 'id1', label: 'option 1' },
      { value: 'id2', label: 'option 2' },
      { value: 'id3', label: 'option 3' },
      { value: 'id4', label: 'option 4' },
    ];
    const name = 'public';
    const props: SelectFieldProps = {
      name,
      options: options,
      fieldSize: 'sm',
    };
    render(
      <TestForm initialValues={{ public: '' }}>
        <SelectField {...props} />
      </TestForm>
    );
    const divElement = screen.getByTestId(`${name}-sizing-div`);
    expect(divElement).toHaveClass('w-20');
    expect(divElement).not.toHaveClass('w-36');
  });

  it('set field size to default when prop is set incorrectly', () => {
    const options: Option[] = [
      { value: 'id1', label: 'option 1' },
      { value: 'id2', label: 'option 2' },
      { value: 'id3', label: 'option 3' },
      { value: 'id4', label: 'option 4' },
    ];
    const name = 'public';
    const props: SelectFieldProps = {
      name,
      options: options,
      fieldSize: 'xxx',
    };
    render(
      <TestForm initialValues={{ public: '' }}>
        <SelectField {...props} />
      </TestForm>
    );
    const divElement = screen.getByTestId(`${name}-sizing-div`);
    expect(divElement).toHaveClass('w-36');
  });

  it('set label correctly when prop is passed', () => {
    const options: Option[] = [
      { value: 'id1', label: 'option 1' },
      { value: 'id2', label: 'option 2' },
      { value: 'id3', label: 'option 3' },
      { value: 'id4', label: 'option 4' },
    ];
    const name = 'public';
    const selectLabel = 'a select label';
    const props: SelectFieldProps = {
      name,
      options: options,
      selectLabel,
    };
    render(
      <TestForm initialValues={{ public: '' }}>
        <SelectField {...props} />
      </TestForm>
    );
    const divElement = screen.getByText(selectLabel);
    expect(divElement).toBeVisible();
  });

  it('sets basic theme correctly when prop is passed', () => {
    const options: Option[] = [
      { value: 'id1', label: 'option 1' },
      { value: 'id2', label: 'option 2' },
      { value: 'id3', label: 'option 3' },
      { value: 'id4', label: 'option 4' },
    ];
    const theme: FormTheme = { color: 'lime' };
    const props: SelectFieldProps = {
      name: 'public',
      options: options,
      theme,
    };
    let root;
    act(() => {
      root = create(
        <TestForm initialValues={{ public: '' }}>
          <SelectField {...props} />
        </TestForm>
      );
    });
    expect(root.toJSON()).not.toBeNull();
    expect(root.toJSON()).toMatchSnapshot();
  });

  it('sets full theme correctly when prop is passed', () => {
    const options: Option[] = [
      { value: 'id1', label: 'option 1' },
      { value: 'id2', label: 'option 2' },
      { value: 'id3', label: 'option 3' },
      { value: 'id4', label: 'option 4' },
    ];
    const theme: FormTheme = { color: 'lime', branding: 'full' };
    const props: SelectFieldProps = {
      name: 'public',
      options: options,
      theme,
    };
    let root;
    act(() => {
      root = create(
        <TestForm initialValues={{ public: '' }}>
          <SelectField {...props} />
        </TestForm>
      );
    });
    expect(root.toJSON()).not.toBeNull();
    expect(root.toJSON()).toMatchSnapshot();
  });

  it('sets basic theme correctly when prop is passed for a multi-select', () => {
    const options: Option[] = [
      { value: 'id1', label: 'option 1' },
      { value: 'id2', label: 'option 2' },
      { value: 'id3', label: 'option 3' },
      { value: 'id4', label: 'option 4' },
    ];
    const theme: FormTheme = { color: 'lime' };
    const props: SelectFieldProps = {
      name: 'public',
      options: options,
      multiple: true,
      theme,
    };
    let root;
    act(() => {
      root = create(
        <TestForm initialValues={{ public: '' }}>
          <SelectField {...props} />
        </TestForm>
      );
    });
    expect(root.toJSON()).not.toBeNull();
    expect(root.toJSON()).toMatchSnapshot();
  });

  it('sets full theme correctly when prop is passed for a multi-select', () => {
    const options: Option[] = [
      { value: 'id1', label: 'option 1' },
      { value: 'id2', label: 'option 2' },
      { value: 'id3', label: 'option 3' },
      { value: 'id4', label: 'option 4' },
    ];
    const theme: FormTheme = { color: 'lime', branding: 'full' };
    const props: SelectFieldProps = {
      name: 'public',
      options: options,
      multiple: true,
      theme,
    };
    let root;
    act(() => {
      root = create(
        <TestForm initialValues={{ public: '' }}>
          <SelectField {...props} />
        </TestForm>
      );
    });
    expect(root.toJSON()).not.toBeNull();
    expect(root.toJSON()).toMatchSnapshot();
  });
});

describe('FilesDropField', () => {
  let spy: jest.SpyInstance;
  let spyError: jest.SpyInstance;
  let spyWarn: jest.SpyInstance;
  beforeAll(() => {
    spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    spyError = jest.spyOn(console, 'error').mockImplementation(() => {});
    spyWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterAll(() => {
    spy.mockRestore();
    spyError.mockRestore();
    spyWarn.mockRestore();
  });

  it('renders correctly', () => {
    const props: FilesDropFieldProps = {
      name: 'gallery',
    };
    let root;
    act(() => {
      root = create(
        <TestForm initialValues={{}}>
          <FilesDropField {...props} />
        </TestForm>
      );
    });
    expect(root.toJSON()).not.toBeNull();
    expect(root.toJSON()).toMatchSnapshot();
  });
});

describe('SubmitButton', () => {
  let spy: jest.SpyInstance;
  let spyError: jest.SpyInstance;
  let spyWarn: jest.SpyInstance;
  beforeAll(() => {
    spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    spyError = jest.spyOn(console, 'error').mockImplementation(() => {});
    spyWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterAll(() => {
    spy.mockRestore();
    spyError.mockRestore();
    spyWarn.mockRestore();
  });

  it('renders correctly', () => {
    const title = 'create new record';
    const theme: FormTheme = { color: 'lime', branding: 'full' };
    const props: SubmitButtonProps = {
      title,
      theme,
    };
    const tree = create(
      <TestForm initialValues={{}}>
        <SubmitButton {...props} />
      </TestForm>
    ).toJSON();
    expect(tree).not.toBeNull();
    expect(tree).toMatchSnapshot();
  });

  it('sets basic theme correctly when prop is passed', () => {
    const title = 'create new record';
    const theme: FormTheme = { color: 'lime' };
    const props: SubmitButtonProps = {
      title,
      theme,
    };
    render(
      <TestForm initialValues={{}}>
        <SubmitButton {...props} />
      </TestForm>
    );
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('text-white');
    expect(buttonElement).toHaveClass('bg-lime-600');
    expect(buttonElement).not.toHaveClass('bg-red-900');
  });

  it('sets full theme correctly when prop is passed', () => {
    const title = 'create new record';
    const theme: FormTheme = { color: 'lime', branding: 'full' };
    const props: SubmitButtonProps = {
      title,
      theme,
    };
    render(
      <TestForm initialValues={{}}>
        <SubmitButton {...props} />
      </TestForm>
    );
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('text-lime-600');
    expect(buttonElement).toHaveClass('bg-lime-200');
    expect(buttonElement).not.toHaveClass('bg-red-900');
  });
});
