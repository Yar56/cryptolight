import { User } from '@firebase/auth';
import { useStore } from 'effector-react';
import React, { createContext, useEffect } from 'react';

import { coinGeckoApi } from '~/shared/api';

import { userModel } from '~/entities/user';

// eslint-disable-next-line react/display-name
interface AuthContextState {
    user?: User;
}

export const AuthContext = createContext<AuthContextState>({});

// eslint-disable-next-line react/display-name
export const withAuthContextProvider = (component: () => React.ReactNode) => () => {
    const user = useStore(userModel.$user);

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

    return <AuthContext.Provider value={user}>{component()}</AuthContext.Provider>;
};

// export const useAuthContext = () => useContext(AuthContext);
//
// export const useIsDynamicReport = () => {
//     const { reportConfig } = useReportConfigContext();
//
//     return useMemo(() => reportConfig?.isDynamic, [reportConfig?.isDynamic]);
// };
