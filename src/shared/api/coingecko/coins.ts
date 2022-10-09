import { apiInstance } from './base';
import { AxiosPromise } from 'axios';
import { Coin } from './models';

// const BASE_URL = "/search";

export type GetTrendingListParams = {
    id?: string;
};

export const getTrendingCoinsList = (params?: GetTrendingListParams): AxiosPromise<Coin[]> => {
    return apiInstance.get('/search/trending', { params });
};

// export type GetTaskByIdParams = {
// 	taskId: number;
// 	[x: string]: any;
// };
//
// export const getTaskById = ({ taskId, ...params }: GetTaskByIdParams): AxiosPromise<Task> => {
// 	return apiInstance.get(`${BASE_URL}/${taskId}`, { params });
// };
