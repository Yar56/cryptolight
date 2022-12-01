import React from 'react';
import { useStore } from 'effector-react';
import { registrationModel } from '../../features/registration/by-email';

// eslint-disable-next-line react/display-name
export const withAuth = (component: () => React.ReactNode) => () => {
    const user = useStore(registrationModel.$user);
    console.log(user);
    return <div>{component()}</div>;
};
