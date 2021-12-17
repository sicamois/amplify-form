import React from 'react';
import { render, screen } from '@testing-library/react';
import AmplifyForm from '../src/components/AmplifyForm';
import ComplexSchema from './data/complex-schema.json';
import SimpleSchema from './data/simple-schema.json';
import { container } from 'aws-amplify';

describe('AmplifyForm', () => {
  it('renders a form for a simple schema', () => {
    render(
      <AmplifyForm
        graphQLJSONSchema={SimpleSchema}
        entity='todo'
        onSubmit={() => {}}
      />
    );

    const formElement = screen.getByRole('form');
    expect(formElement).toBeInTheDocument();
  });

  it('renders a form for a complex schema', () => {
    render(
      <AmplifyForm
        graphQLJSONSchema={ComplexSchema}
        entity='propertyAd'
        onSubmit={() => {}}
      />
    );

    const formElement = screen.getByRole('form');
    expect(formElement).toBeInTheDocument();
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

    const textareaElement = screen.getByRole('textbox', {
      name: 'Description',
    });
    expect(textareaElement).toBeInTheDocument();
  });
});
