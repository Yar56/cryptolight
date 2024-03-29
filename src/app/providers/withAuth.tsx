import React, { useEffect, useState } from 'react';

import { cryptoLightApi } from '~/shared/api';
import { sharedUiComponents } from '~/shared/ui';

const { PageLoader } = sharedUiComponents;
import { userModel, userLib } from '~/entities/user';

// eslint-disable-next-line react/display-name
export const withAuth = (component: () => React.ReactNode) => () => {
    const { user } = userModel.selectors.useUser();

    const [userFormLs, setUserFormLs] = useState<cryptoLightApi.models.User | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        let timeoutId;
        setIsLoading(true);
        if (!user) {
            // eslint-disable-next-line prefer-const
            timeoutId = setTimeout(() => {
                const user = userLib.loadState();
                if (user) {
                    console.log('user from storage is exists');
                    setUserFormLs(user);
                } else {
                    console.log('user from storage is empty');
                }

                setIsLoading(false);
            }, 1000);
        } else {
            setUserFormLs(user);
        }

        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        cryptoLightApi.user.checkAuthUser({ idToken: userFormLs?.idToken }).then((response) => {
            if (response && userFormLs) {
                userModel.events.updateUserData(userFormLs);
                console.log('User is signed in, load user from local storage');
            } else {
                userModel.events.updateUserData(undefined);
                console.log('User is signed out');
            }
        });
    }, [userFormLs?.idToken]);

    if (isLoading) {
        return <PageLoader />;
    }
    return component();
};
