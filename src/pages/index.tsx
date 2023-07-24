import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { SuspenseLayout } from '~/widgets/layouts/SuspenseLayout';

import { RouteDescription, RouteName } from '~/pages/models';

import MainPage from './trendingCoinsPage';

const CoinPage = lazy(() => import('./coinPage'));
const ProfilePage = lazy(() => import('./profilePage'));
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
        <SuspenseLayout>
            <Routes>
                {routesContent}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </SuspenseLayout>
    );
};
