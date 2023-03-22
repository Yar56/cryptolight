import React from 'react';

import { Routing } from '~/pages';

import './styles/index.scss';
import { withProviders } from './providers';

const App = () => {
    return <Routing />;
};

// todo добавить проверку на состояние api (/ping)
export default withProviders(App);
