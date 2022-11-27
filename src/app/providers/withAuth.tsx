import React from 'react';
// eslint-disable-next-line react/display-name
export const withAuth = (component: () => React.ReactNode) => () => {
    return <div>{component()}</div>;
};
