import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import AmplifyForm from '../dist';
import ComplexSchema from './data/complex-schema.json';
import SimpleSchema from './data/simple-schema.json';
import SchemaWithImages from './data/schema-with-images.json';
import capitalize from 'lodash/capitalize';

describe('AmplifyForm', () => {
  it('renders correctly for a simple schema', () => {
    const props = {
      graphQLJSONSchema: SimpleSchema,
      entity: 'todo',
      onSubmit: () => {},
    };
    const tree = renderer.create(<AmplifyForm {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly for a complex schema', () => {
    const props = {
      graphQLJSONSchema: ComplexSchema,
      entity: 'propertyAd',
      onSubmit: () => {},
    };
    const tree = renderer.create(<AmplifyForm {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('is not case sensitive for entity prop', () => {
    render(
      <AmplifyForm
        graphQLJSONSchema={SimpleSchema}
        entity='TODO'
        onSubmit={() => {}}
      />
    );
    const formElement = screen.getByRole('form');
    expect(formElement).toBeInTheDocument();
  });

  it('throws an error when entity does not exist', () => {
    const absentEntity = 'xxx';
    console.error = jest.fn();
    expect(() =>
      render(
        <AmplifyForm
          graphQLJSONSchema={SimpleSchema}
          entity={absentEntity}
          onSubmit={() => {}}
        />
      )
    ).toThrow(
      `Unable to find '${capitalize(
        absentEntity
      )}' in the schema (looking for 'create${absentEntity}Input')`
    );
  });

  it('sets correctly a required field', () => {
    render(
      <AmplifyForm
        graphQLJSONSchema={SimpleSchema}
        entity='Todo'
        onSubmit={() => {}}
      />
    );
    const inputTextElement = screen.getByRole('textbox', {
      name: capitalize('name'),
    });
    expect(inputTextElement).toBeRequired();
  });

  it('sets correctly a not required field', () => {
    render(
      <AmplifyForm
        graphQLJSONSchema={SimpleSchema}
        entity='Todo'
        onSubmit={() => {}}
      />
    );
    const inputTextElement = screen.getByRole('textbox', {
      name: capitalize('description'),
    });
    expect(inputTextElement).not.toBeRequired();
  });

  it('labels the legend of the fieldset correctly when label prop is set', () => {
    const label = 'Create a todo';
    render(
      <AmplifyForm
        graphQLJSONSchema={SimpleSchema}
        entity='todo'
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
        graphQLJSONSchema={SimpleSchema}
        entity='todo'
        onSubmit={() => {}}
        textAreas={['description']}
      />
    );
  });

  it('does not render a textarea when TextAreas prop is incorrectly set', () => {
    render(
      <AmplifyForm
        graphQLJSONSchema={SimpleSchema}
        entity='todo'
        onSubmit={() => {}}
        textAreas={['xxx']}
      />
    );

    const textareaElement = screen.getAllByRole('textbox');
    expect(textareaElement).not.toBeInstanceOf(HTMLTextAreaElement);
  });

  it('displays custom labels correctly', () => {
    const customLabel = 'nom';
    const testLabelMap = new Map([['name', `${customLabel}`]]);
    render(
      <AmplifyForm
        graphQLJSONSchema={SimpleSchema}
        entity='todo'
        onSubmit={() => {}}
        labelMap={testLabelMap}
      />
    );

    const textareaElement = screen.getByText(capitalize(customLabel));
    expect(textareaElement).toBeInstanceOf(HTMLLabelElement);
  });

  it('sets the right classes when FieldsSize prop is set', () => {
    const fieldsSize = {
      name: 'sm',
      description: 'xl',
    };
    const props = {
      graphQLJSONSchema: SimpleSchema,
      entity: 'todo',
      onSubmit: () => {},
      fieldsSize: fieldsSize,
    };
    render(<AmplifyForm {...props} />);
    const inputNameTextElement = screen.getByRole('textbox', {
      name: capitalize('name'),
    });
    const inputDescriptionTextElement = screen.getByRole('textbox', {
      name: capitalize('description'),
    });
    expect(inputNameTextElement.classList.contains('w-20')).toBeTruthy();
    expect(inputDescriptionTextElement.classList.contains('w-96')).toBeTruthy();
  });

  it('renders correctly when a field is set to read-only', () => {
    const fieldsProps = {
      description: {
        readOnly: true,
      },
    };
    const props = {
      graphQLJSONSchema: SimpleSchema,
      entity: 'todo',
      onSubmit: () => {},
      fieldsProps: fieldsProps,
    };
    const tree = renderer.create(<AmplifyForm {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when a field default value is set', () => {
    const fieldsProps = {
      description: {
        defaultValue: 'This is a description',
      },
    };
    const props = {
      graphQLJSONSchema: SimpleSchema,
      entity: 'todo',
      onSubmit: () => {},
      fieldsProps: fieldsProps,
    };
    const tree = renderer.create(<AmplifyForm {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly a basic image dropzone', () => {
    const props = {
      graphQLJSONSchema: SchemaWithImages,
      entity: 'post',
      onSubmit: () => {},
      imageFields: ['gallery'],
    };
    const tree = renderer.create(<AmplifyForm {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly an customized image dropzone', () => {
    const props = {
      graphQLJSONSchema: SchemaWithImages,
      entity: 'post',
      onSubmit: () => {},
      imageFields: {
        gallery: {
          text: 'Custom drag n drop text',
          fileType: 'image/*',
        },
      },
    };
    const tree = renderer.create(<AmplifyForm {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('sets correctly required images', () => {
    render(
      <AmplifyForm
        graphQLJSONSchema={SchemaWithImages}
        entity='post'
        onSubmit={() => {}}
        imageFields={['gallery']}
      />
    );
    const inputFileElement = screen.getByTitle('gallery');
    expect(inputFileElement).toBeRequired();
  });
});
