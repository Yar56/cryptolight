/**
 * Модуль инициализации env-переменных
 * @remark Если не найдено значение хоть одной переменной,
 * Приложение сразу выбросит ошибку, при инициализации модуля
 * @module
 */

/**
 * Получение env-переменной
 * @throwable
 */
const getEnvVar = (key: string) => {
    if (import.meta.env[key] === undefined) {
        throw new Error(`Env variable ${key} is required`);
    }
    return import.meta.env[key] || '';
};

// region хосты
export const COIN_API_HOST = getEnvVar('VITE_REACT_APP_COIN_API_HOST');
export const CRYPTO_LIGHT_HOST = getEnvVar('VITE_REACT_APP_CRYPTO_LIGHT_API_HOST');
// endregion

// export const NODE_ENV = getEnvVar('NODE_ENV');
// /** Режим разработки */
// export const isDevEnv = NODE_ENV === 'development';
// /** Режим продакшена */
// export const isProdEnv = NODE_ENV === 'production';
