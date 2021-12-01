import { FormSchema, FileField } from '../components/FormComponent';
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
export declare const formSchemaFromGraphQLTypes: (graphqlJSONSchema: GraphQLJSONSchema, entity: string, fileFields?: FileField[]) => FormSchema | undefined;
export {};
