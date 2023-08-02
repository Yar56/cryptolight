import { camelCase, forEach, isArray, isObject, map, isNull } from 'lodash';

export function keysToCamelCase(object: object | object[]): unknown {
    if (isArray(object)) {
        return map(object, (item) => keysToCamelCase(item));
    } else if (isObject(object) && !isNull(object)) {
        const camelCaseObj: { [key: string]: unknown } = {};

        forEach(object, (value, key) => {
            const camelCaseKey = camelCase(key);
            camelCaseObj[camelCaseKey] = keysToCamelCase(value);
        });

        return camelCaseObj;
    }

    return object;
}
