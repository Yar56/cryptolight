import { User } from '@firebase/auth';
import React, { useEffect } from 'react';

import { coinGeckoApi } from '~/shared/api';

import { userModel } from '~/entities/user';

// eslint-disable-next-line react/display-name
export const withAuth = (component: () => React.ReactNode) => () => {
    const handleOnCheck = (user: User | null) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            userModel.events.updateUserData(user);
            console.log('User is signed in');
            // ...
        } else {
            userModel.events.updateUserData(undefined);
            console.log('User is signed out');
            // User is signed out
            // ...
        }
    };
    useEffect(() => {
        coinGeckoApi.user.checkAuthUser({ onCheck: handleOnCheck });
    }, []);

    return component();
};
