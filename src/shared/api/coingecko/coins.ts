import { AxiosPromise } from 'axios';

import { apiInstance } from './base';
import { Coin, TrendingCoin } from './models';

interface GetTrendingCoinsListResponse {
    coins: TrendingCoin[];
    exchanges: [];
}

export const getTrendingCoinsList = (): AxiosPromise<GetTrendingCoinsListResponse> => {
    return apiInstance.get('/search/trending');
};

export const getAnotherTrendingCoinsList = (): AxiosPromise<Array<Coin>> => {
    return apiInstance.get('/coins/?id=bitcoin');
};

export const getCoinById = () => {
    return apiInstance.get('/coins/bitcoin/market_chart?vs_currency=usd&days=30');
};
