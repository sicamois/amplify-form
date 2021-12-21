import { ObjectWithKey } from '../src/types';
import lodashSet from 'lodash/set';
import capitalize from 'lodash/capitalize';
import { parseObject } from '../src/utils/parse-object';

describe('parse-object', () => {
  it('runs correctly', () => {
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

    parseObject(testObject, transformAction);
    expect(testObject).toEqual(transformedObject);
  });
});
