import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const MainPage = lazy(() => import('./trendingCoinsPage'));
const CoinPage = lazy(() => import('./coinPage'));
const ProfilePage = lazy(() => import('./profilePage'));

export const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/coin" element={<CoinPage />} />
            <Route path="/profile" element={<ProfilePage />} />
        </Routes>
    );
};
