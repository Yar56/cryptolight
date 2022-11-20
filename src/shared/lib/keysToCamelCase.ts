import { cloneDeep, isArray, mapKeys, map, camelCase, mapValues, isPlainObject, isString } from 'lodash';

// из альтернатив ещё есть https://github.com/DenysIvko/camelize2
export default function keysToCamelCase(object: object | object[]): unknown {
    let camelCaseObject = cloneDeep(object);

    if (isArray(camelCaseObject)) {
        return map(camelCaseObject, keysToCamelCase);
    } else if (isString(camelCaseObject)) {
        return camelCaseObject;
    } else {
        camelCaseObject = mapKeys(camelCaseObject, (value, key) => {
            return camelCase(key);
        });

        return mapValues(camelCaseObject, (value) => {
            if (isPlainObject(value)) {
                return keysToCamelCase(value);
            } else if (isArray(value)) {
                return map(value, keysToCamelCase);
            } else {
                return value;
            }
        });
    }
}
