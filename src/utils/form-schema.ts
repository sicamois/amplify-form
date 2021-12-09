import { capitalize } from './capitalize';
import { FormSchema, Option } from '../types';

interface Type {
  kind: string;
  name?: string;
  ofType?: Type;
}

interface Field {
  kind: string;
  name: string;
  description?: string;
  args?: any[];
  type?: Type;
  fields?: Field[];
  inputFields?: Field[];
  interfaces?: any;
  enumValues?: Field[];
  isDeprecated?: boolean;
  deprecationReason?: string;
  defaultValue?: any;
  possibleTypes?: any;
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

const getTypesFor = (graphqlJSONSchema: GraphQLJSONSchema) => {
  const types: Field[] | undefined = graphqlJSONSchema?.data.__schema?.types;
  if (!types) throw Error(`Invalid GraphQL JSON Schema`);
  return types;
};

const getLabel = (name: string, labelMap?: Map<string, string>) =>
  capitalize(labelMap?.get(name) || name);

const getEnumValues = (name: string, types: Field[], labelMap?: Map<string, string>): Option[] => {
  const field = types.find(type => type.name == name && type.kind == 'ENUM');
  if (!field) throw Error(`Unable to find enum ${name}`);
  return field.enumValues!.map(value => {
    return {
      label: getLabel(value.name, labelMap),
      value: value.name,
    };
  });
};

export const formSchemaFor = (
  graphqlJSONSchema: GraphQLJSONSchema,
  entity: string,
  mutation?: 'create' | 'update',
  labelMap?: Map<string, string>
) => {
  const fullname = (mutation || '') + entity + 'Input';
  const types = getTypesFor(graphqlJSONSchema);

  const formSchemaForTypes = (fullEntity: string) => {
    const baseField = types.find(type => type.name.toLowerCase() == fullEntity.toLowerCase());
    if (!baseField) throw Error(`Unable to find field ${fullEntity}`);

    const fields = baseField.kind == 'INPUT_OBJECT' ? baseField.inputFields! : baseField.fields;
    if (!fields) throw Error(`Unable to find fields for ${fullEntity}`);

    const fieldFrom: (type: Type) => FormSchema = type => {
      if (type.kind == 'NON_NULL') {
        const field = fieldFrom(type.ofType!)!;
        field.required = true;
        return field;
      }
      if (type.name == 'ID') return { kind: 'relationship' };
      if (type.kind == 'SCALAR' && type.name != 'ID') return { kind: type.name!.toLowerCase() };
      if (type.kind == 'LIST') {
        const ofFormSchema = fieldFrom(type.ofType!)!;
        if (ofFormSchema.kind == 'select')
          return { kind: 'list', of: ofFormSchema, multiple: true };
      }
      if (type.kind == 'ENUM')
        return { kind: 'select', options: getEnumValues(type.name!, types, labelMap) };
      if (type.kind == 'INPUT_OBJECT' || type.kind == 'OBJECT')
        return formSchemaForTypes(type.name!);
      return {};
    };

    const formSchema: FormSchema = {};
    fields.forEach(field => {
      if (field.name == 'id' || field.name.toLowerCase() == 'propertyadlocationid') return;
      const fieldSchema = fieldFrom(field.type!);
      fieldSchema.defaultValue = field.defaultValue;
      fieldSchema.label = getLabel(field.name, labelMap);
      formSchema[field.name] = fieldSchema;
    });
    return formSchema;
  };

  return formSchemaForTypes(fullname);
};