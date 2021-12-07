import { ObjectWithKey } from "./types"

export const parseObject = (object: ObjectWithKey, action: (object: ObjectWithKey, key: string, keyWithPrefix: string, value: any) => any, prefix? : string, initialObject?: ObjectWithKey) => {
    const passedObject = initialObject ? initialObject : object
    Object.keys(object).forEach(key => {
        const value = object[key]
        const keyWithPrefix = (prefix ? `${prefix}.` : '') + key
        if (value && typeof value === 'object' && !Array.isArray(value)) parseObject(value as ObjectWithKey, action, key, passedObject)
        else action(passedObject, key, keyWithPrefix, value)
    })
}