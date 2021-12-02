import { capitalize } from './string-helpers';
import { FormSchema, ElementProps, FileField } from '../components/FormComponent';
import { SelectFieldProps } from '../components/FormElements';

interface Type {
  kind: string;
  name: string | null;
  ofType: Type | null;
}

interface Field {
  name: string;
  description: string | null;
  args?: any[];
  type?: Type;
  fields?: Field[] | null;
  inputFields?: Field[] | null;
  interfaces?: any | null;
  enumValues?: Field[] | null;
  isDeprecated?: boolean;
  deprecationReason?: string | null;
  defaultValue?: any;
  possibleTypes?: any | null;
}

interface GraphQLJSONSchema {
  data: {
    __schema: {
      queryType: any;
      mutationType: any;
      subscriptionType: any;
      types: Field[];
      directives: any[];
    };
  };
}

export const formSchemaFromGraphQLTypes: (
  graphqlJSONSchema: GraphQLJSONSchema,
  entity: string,
  fileFields?: FileField[]
) => FormSchema | undefined = (graphqlJSONSchema, entity, fileFields = []) => {
  const formSchema: FormSchema = {};

  const type = graphqlJSONSchema.data.__schema.types.find(
    (type: { name: string }) => type.name.toLowerCase() === entity.toLowerCase()
  );
  if (!type) throw Error(`Unable to find ${entity} in GraphQL Schema`);

  const fields = type.fields || type.inputFields;
  if (!fields) throw Error('Invalid GraphQL Schema');

  fields.forEach(field => {
    const required = field!.type!.kind === 'NON_NULL';
    const type = required ? field!.type!.ofType! : field!.type!;

    if (field.name === 'id' || type.name === 'AWSDateTime') return;

    let fieldCharacteritics: ElementProps | FormSchema = {
      name: field.name,
      label: capitalize(field.name),
      required,
    };

    if (fileFields.some(fileField => fileField.name === field.name)) {
      fieldCharacteritics.type = 'file';
      fieldCharacteritics.multiple = type.kind === 'LIST';
    } else {
      switch (type.kind) {
        case 'SCALAR':
          switch (type.name) {
            case 'String':
              fieldCharacteritics.type = 'text';
              break;
            case 'Int':
              fieldCharacteritics.type = 'number';
              break;
            case 'Float':
              fieldCharacteritics.type = 'number';
              fieldCharacteritics.step = 0.01;
              break;
            case 'Boolean':
              fieldCharacteritics.type = 'checkbox';
              break;
            case 'ID':
              fieldCharacteritics.type = 'relationship';
              break;
          }
          break;

        case 'ENUM':
          fieldCharacteritics.type = 'select';
          (fieldCharacteritics as SelectFieldProps).options = Object.values(type.name!).map(
            value => {
              return {
                value,
                label: capitalize(value),
              };
            }
          );
          break;

        case 'LIST':
          fieldCharacteritics.required =
            fieldCharacteritics.required || type.ofType?.kind === 'NON_NULL';
          fieldCharacteritics.type = 'list';
          fieldCharacteritics.multiple = true;
          const listElementType = type.ofType!.ofType ? type.ofType!.ofType! : type.ofType!;
          if (listElementType.kind === 'ENUM') {
            (fieldCharacteritics as SelectFieldProps).options = Object.values(
              listElementType.name!
            ).map(value => {
              return {
                value,
                label: capitalize(value),
              };
            });
          }
          break;

        case 'INPUT_OBJECT':
          fieldCharacteritics = formSchemaFromGraphQLTypes(graphqlJSONSchema, type.name!) || {};
          break;
      }
    }

    formSchema[field.name!] = fieldCharacteritics;
  });
  return formSchema;
};
