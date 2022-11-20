import { apiInstance } from './base';
import { AxiosPromise } from 'axios';
import { Coin, TrendingCoin } from './models';

// const BASE_URL = "/search";

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

// export type GetTaskByIdParams = {
// 	taskId: number;
// 	[x: string]: any;
// };
//
// export const getTaskById = ({ taskId, ...params }: GetTaskByIdParams): AxiosPromise<Task> => {
// 	return apiInstance.get(`${BASE_URL}/${taskId}`, { params });
// };
