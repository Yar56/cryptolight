import { createStore, createEffect } from 'effector';
import { coinGeckoApi } from 'shared/api';

interface SignUpUserFxParams {
    email: string;
    password: string;
}
export const signUpUserFx = createEffect(({ email, password }: SignUpUserFxParams) => {
    // Здесь также может быть доп. обработка эффекта
    return coinGeckoApi.user.signUpUser({ email, password });
});

type State = any;

export const registrationInitialState: State = [];

export const $coins = createStore<State>(registrationInitialState).on(signUpUserFx.doneData, (state, payload) => {
    console.log(payload);
    // return [...state, ...payload.data.coins];
});
