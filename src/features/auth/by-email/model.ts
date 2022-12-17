import { createEffect } from 'effector';

import { coinGeckoApi } from '~/shared/api';

interface SignInUserFxParams {
    email: string;
    password: string;
}

export const signInUserFx = createEffect(async ({ email, password }: SignInUserFxParams) => {
    return await coinGeckoApi.user.signInUser({ email, password });
});
