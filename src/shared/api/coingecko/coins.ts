import { AxiosPromise, AxiosResponse } from 'axios';

import { coinGeckoRequester } from './base';
import { Coin, CoinMarketChart, TrendingCoin } from './models';

interface GetTrendingCoinListResponse {
    coins: TrendingCoin[];
    exchanges: [];
}

export const getTrendingCoinList = (): AxiosPromise<GetTrendingCoinListResponse> => {
    return coinGeckoRequester.get('/search/trending');
};

export const getCoinListByGlobalTrends = (): AxiosPromise<Array<Coin>> => {
    return coinGeckoRequester.get('/coins/?id=bitcoin');
};

export interface GetCoinByIdParams {
    coinId?: string;
}
export interface GetCoinChartByIdParams extends GetCoinByIdParams {
    vsCurrency?: string;
    days?: string;
}
export const getCoinById = ({ coinId }: GetCoinByIdParams): Promise<AxiosResponse<Coin>> => {
    if (!coinId) {
        return Promise.reject(new Error('empty coinId'));
    }
    return coinGeckoRequester.get(`/coins/${coinId}/`);
};

export const getCoinMarketChartById = ({
    coinId,
    vsCurrency = 'usd',
    days = '1'
}: GetCoinChartByIdParams): Promise<AxiosResponse<CoinMarketChart>> => {
    if (!coinId) {
        return Promise.reject(new Error('coinId is empty'));
    }

    return coinGeckoRequester.get(`/coins/${coinId}/market_chart`, {
        params: {
            ['vs_currency']: vsCurrency,
            days
        }
    });
};
