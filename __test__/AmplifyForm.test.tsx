/* eslint-env jest */

import { create } from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
// import AmplifyForm from '../dist';
import AmplifyForm from '../src/components/AmplifyForm';
import ComplexSchema from './data/complex-schema.json';
import SimpleSchema from './data/simple-schema.json';
import TestSchema from './data/test-schema.json';
import capitalize from 'lodash/capitalize';
import lowerFirst from 'lodash/lowerFirst';
import {
  AmplifyFormProps,
  FieldsProps,
  FieldsSize,
  FileFields,
  FormTheme,
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

  // it('renders correctly for a simple schema', () => {
  //   const props: AmplifyFormProps = {
  //     graphQLJSONSchema: SimpleSchema,
  //     entity: 'todo',
  //     onSubmit: undefined,
  //   };
  //   const tree = create(<AmplifyForm {...props} />).toJSON();
  //   expect(tree).not.toBeNull();
  //   expect(tree).toMatchSnapshot();
  // });

  // it('renders correctly for a typical schema', () => {
  //   const props: AmplifyFormProps = {
  //     graphQLJSONSchema: TestSchema,
  //     entity: 'post',
  //     onSubmit: undefined,
  //   };
  //   const tree = create(<AmplifyForm {...props} />).toJSON();
  //   expect(tree).not.toBeNull();
  //   expect(tree).toMatchSnapshot();
  // });

  // it('renders correctly for a complex schema', () => {
  //   const props: AmplifyFormProps = {
  //     graphQLJSONSchema: ComplexSchema,
  //     entity: 'propertyAd',
  //     onSubmit: undefined,
  //   };
  //   const tree = create(<AmplifyForm {...props} />).toJSON();
  //   expect(tree).not.toBeNull();
  //   expect(tree).toMatchSnapshot();
  // });

  it('throws error when empty/invalid schema', () => {
    console.error = jest.fn();
    const props: AmplifyFormProps = {
      graphQLJSONSchema: {},
      entity: 'test',
      onSubmit: undefined,
    };
    // Invalid GraphQL JSON Schema
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

  // it('renders correctly a basic image dropzone', async () => {
  //   const props: AmplifyFormProps = {
  //     graphQLJSONSchema: TestSchema,
  //     entity: 'post',
  //     onSubmit: undefined,
  //     imageFields: ['gallery'],
  //   };
  //   const tree = create(<AmplifyForm {...props} />).toJSON();
  //   expect(tree).not.toBeNull();
  //   expect(tree).toMatchSnapshot();
  // });

  // it('renders correctly an customized image dropzone', async () => {
  //   const props: AmplifyFormProps = {
  //     graphQLJSONSchema: TestSchema,
  //     entity: 'post',
  //     onSubmit: undefined,
  //     imageFields: {
  //       gallery: {
  //         text: 'Custom drag n drop text',
  //         fileType: 'image/*',
  //       },
  //     },
  //   };
  //   const tree = create(<AmplifyForm {...props} />).toJSON();
  //   expect(tree).not.toBeNull();
  //   expect(tree).toMatchSnapshot();
  // });

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

  // it('renders correctly a basic file dropzone', () => {
  //   const props: AmplifyFormProps = {
  //     graphQLJSONSchema: TestSchema,
  //     entity: 'post',
  //     onSubmit: undefined,
  //     fileFields: ['gallery'],
  //   };
  //   const tree = create(<AmplifyForm {...props} />).toJSON();
  //   expect(tree).not.toBeNull();
  //   expect(tree).toMatchSnapshot();
  // });

  // it('renders correctly an customized pdf file dropzone', () => {
  //   const props: AmplifyFormProps = {
  //     graphQLJSONSchema: TestSchema,
  //     entity: 'post',
  //     onSubmit: undefined,
  //     fileFields: {
  //       attachment: {
  //         text: 'Custom drag n drop text',
  //         fileType: 'application/pdf',
  //       },
  //     },
  //   };
  //   const tree = create(<AmplifyForm {...props} />).toJSON();
  //   expect(tree).not.toBeNull();
  //   expect(tree).toMatchSnapshot();
  // });

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

  // it('renders correctly a relationship', () => {
  //   const entity = 'post';
  //   const relationEntity = 'author';
  //   const authorRelationship: Relationship = {
  //     entity: relationEntity,
  //     label: capitalize(relationEntity),
  //     items: [{ id: 'id1', name: 'user1' }],
  //     labelField: 'name',
  //   };

  //   const props: AmplifyFormProps = {
  //     graphQLJSONSchema: TestSchema,
  //     entity,
  //     onSubmit: undefined,
  //     relationships: [authorRelationship],
  //   };

  //   const tree = create(<AmplifyForm {...props} />).toJSON();
  //   expect(tree).not.toBeNull();
  //   expect(tree).toMatchSnapshot();
  // });

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

  // it('renders correctly when relationship items are empty', () => {
  //   const entity = 'author';
  //   const labelField = 'name';

  //   const authorRelationship: Relationship = {
  //     entity,
  //     label: capitalize(entity),
  //     items: [],
  //     labelField,
  //   };

  //   const props: AmplifyFormProps = {
  //     graphQLJSONSchema: TestSchema,
  //     entity: 'post',
  //     onSubmit: undefined,
  //     relationships: [authorRelationship],
  //   };
  //   const tree = create(<AmplifyForm {...props} />).toJSON();
  //   expect(tree).not.toBeNull();
  //   expect(tree).toMatchSnapshot();
  // });

  //   it('renders correctly with all options', () => {
  //     const fieldsSize: FieldsSize = {
  //       reference: 'xs',
  //       platform: 'lg',
  //       content: 'screen',
  //     };

  //     const fieldsProps: FieldsProps = {
  //       reference: {
  //         readOnly: true,
  //         defaultValue: 10,
  //       },
  //     };

  //     const imageFields: FileFields = {
  //       gallery: {
  //         text: 'Add images by drag n drop or clik to add',
  //         fileType: 'image/*',
  //       },
  //     };

  //     const fileFields: FileFields = {
  //       attachment: {
  //         text: 'Add a pdf by drag n drop or clik to add',
  //         fileType: 'application/pdf',
  //       },
  //     };

  //     const authorRelationship: Relationship = {
  //       entity: 'author',
  //       label: 'Author',
  //       items: [{ id: 'id1', name: 'user1' }],
  //       labelField: 'name',
  //     };

  //     const theme: FormTheme = { color: 'teal', branding: 'full' };

  //     const props: AmplifyFormProps = {
  //       graphQLJSONSchema: TestSchema,
  //       entity: 'Post',
  //       onSubmit: undefined,
  //       textAreas: ['content'],
  //       fieldsSize,
  //       fieldsProps,
  //       imageFields,
  //       fileFields,
  //       relationships: [authorRelationship],
  //       theme,
  //     };
  //     const tree = create(<AmplifyForm {...props} />).toJSON();
  //     expect(tree).not.toBeNull();
  //     expect(tree).toMatchSnapshot();
  //   });
});
