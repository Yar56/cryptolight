import { coinGeckoApi } from '~/shared/api';
import { createEffect } from 'effector';

interface SignInUserFxParams {
    email: string;
    password: string;
}

export const signInUserFx = createEffect(async ({ email, password }: SignInUserFxParams) => {
    return await coinGeckoApi.user.signInUser({ email, password });
});
