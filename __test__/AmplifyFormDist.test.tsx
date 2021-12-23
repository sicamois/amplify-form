import { render, screen } from '@testing-library/react';
import AmplifyForm from '../dist';
import TestSchema from './data/test-schema.json';
import capitalize from 'lodash/capitalize';
import lowerFirst from 'lodash/lowerFirst';
import {
  AmplifyFormProps,
  FieldsProps,
  FieldsSize,
  Relationship,
} from '../src/types';

describe('AmplifyForm', () => {
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

  it('throws error when empty/invalid schema', () => {
    console.error = jest.fn();
    const props: AmplifyFormProps = {
      graphQLJSONSchema: {},
      entity: 'test',
      onSubmit: undefined,
    };
    expect(() => render(<AmplifyForm {...props} />)).toThrowError(
      'Invalid GraphQL JSON Schema'
    );
  });

  it('is not case sensitive for entity prop', () => {
    render(
      <AmplifyForm
        graphQLJSONSchema={TestSchema}
        entity='PoSt'
        onSubmit={() => {}}
      />
    );
    const formElement = screen.getByRole('form');
    expect(formElement).toBeVisible();
  });

  it('throws an error when entity does not exist', () => {
    const absentEntity = 'xxx';
    console.error = jest.fn();
    expect(() =>
      render(
        <AmplifyForm
          graphQLJSONSchema={TestSchema}
          entity={absentEntity}
          onSubmit={() => {}}
        />
      )
    ).toThrowError(
      `Unable to find '${capitalize(
        absentEntity
      )}' in the schema (looking for 'create${absentEntity}Input')`
    );
  });

  it('sets correctly a required field', () => {
    render(
      <AmplifyForm
        graphQLJSONSchema={TestSchema}
        entity='Post'
        onSubmit={() => {}}
      />
    );
    const inputTextElement = screen.getByRole('textbox', {
      name: capitalize('title'),
    });
    expect(inputTextElement).toBeRequired();
  });

  it('sets correctly a not required field', () => {
    render(
      <AmplifyForm
        graphQLJSONSchema={TestSchema}
        entity='Post'
        onSubmit={() => {}}
      />
    );
    const inputTextElement = screen.getByRole('textbox', {
      name: capitalize('content'),
    });
    expect(inputTextElement).not.toBeRequired();
  });

  it('labels the legend of the fieldset correctly when label prop is set', () => {
    const label = 'Create a post';
    render(
      <AmplifyForm
        graphQLJSONSchema={TestSchema}
        entity='post'
        onSubmit={() => {}}
        label={label}
      />
    );
    const legendElement = screen.getByText(label);
    expect(legendElement).toBeInstanceOf(HTMLLegendElement);
  });

  it('renders a textarea when TextAreas prop is set', () => {
    render(
      <AmplifyForm
        graphQLJSONSchema={TestSchema}
        entity='post'
        onSubmit={() => {}}
        textAreas={['content']}
      />
    );
    const textareaElement = screen.getByRole('textbox', {
      name: capitalize('content'),
    });
    expect(textareaElement).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('does not render a textarea when TextAreas prop is incorrectly set', () => {
    const incorrectField = 'xxx';
    expect(() =>
      render(
        <AmplifyForm
          graphQLJSONSchema={TestSchema}
          entity='post'
          onSubmit={() => {}}
          textAreas={[incorrectField]}
        />
      )
    ).toThrowError(
      `Unable to set '${incorrectField}' as textarea field: '${incorrectField}' does not exist in the schema`
    );
  });

  it('displays custom labels correctly', () => {
    const customLabel = 'titre';
    const testLabelMap = new Map([['title', `${customLabel}`]]);
    render(
      <AmplifyForm
        graphQLJSONSchema={TestSchema}
        entity='post'
        onSubmit={() => {}}
        labelMap={testLabelMap}
      />
    );

    const textareaElement = screen.getByText(capitalize(customLabel));
    expect(textareaElement).toBeInstanceOf(HTMLLabelElement);
  });

  it('sets the right classes when FieldsSize prop is set', () => {
    const fieldsSize: FieldsSize = {
      title: 'sm',
      content: 'xl',
    };
    const props: AmplifyFormProps = {
      graphQLJSONSchema: TestSchema,
      entity: 'post',
      onSubmit: undefined,
      fieldsSize: fieldsSize,
    };
    render(<AmplifyForm {...props} />);
    const inputTitleTextElement = screen.getByRole('textbox', {
      name: capitalize('title'),
    });
    const inputContentTextElement = screen.getByRole('textbox', {
      name: capitalize('content'),
    });
    expect(inputTitleTextElement.classList.contains('w-20')).toBeTruthy();
    expect(inputContentTextElement.classList.contains('w-96')).toBeTruthy();
  });

  it('renders correctly when a field default value is set', () => {
    const fieldsProps: FieldsProps = {
      reference: {
        defaultValue: 10,
      },
    };
    const props: AmplifyFormProps = {
      graphQLJSONSchema: TestSchema,
      entity: 'post',
      onSubmit: undefined,
      fieldsProps: fieldsProps,
    };
    render(<AmplifyForm {...props} />);
    const inputRefElement = screen.getByRole('spinbutton', {
      name: capitalize('reference'),
    });
    expect(inputRefElement).toHaveValue(10);
  });

  it('renders correctly when a field is set to read-only', () => {
    const fieldsProps: FieldsProps = {
      reference: {
        readOnly: true,
      },
    };
    const props: AmplifyFormProps = {
      graphQLJSONSchema: TestSchema,
      entity: 'post',
      onSubmit: undefined,
      fieldsProps: fieldsProps,
    };
    render(<AmplifyForm {...props} />);
    const inputRefElement = screen.getByRole('spinbutton', {
      name: capitalize('reference'),
    }) as HTMLInputElement;
    expect(inputRefElement.readOnly).toBeTruthy();
  });

  it('sets correctly required images', () => {
    const props: AmplifyFormProps = {
      graphQLJSONSchema: TestSchema,
      entity: 'post',
      onSubmit: undefined,
      imageFields: ['gallery'],
    };
    render(<AmplifyForm {...props} />);
    const inputFileElement = screen.getByTitle('gallery');
    expect(inputFileElement).toBeRequired();
  });

  it('sets correctly required files', () => {
    const props: AmplifyFormProps = {
      graphQLJSONSchema: TestSchema,
      entity: 'post',
      onSubmit: undefined,
      fileFields: {
        gallery: {
          text: 'Custom drag n drop text',
          fileType: 'application/pdf',
        },
      },
    };
    render(<AmplifyForm {...props} />);
    const inputFileElement = screen.getByTitle('gallery');
    expect(inputFileElement).toBeRequired();
  });

  it('throws an error when fileFields prop is incorrectly set', () => {
    const incorrectField = 'xxx';
    expect(() =>
      render(
        <AmplifyForm
          graphQLJSONSchema={TestSchema}
          entity='post'
          onSubmit={() => {}}
          fileFields={[incorrectField]}
        />
      )
    ).toThrowError(
      `Unable to set '${incorrectField}' as file field: '${incorrectField}' does not exist in the schema`
    );
  });

  it('throws an error when fileFields prop is incorrectly set with FileFieldProps', () => {
    const incorrectField = 'xxx';
    expect(() =>
      render(
        <AmplifyForm
          graphQLJSONSchema={TestSchema}
          entity='post'
          onSubmit={() => {}}
          fileFields={{
            xxx: { fileType: 'application/pdf' },
          }}
        />
      )
    ).toThrowError(
      `Unable to set '${incorrectField}' as file field: '${incorrectField}' does not exist in the schema`
    );
  });

  it('throws an error when imageFields prop is incorrectly set', () => {
    const incorrectField = 'xxx';
    expect(() =>
      render(
        <AmplifyForm
          graphQLJSONSchema={TestSchema}
          entity='post'
          onSubmit={() => {}}
          imageFields={[incorrectField]}
        />
      )
    ).toThrowError(
      `Unable to set '${incorrectField}' as image field: '${incorrectField}' does not exist in the schema`
    );
  });

  it('throws an error when imageFields prop is incorrectly set with FileFieldProps', () => {
    const incorrectField = 'xxx';
    expect(() =>
      render(
        <AmplifyForm
          graphQLJSONSchema={TestSchema}
          entity='post'
          onSubmit={() => {}}
          imageFields={{
            xxx: { fileType: 'application/pdf' },
          }}
        />
      )
    ).toThrowError(
      `Unable to set '${incorrectField}' as image field: '${incorrectField}' does not exist in the schema`
    );
  });

  it('throw an error if the entity in the relationship does not exist', () => {
    const entity = 'post';
    const relationEntity = 'xxx';
    const capitalizedRelationEntity = capitalize(relationEntity);
    const labelField = 'toto';
    const authorRelationship: Relationship = {
      entity: relationEntity,
      label: capitalizedRelationEntity,
      items: [{ id: 'id1', name: 'user1' }],
      labelField,
    };
    const props: AmplifyFormProps = {
      graphQLJSONSchema: TestSchema,
      entity: 'post',
      onSubmit: undefined,
      relationships: [authorRelationship],
    };
    expect(() => render(<AmplifyForm {...props} />)).toThrowError(
      `Error in relationship definition : Relationship with ${relationEntity} doesn't exist in ${entity} (looking for field '${lowerFirst(
        entity
      )}${capitalizedRelationEntity}Id')`
    );
  });

  it('throw an error if the labelField is not a string or number', () => {
    const label = 'Author';
    const labelField = 'isActive';
    const authorRelationship: Relationship = {
      entity: 'author',
      label,
      items: [{ id: 'id1', name: 'user1', isActive: true }],
      labelField,
    };
    const props: AmplifyFormProps = {
      graphQLJSONSchema: TestSchema,
      entity: 'post',
      onSubmit: undefined,
      relationships: [authorRelationship],
    };
    expect(() => render(<AmplifyForm {...props} />)).toThrowError(
      `Error in relationship definition : ${labelField} in 'items' must be a string or a number (${labelField} is of type 'boolean')`
    );
  });

  it('throw an error if the labelField in the relationship does not exist', () => {
    const entity = 'author';
    const labelField = 'toto';
    const authorRelationship: Relationship = {
      entity,
      label: capitalize(entity),
      items: [{ id: 'id1', name: 'user1' }],
      labelField,
    };
    const props: AmplifyFormProps = {
      graphQLJSONSchema: TestSchema,
      entity: 'post',
      onSubmit: undefined,
      relationships: [authorRelationship],
    };
    expect(() => render(<AmplifyForm {...props} />)).toThrowError(
      `Error in relationship definition : ${labelField} does not exist in ${capitalize(
        entity
      )} items (see console logs)`
    );
  });
});
