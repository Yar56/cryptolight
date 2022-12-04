// import { createStore, createEffect } from 'effector';
import { coinGeckoApi } from 'shared/api';
import { createEffect, createStore } from 'effector';
import { UserCredential } from 'firebase/auth';

interface SignInUserFxParams {
    email: string;
    password: string;
}

export const signInUserFx = createEffect(async ({ email, password }: SignInUserFxParams) => {
    return await coinGeckoApi.user.signInUser({ email, password });
});

type State = UserCredential | Record<string, unknown>;

export const $user = createStore<State>({}).on(signInUserFx.doneData, (state, payload) => {
    return payload;
});
