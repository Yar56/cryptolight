import axios from 'axios';

import { API_HOST } from '~/shared/config';

import keysToCamelCase from '../../lib/keysToCamelCase';

export const apiInstance = axios.create({
    baseURL: API_HOST
});

const EXCLUDED_URLS = ['/coins/bitcoin/market_chart?vs_currency'];

apiInstance.interceptors.response.use((response) => {
    if (response?.config?.url && EXCLUDED_URLS.includes(response.config.url)) {
        return response;
    }

    return keysToCamelCase(response);
});

// apiInstance.interceptors.request.use((request) => {
//     const params = get(request, 'params', {});
//     const data = get(request, 'data', {});
//
//     return {
//         ...request,
//         params: keysToSnakeCase(params),
//         data: data instanceof FormData ? data : keysToSnakeCase(data)
//     };
// });
