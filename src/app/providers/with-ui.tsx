import { NextUIProvider } from '@nextui-org/react';
import React from 'react';

// eslint-disable-next-line react/display-name
export const withUi = (component: () => React.ReactNode) => () => {
    return <NextUIProvider>{component()}</NextUIProvider>;
};
