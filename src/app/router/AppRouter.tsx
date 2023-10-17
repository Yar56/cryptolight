import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { routesConfig } from '~/shared/config';
import { SuspenseLayout } from '~/shared/ui/layouts';

import { coinPageUi } from '~/pages/coinPage';
import { notFoundPageUi } from '~/pages/notFoundPage';
import { profilePageUi } from '~/pages/profilePage';
import { trendingCoinsPageUi } from '~/pages/trendingCoinsPage';

const { TrendingCoinsPage } = trendingCoinsPageUi;
const { CoinPage } = coinPageUi;
const { ProfilePage } = profilePageUi;
const { NotFoundPage } = notFoundPageUi;

const { TRENDING_COIN_PAGE, PROFILE_PAGE, COIN_PAGE } = routesConfig.RouteName;

const routes: routesConfig.RouteDescription[] = [
    {
        path: TRENDING_COIN_PAGE,
        component: TrendingCoinsPage
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

export const AppRouter = () => {
    return (
        <SuspenseLayout>
            <Routes>
                {routesContent}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </SuspenseLayout>
    );
};
