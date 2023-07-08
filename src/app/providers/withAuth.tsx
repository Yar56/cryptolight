import React, { useEffect, useState } from 'react';

import { cryptoLightApi } from '~/shared/api';
import { User } from '~/shared/api/cryptoLight/models';
import { loadState } from '~/shared/lib/localStorage';
import PageLoader from '~/shared/ui/components/pageLoader/PageLoader';

import { userModel } from '~/entities/user';

// eslint-disable-next-line react/display-name
export const withAuth = (component: () => React.ReactNode) => () => {
    const { user } = userModel.selectors.useUser();

    const [idToken, setIdToken] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        let timeoutId;
        setIsLoading(true);
        if (!user) {
            // eslint-disable-next-line prefer-const
            timeoutId = setTimeout(() => {
                const user = loadState();
                if (user) {
                    console.log('idToken is exists');
                    setIdToken(user.idToken);
                } else {
                    console.log('idToken is empty');
                }

                setIsLoading(false);
            }, 1000);
        } else {
            setIdToken(user.idToken);
        }

        return () => clearTimeout(timeoutId);
    }, []);

    const handleOnCheck = (user: User | null) => {
        if (user) {
            userModel.events.updateUserData(user);
            console.log('User is signed in');
        } else {
            userModel.events.updateUserData(undefined);
            console.log('User is signed out');
        }
    };

    useEffect(() => {
        cryptoLightApi.user.checkAuthUser({ idToken, onCheck: handleOnCheck });
    }, [idToken]);

    if (isLoading) {
        return <PageLoader />;
    }
    return component();
};
