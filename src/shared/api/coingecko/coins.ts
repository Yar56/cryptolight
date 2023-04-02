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

interface GetCoinByIdParams {
    coinId?: string;
}
export const getCoinById = ({ coinId }: GetCoinByIdParams) => {
    if (!coinId) {
        return Promise.resolve();
    }
    return apiInstance.get(`/coins/${coinId}/`);
};
