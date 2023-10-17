import { ComponentType, PropsWithChildren } from 'react';

export enum RouteName {
    TRENDING_COIN_PAGE = '/',
    COIN_PAGE = '/coin/:coinId',
    PROFILE_PAGE = '/profile'
}

export interface RouteDescription {
    path: RouteName;
    component: ComponentType;
    layout?: ComponentType<PropsWithChildren>;
}
