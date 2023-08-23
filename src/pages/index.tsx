import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { routesConfig } from '~/shared/config';

import { SuspenseLayout } from '~/widgets/layouts/SuspenseLayout';

import MainPage from './trendingCoinsPage';

const CoinPage = lazy(() => import('./coinPage'));
const ProfilePage = lazy(() => import('./profilePage'));
const NotFoundPage = lazy(() => import('./notFoundPage'));

const { TRENDING_COIN_PAGE, PROFILE_PAGE, COIN_PAGE } = routesConfig.RouteName;

const routes: routesConfig.RouteDescription[] = [
    {
        path: TRENDING_COIN_PAGE,
        component: MainPage
    },
    {
        path: COIN_PAGE,
        component: CoinPage
    },
    {
        path: PROFILE_PAGE,
        component: ProfilePage
    }
];

const routesContent = routes.map(({ path, component: Component }) => (
    <Route key={path} path={path} element={<Component />} />
));

export const Routing = () => {
    return (
        <SuspenseLayout>
            <Routes>
                {routesContent}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </SuspenseLayout>
    );
};
