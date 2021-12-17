import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import AmplifyForm from '../src/components/AmplifyForm';
import ComplexSchema from './data/complex-schema.json';
import SimpleSchema from './data/simple-schema.json';

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
      `Unable to find '${absentEntity}' in the schema (looking for 'create${absentEntity}Input')`
    );
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
    const testLabelMap = new Map([['name', 'nom']]);
    render(
      <AmplifyForm
        graphQLJSONSchema={SimpleSchema}
        entity='todo'
        onSubmit={() => {}}
        labelMap={testLabelMap}
      />
    );

    const textareaElement = screen.getByText('Nom');
    expect(textareaElement).toBeInstanceOf(HTMLLabelElement);
  });

  it('renders correctly when fieldSize prop is set', () => {
    const fieldsSize = {
      name: 'sm',
      description: '4xl',
    };
    const props = {
      graphQLJSONSchema: SimpleSchema,
      entity: 'todo',
      onSubmit: () => {},
      fieldsSize: fieldsSize,
    };
    const tree = renderer.create(<AmplifyForm {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
