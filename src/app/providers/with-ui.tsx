import { NextUIProvider } from '@nextui-org/react';
import React from "react";

export const withUi = (component: () => React.ReactNode) => () => {
  return <NextUIProvider>{component()}</NextUIProvider>
}
