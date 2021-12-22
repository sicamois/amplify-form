import { getEnumValues } from './../src/utils/form-schema';
import { Field, ObjectWithKey, Option } from '../src/types';
import lodashSet from 'lodash/set';
import capitalize from 'lodash/capitalize';
import { parseObject } from '../src/utils/parse-object';

describe('parse-object', () => {
  const testObject = {
    fieldString: 'test',
    fieldNumber: 13,
    fieldBoolean: true,
    fieldStringArray: ['value1', 'value2'],
    fieldNumberArray: [1, 2, 3],
    fieldBooleanArray: [false, true],
    fieldUndefined: undefined,
    fieldObject: {
      fieldString: 'test',
      fieldNumber: 13,
      fieldBoolean: true,
      fieldStringArray: ['value1', 'value2'],
      fieldNumberArray: [1, 2, 3],
      fieldBooleanArray: [false, true],
      fieldUndefined: undefined,
      fieldObject: {
        fieldString: 'test',
        fieldNumber: 13,
        fieldBoolean: true,
        fieldStringArray: ['value1', 'value2'],
        fieldNumberArray: [1, 2, 3],
        fieldBooleanArray: [false, true],
        fieldUndefined: undefined,
      },
    },
  };

  const transformValue = (value: any) => {
    if (typeof value == 'string') return capitalize(value);
    if (typeof value == 'number') return -value;
    if (typeof value == 'boolean') return !value;
    if (Array.isArray(value))
      return value.map(aValue => transformValue(aValue));
  };

  const transformAction = (
    object: ObjectWithKey,
    key: string,
    keyWithPrefix: string,
    value: any
  ) => {
    lodashSet(object, keyWithPrefix, transformValue(value));
  };

  const transformedObject = {
    fieldString: 'Test',
    fieldNumber: -13,
    fieldBoolean: false,
    fieldStringArray: ['Value1', 'Value2'],
    fieldNumberArray: [-1, -2, -3],
    fieldBooleanArray: [true, false],
    fieldUndefined: undefined,
    fieldObject: {
      fieldString: 'Test',
      fieldNumber: -13,
      fieldBoolean: false,
      fieldStringArray: ['Value1', 'Value2'],
      fieldNumberArray: [-1, -2, -3],
      fieldBooleanArray: [true, false],
      fieldUndefined: undefined,
      fieldObject: {
        fieldString: 'Test',
        fieldNumber: -13,
        fieldBoolean: false,
        fieldStringArray: ['Value1', 'Value2'],
        fieldNumberArray: [-1, -2, -3],
        fieldBooleanArray: [true, false],
        fieldUndefined: undefined,
      },
    },
  };

  it('runs correctly', () => {
    parseObject(testObject, transformAction);
    expect(testObject).toEqual(transformedObject);
  });
});

describe('form-schema', () => {
  const enumSchema: Field[] = [
    {
      kind: 'ENUM',
      name: 'Topic',
      description: null,
      fields: null,
      inputFields: null,
      interfaces: null,
      enumValues: [
        {
          name: 'TECH',
          description: null,
          isDeprecated: false,
          deprecationReason: null,
        },
        {
          name: 'VIDEOGAMES',
          description: null,
          isDeprecated: false,
          deprecationReason: null,
        },
        {
          name: 'LIFESTYLE',
          description: null,
          isDeprecated: false,
          deprecationReason: null,
        },
        {
          name: 'MOVIES',
          description: null,
          isDeprecated: false,
          deprecationReason: null,
        },
        {
          name: 'TV_SHOWS',
          description: null,
          isDeprecated: false,
          deprecationReason: null,
        },
        {
          name: 'OPINION',
          description: null,
          isDeprecated: false,
          deprecationReason: null,
        },
        {
          name: 'WHAT_THE_FUCK?',
          description: null,
          isDeprecated: false,
          deprecationReason: null,
        },
      ],
      possibleTypes: null,
    },
  ];

  it('method getEnumValues runs correctly', () => {
    const enumValues: Option[] = [
      { label: 'Tech', value: 'TECH' },
      { label: 'Videogames', value: 'VIDEOGAMES' },
      { label: 'Lifestyle', value: 'LIFESTYLE' },
      { label: 'Movies', value: 'MOVIES' },
      { label: 'Tv shows', value: 'TV_SHOWS' },
      { label: 'Opinion', value: 'OPINION' },
      { label: 'What the fuck?', value: 'WHAT_THE_FUCK?' },
    ];
    expect(getEnumValues('Topic', enumSchema)).toEqual(enumValues);
  });

  it('method getEnumValues throws an error inexistant Enum', () => {
    expect(() => getEnumValues('xxx', enumSchema)).toThrowError(
      `Unable to find enum xxx`
    );
  });

  it('method getEnumValues applies LabelMap correctly', () => {
    const labelMap = new Map<string, string>([
      ['TECH', 'Technologie'],
      ['VIDEOGAMES', 'Jeu vidéo'],
      ['LIFESTYLE', 'Life-style'],
      ['MOVIES', 'Film'],
      ['TV_SHOWS', 'Série télé'],
      ['OPINION', 'Opinion'],
      ['WHAT_THE_FUCK?', 'Nimp'],
    ]);
    const enumValues: Option[] = [
      { label: 'Technologie', value: 'TECH' },
      { label: 'Jeu vidéo', value: 'VIDEOGAMES' },
      { label: 'Life-style', value: 'LIFESTYLE' },
      { label: 'Film', value: 'MOVIES' },
      { label: 'Série télé', value: 'TV_SHOWS' },
      { label: 'Opinion', value: 'OPINION' },
      { label: 'Nimp', value: 'WHAT_THE_FUCK?' },
    ];
    expect(getEnumValues('Topic', enumSchema, labelMap)).toEqual(enumValues);
  });
});
