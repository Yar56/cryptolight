import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { RouteDescription, RouteName } from '~/pages/models';

import CoinPage from './coinPage';
import ProfilePage from './profilePage';
import MainPage from './trendingCoinsPage';
const NotFoundPage = lazy(() => import('./notFoundPage'));

const routes: RouteDescription[] = [
    {
        path: RouteName.TRENDING_COIN_PAGE,
        component: MainPage
    },
    {
        path: RouteName.COIN_PAGE,
        component: CoinPage
    },
    {
        path: RouteName.PROFILE_PAGE,
        component: ProfilePage
    }
];

const routesContent = routes.map(({ path, component: Component }) => (
    <Route key={path} path={path} element={<Component />} />
));

export const Routing = () => {
    return (
        <Routes>
            {routesContent}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};
