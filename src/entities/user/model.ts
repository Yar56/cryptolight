import { User } from '@firebase/auth';
import { createEffect, createEvent, createStore } from 'effector';
import { useStore, useStoreMap } from 'effector-react';

import { coinGeckoApi } from '~/shared/api';

interface AuthUserFxParams {
    email: string;
    password: string;
}

export const signInUserFx = createEffect(
    async ({ email, password }: AuthUserFxParams) => await coinGeckoApi.user.signInUser({ email, password })
);

export const signUpUserFx = createEffect(
    async ({ email, password }: AuthUserFxParams) => await coinGeckoApi.user.signUpUser({ email, password })
);

type UserState = {
    user?: User;
};

const initialUserState: UserState = {};

const updateUserData = createEvent<User | undefined>();

export const $user = createStore<UserState>(initialUserState)
    .on([signInUserFx.doneData, signUpUserFx.doneData], (state, { user }) => {
        return { ...state, user };
    })
    .on(updateUserData, (state, payload) => {
        return { ...state, user: payload };
    });

export const $userLoading = signInUserFx.pending || signUpUserFx.pending;

export const events = { updateUserData };

export const useIsUserAuth = (): boolean =>
    useStoreMap({ store: $user, keys: [], fn: (state: UserState) => Boolean(state.user) });
export const useUser = (): UserState => useStore($user);

export const selectors = { useIsUserAuth, useUser };

$user.watch((state) => console.debug(state));
