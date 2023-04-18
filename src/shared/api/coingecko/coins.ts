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
interface GetCoinChartByIdParams extends GetCoinByIdParams {
    vsCurrency?: string;
    days?: string;
}
export const getCoinById = ({ coinId }: GetCoinByIdParams) => {
    if (!coinId) {
        return Promise.reject(new Error('empty coinId'));
    }
    return apiInstance.get(`/coins/${coinId}/`);
};

export const getCoinMarketChartById = ({ coinId, vsCurrency = 'usd', days = '1' }: GetCoinChartByIdParams) => {
    if (!coinId) {
        return Promise.reject(new Error('empty coinId'));
    }

    return apiInstance.get(`/coins/${coinId}/market_chart`, {
        params: {
            ['vs_currency']: vsCurrency,
            days
        }
    });
};
