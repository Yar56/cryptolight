const getEnvVar = (key: string) => {
    if (import.meta.env[key] === undefined) {
        throw new Error(`Env variable ${key} is required`);
    }
    return import.meta.env[key] || '';
};

// region hosts
export const COIN_API_HOST = getEnvVar('VITE_COIN_API_HOST');
export const CRYPTO_LIGHT_HOST = getEnvVar('VITE_CRYPTO_LIGHT_API_HOST');
// endregion

// export const NODE_ENV = getEnvVar('NODE_ENV');
// export const isDevEnv = NODE_ENV === 'development';
// export const isProdEnv = NODE_ENV === 'production';
