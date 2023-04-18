import { cloneDeep, isArray, isPlainObject, isString, map, mapKeys, mapValues, snakeCase } from 'lodash';

// todo сделать универсальную функцию, которая принимала бы в качестве аргумента caseConverter (snakeCase/camelCase из lodash)
export default function keysToSnakeCase(object: object | object[]): object {
    let snakeCaseObject = cloneDeep(object);

    if (isArray(snakeCaseObject)) {
        return map(snakeCaseObject, keysToSnakeCase);
    } else if (isString(snakeCaseObject)) {
        return snakeCaseObject;
    } else {
        snakeCaseObject = mapKeys(snakeCaseObject, (value, key) => {
            return snakeCase(key);
        });

        return mapValues(snakeCaseObject, (value) => {
            if (isPlainObject(value)) {
                return keysToSnakeCase(value);
            } else if (isArray(value)) {
                return map(value, keysToSnakeCase);
            } else {
                return value;
            }
        });
    }
}
