import { createEffect, createEvent, createStore } from 'effector';
import { useStore, useStoreMap } from 'effector-react';

import { cryptoLightApi } from '~/shared/api';
import { User } from '~/shared/api/cryptoLight/models';
import { saveState } from '~/shared/lib/localStorage';

interface AuthUserFxParams {
    email: string;
    password: string;
}

export const signInUserFx = createEffect(
    async ({ email, password }: AuthUserFxParams) => await cryptoLightApi.user.signInUser({ email, password })
);

export const signUpUserFx = createEffect(
    async ({ email, password }: AuthUserFxParams) => await cryptoLightApi.user.signUpUser({ email, password })
);

type UserState = {
    user?: User;
};

const initialUserState: UserState = {};

const updateUserData = createEvent<User | undefined>();

export const $user = createStore<UserState>(initialUserState)
    .on([signInUserFx.doneData, signUpUserFx.doneData], (_, { data }) => ({ user: data }))
    .on(updateUserData, (state, payload) => ({ user: payload }));

export const $userLoading = signInUserFx.pending || signUpUserFx.pending;

export const events = { updateUserData };

export const useIsUserAuth = (): boolean =>
    useStoreMap({ store: $user, keys: [], fn: (state: UserState) => Boolean(state.user) });
export const useUser = (): UserState => useStore($user);

export const selectors = { useIsUserAuth, useUser };

$user.watch((state) => console.debug(state));
$user.watch((state) => {
    if (state.user) {
        saveState(state.user);
    }
});
