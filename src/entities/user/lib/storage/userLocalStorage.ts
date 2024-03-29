import ls from 'localstorage-slim';

import { cryptoLightApi } from '~/shared/api';

const LOCAL_STORAGE_KEY = 'firebaseProxyData';
export let isSavedStateExist = false;

export const loadState = () => {
    try {
        const state: cryptoLightApi.models.User | null = ls.get(LOCAL_STORAGE_KEY, { decrypt: true });

        if (state === null) {
            return undefined;
        }
        isSavedStateExist = true;
        return state;
    } catch (error) {
        console.warn('loadState failed');
        return undefined;
    }
};

export const saveState = (user: cryptoLightApi.models.User) => {
    try {
        ls.set(LOCAL_STORAGE_KEY, user, { ttl: Number(user.expiresIn), encrypt: true });
    } catch {
        console.warn('saveState failed');
    }
};

export const clearState = () => {
    try {
        ls.remove(LOCAL_STORAGE_KEY);
    } catch (e) {
        console.warn('clearState failed');
    }
};
