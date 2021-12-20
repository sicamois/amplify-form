import { Form, Formik, FormikProps } from 'formik';
import { FC } from 'react';
import { create } from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import {
  CheckboxField,
  NumberField,
  TextAreaField,
  TextField,
} from '../src/components/FormElements';
import { FieldProps, FormTheme } from '../src/types';

const TestForm: FC<{ initialValues: Record<string, any> }> = ({
  initialValues,
  children,
}) => {
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={() => {}}>
      {() => <Form>{children}</Form>}
    </Formik>
  );
};

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
    expect(inputElement.classList).toContain('w-36');
    expect(inputElement.classList).not.toContain('w-full');
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
    expect(inputElement.classList).toContain('w-full');
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
    expect(inputElement.classList).toContain('focus:border-lime-600');
    expect(inputElement.classList).not.toContain('focus:border-red-900');
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
    expect(inputElement.classList).toContain('w-36');
    expect(inputElement.classList).not.toContain('w-100');
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
    expect(inputElement.classList).toContain('w-100');
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
    expect(inputElement.classList).toContain('focus:border-lime-600');
    expect(inputElement.classList).not.toContain('focus:border-red-900');
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
    expect(inputElement.classList).toContain('w-20');
    expect(inputElement.classList).not.toContain('w-36');
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
    expect(inputElement.classList).toContain('w-36');
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
    expect(inputElement.classList).toContain('focus:border-lime-600');
    expect(inputElement.classList).not.toContain('focus:border-red-900');
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
    expect(divElement.classList).toContain('w-20');
    expect(divElement.classList).not.toContain('w-36');
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
    expect(divElement.classList).toContain('w-36');
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
    expect(inputElement.classList).toContain('accent-lime-600');
    expect(inputElement.classList).not.toContain('accent-red-900');
  });
});
