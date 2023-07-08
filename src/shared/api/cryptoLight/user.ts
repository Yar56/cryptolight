import { AxiosPromise, AxiosResponse } from 'axios';

import { cryptoLightRequester } from '~/shared/api/cryptoLight/base';
import { AuthStateChangesResponse, User } from '~/shared/api/cryptoLight/models';

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
    onCheck(user: User | null): void;
}

export const checkAuthUser = ({ idToken, onCheck }: CheckAuthUserParams) => {
    if (!idToken) {
        console.log(`idToken=${idToken}, skip checkAuthUser`);
        return Promise.resolve();
    }
    return cryptoLightRequester
        .post('/authStateChanged', { idToken })
        .then((response: AxiosResponse<AuthStateChangesResponse>) => {
            console.log(response.data);
            onCheck(response.data.users[0]);
        });
};
