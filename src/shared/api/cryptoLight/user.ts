import { AxiosPromise } from 'axios';

import { cryptoLightRequester } from '~/shared/api/cryptoLight/base';
import { User } from '~/shared/api/cryptoLight/models';

export interface SignUpUserParams {
    email: string;
    password: string;
}

export const signUpUser = ({ email, password }: SignUpUserParams): AxiosPromise<User> => {
    return cryptoLightRequester.post('/signUp', { email, password });
};

export const signInUser = ({ email, password }: SignUpUserParams): AxiosPromise<User> => {
    return cryptoLightRequester.post('/signInWithPassword', { email, password });
};

interface SignOutUserParams {
    uid?: string;
}
export const signOutUser = ({ uid }: SignOutUserParams) => {
    if (!uid) {
        console.log('user.uid is undefined, skip signOutUser');
        return Promise.resolve();
    }
    return cryptoLightRequester.post('/signOut', { uid });
};

export interface CheckAuthUserParams {
    idToken?: string;
}

export const checkAuthUser = ({ idToken }: CheckAuthUserParams) => {
    if (!idToken) {
        console.log(`idToken=${idToken}, skip checkAuthUser`);
        return Promise.resolve();
    }
    return cryptoLightRequester.post('/authStateChanged', { idToken });
};
