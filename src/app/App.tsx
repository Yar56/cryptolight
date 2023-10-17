import React from 'react';

import './styles/index.scss';
import { AppRouter } from '~/app/router/AppRouter';

import { withProviders } from './providers';

const App = () => {
    return <AppRouter />;
};

export default withProviders(App);
