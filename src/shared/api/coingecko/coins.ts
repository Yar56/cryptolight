import { apiInstance } from './base';
import { AxiosPromise } from 'axios';
import { Coin } from './models';

// const BASE_URL = "/search";

interface GetTrendingCoinsListResponse {
    coins: Coin[];
    exchanges: [];
}

export const getTrendingCoinsList = (): AxiosPromise<GetTrendingCoinsListResponse> => {
    return apiInstance.get('/search/trending');
};

// export type GetTaskByIdParams = {
// 	taskId: number;
// 	[x: string]: any;
// };
//
// export const getTaskById = ({ taskId, ...params }: GetTaskByIdParams): AxiosPromise<Task> => {
// 	return apiInstance.get(`${BASE_URL}/${taskId}`, { params });
// };
