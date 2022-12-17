import { User } from '@firebase/auth';
import { createEvent, createStore } from 'effector';
import { useStore, useStoreMap } from 'effector-react';

//todo зарезолвить импорты
import { authModel } from '~/features/auth/by-email/';
import { registrationModel } from '~/features/registration/by-email/';
import { signUpUserFx } from '~/features/registration/by-email/model';

type UserState = {
    user?: User;
};

const initialUserState: UserState = {};

const updateUserData = createEvent<User | undefined>();

export const $user = createStore<UserState>(initialUserState)
    .on([authModel.signInUserFx.doneData, registrationModel.signUpUserFx.doneData], (state, { user }) => {
        return { ...state, user };
    })
    .on(updateUserData, (state, payload) => {
        return { ...state, user: payload };
    });

export const $userLoading = authModel.signInUserFx.pending || signUpUserFx.pending;

export const events = { updateUserData };

export const useIsUserAuth = (): boolean =>
    useStoreMap({ store: $user, keys: [], fn: (state: UserState) => Boolean(state.user) });
export const useUser = (): UserState => useStore($user);

export const selectors = { useIsUserAuth, useUser };
