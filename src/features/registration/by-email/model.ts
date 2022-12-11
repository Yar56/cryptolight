import { createEffect } from 'effector';
import { coinGeckoApi } from '~/shared/api';

interface SignUpUserFxParams {
    email: string;
    password: string;
}

export const signUpUserFx = createEffect(async ({ email, password }: SignUpUserFxParams) => {
    return await coinGeckoApi.user.signUpUser({ email, password });
});
