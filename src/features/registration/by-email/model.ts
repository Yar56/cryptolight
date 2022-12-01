import { createStore, createEffect } from 'effector';
import { coinGeckoApi } from 'shared/api';
import { UserCredential } from 'firebase/auth';

interface SignUpUserFxParams {
    email: string;
    password: string;
}

export const signUpUserFx = createEffect(async ({ email, password }: SignUpUserFxParams) => {
    return await coinGeckoApi.user.signUpUser({ email, password });
});

type State = UserCredential | Record<string, unknown>;

export const $user = createStore<State>({}).on(signUpUserFx.doneData, (state, payload) => {
    console.log(payload);
    return payload;
});
