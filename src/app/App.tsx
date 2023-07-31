import React from 'react';

import { Routing } from '~/pages';

import './styles/index.scss';
import { withProviders } from './providers';

const App = () => {
    return <Routing />;
};

export default withProviders(App);
