import { create } from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
// import AmplifyForm from '../dist';
import AmplifyForm from '../src/components/AmplifyForm';
import ComplexSchema from './data/complex-schema.json';
import SimpleSchema from './data/simple-schema.json';
import TestSchema from './data/test-schema.json';
import capitalize from 'lodash/capitalize';
import lowerFirst from 'lodash/lowerFirst';

describe('AmplifyForm', () => {
  it('renders correctly for a typical schema', () => {
    const props = {
      graphQLJSONSchema: TestSchema,
      entity: 'post',
      onSubmit: () => {},
    };
    const tree = create(<AmplifyForm {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly for a simple schema', () => {
    const props = {
      graphQLJSONSchema: SimpleSchema,
      entity: 'todo',
      onSubmit: () => {},
    };
    const tree = create(<AmplifyForm {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly for a complex schema', () => {
    const props = {
      graphQLJSONSchema: ComplexSchema,
      entity: 'propertyAd',
      onSubmit: () => {},
    };
    const tree = create(<AmplifyForm {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('throws error when empty/invalid schema', () => {
    console.error = jest.fn();
    const props = {
      graphQLJSONSchema: {},
      entity: 'test',
      onSubmit: () => {},
    };
    // Invalid GraphQL JSON Schema
    expect(() => render(<AmplifyForm {...props} />)).toThrow(
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
    expect(formElement).toBeInTheDocument();
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
    ).toThrow(
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
  });

  it('does not render a textarea when TextAreas prop is incorrectly set', () => {
    render(
      <AmplifyForm
        graphQLJSONSchema={TestSchema}
        entity='post'
        onSubmit={() => {}}
        textAreas={['xxx']}
      />
    );

    const textareaElement = screen.getAllByRole('textbox');
    expect(textareaElement).not.toBeInstanceOf(HTMLTextAreaElement);
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
    const fieldsSize = {
      title: 'sm',
      content: 'xl',
    };
    const props = {
      graphQLJSONSchema: TestSchema,
      entity: 'post',
      onSubmit: () => {},
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

  it('renders correctly when a field is set to read-only', () => {
    const fieldsProps = {
      reference: {
        readOnly: true,
      },
    };
    const props = {
      graphQLJSONSchema: TestSchema,
      entity: 'post',
      onSubmit: () => {},
      fieldsProps: fieldsProps,
    };
    render(<AmplifyForm {...props} />);
    const inputRefElement = screen.getByRole('spinbutton', {
      name: capitalize('reference'),
    });
    expect(inputRefElement.readOnly).toBeTruthy();
  });

  it('renders correctly when a field default value is set', () => {
    const fieldsProps = {
      reference: {
        defaultValue: 10,
      },
    };
    const props = {
      graphQLJSONSchema: TestSchema,
      entity: 'post',
      onSubmit: () => {},
      fieldsProps: fieldsProps,
    };
    render(<AmplifyForm {...props} />);
    const inputRefElement = screen.getByRole('spinbutton', {
      name: capitalize('reference'),
    });
    expect(inputRefElement).toHaveValue(10);
  });

  it('renders correctly a basic image dropzone', () => {
    const props = {
      graphQLJSONSchema: TestSchema,
      entity: 'post',
      onSubmit: () => {},
      imageFields: ['gallery'],
    };
    const tree = create(<AmplifyForm {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly an customized image dropzone', () => {
    const props = {
      graphQLJSONSchema: TestSchema,
      entity: 'post',
      onSubmit: () => {},
      imageFields: {
        gallery: {
          text: 'Custom drag n drop text',
          fileType: 'image/*',
        },
      },
    };
    const tree = create(<AmplifyForm {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('sets correctly required images', () => {
    const props = {
      graphQLJSONSchema: TestSchema,
      entity: 'post',
      onSubmit: () => {},
      imageFields: ['gallery'],
    };
    render(<AmplifyForm {...props} />);
    const inputFileElement = screen.getByTitle('gallery');
    expect(inputFileElement).toBeRequired();
  });

  it('renders correctly a basic file dropzone', () => {
    const props = {
      graphQLJSONSchema: TestSchema,
      entity: 'post',
      onSubmit: () => {},
      fileFields: ['gallery'],
    };
    const tree = create(<AmplifyForm {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly an customized pdf file dropzone', () => {
    const props = {
      graphQLJSONSchema: TestSchema,
      entity: 'post',
      onSubmit: () => {},
      fileFields: {
        attachment: {
          text: 'Custom drag n drop text',
          fileType: 'application/pdf',
        },
      },
    };
    const tree = create(<AmplifyForm {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('sets correctly required files', () => {
    const props = {
      graphQLJSONSchema: TestSchema,
      entity: 'post',
      onSubmit: () => {},
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

  it('renders correctly a relationship', () => {
    const entity = 'post';
    const relationEntity = 'author';
    const authorRelationship = {
      entity: relationEntity,
      label: capitalize(relationEntity),
      items: [{ id: 'id1', name: 'user1' }],
      labelField: 'name',
    };

    const props = {
      graphQLJSONSchema: TestSchema,
      entity,
      onSubmit: () => {},
      relationships: [authorRelationship],
    };

    const tree = create(<AmplifyForm {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('throw an error if the entity in the relationship does not exist', () => {
    const entity = 'post';
    const relationEntity = 'xxx';
    const capitalizedRelationEntity = capitalize(relationEntity);
    const labelField = 'toto';

    const authorRelationship = {
      entity: relationEntity,
      label: capitalizedRelationEntity,
      items: [{ id: 'id1', name: 'user1' }],
      labelField,
    };

    const props = {
      graphQLJSONSchema: TestSchema,
      entity: 'post',
      onSubmit: () => {},
      relationships: [authorRelationship],
    };
    expect(() => render(<AmplifyForm {...props} />)).toThrow(
      `Error in relationship definition : Relationship with ${relationEntity} doesn't exist in ${entity} (looking for field '${lowerFirst(
        entity
      )}${capitalizedRelationEntity}Id')`
    );
  });

  it('throw an error if the labelField is not a string or number', () => {
    const label = 'Author';
    const labelField = 'isActive';

    const authorRelationship = {
      entity: 'author',
      label,
      items: [{ id: 'id1', name: 'user1', isActive: true }],
      labelField,
    };

    const props = {
      graphQLJSONSchema: TestSchema,
      entity: 'post',
      onSubmit: () => {},
      relationships: [authorRelationship],
    };
    expect(() => render(<AmplifyForm {...props} />)).toThrow(
      `Error in relationship definition : ${labelField} in 'items' must be a string or a number (${labelField} is of type 'boolean')`
    );
  });

  it('throw an error if the labelField in the relationship does not exist', () => {
    const entity = 'author';
    const labelField = 'toto';

    const authorRelationship = {
      entity,
      label: capitalize(entity),
      items: [{ id: 'id1', name: 'user1' }],
      labelField,
    };

    const props = {
      graphQLJSONSchema: TestSchema,
      entity: 'post',
      onSubmit: () => {},
      relationships: [authorRelationship],
    };
    expect(() => render(<AmplifyForm {...props} />)).toThrow(
      `Error in relationship definition : ${labelField} does not exist in ${capitalize(
        entity
      )} items (see console logs)`
    );
  });

  // it('throw an error with an empty required relationship', () => {
  //   const label = 'Author';

  //   const authorRelationship = {
  //     entity: 'author',
  //     label,
  //     items: [],
  //     labelField: 'name',
  //   };

  //   const props = {
  //     graphQLJSONSchema: TestSchema,
  //     entity: 'post',
  //     onSubmit: () => {},
  //     relationships: [authorRelationship],
  //   };
  //   expect(() => render(<AmplifyForm {...props} />)).toThrow(
  //     `${label} is required, but it has no value to select (items is empty)`
  //   );
  // });

  it('renders correctly with all options', () => {
    const fieldsSize = {
      reference: 'xs',
      platform: '2xl',
    };

    const fieldsProps = {
      reference: {
        readOnly: true,
        defaultValue: 10,
      },
    };

    const imageFields = {
      gallery: {
        text: 'Add images by drag n drop or clik to add',
        fileType: 'image/*',
      },
    };

    const fileFields = {
      attachment: {
        kind: 'file',
        text: 'Add a pdf by drag n drop or clik to add',
        fileType: 'application/pdf',
      },
    };

    const authorRelationship = {
      entity: 'author',
      label: 'Author',
      items: [{ id: 'id1', name: 'user1' }],
      labelField: 'name',
    };

    const props = {
      graphQLJSONSchema: TestSchema,
      entity: 'Post',
      onSubmit: () => {},
      fieldsSize,
      fieldsProps,
      imageFields,
      fileFields,
      relationships: [authorRelationship],
      theme: { color: 'teal', branding: 'full' },
    };
    const tree = create(<AmplifyForm {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
