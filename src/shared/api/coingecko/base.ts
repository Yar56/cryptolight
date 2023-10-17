import axios from 'axios';

import { sharedConfigEnvs } from '~/shared/config';
const { COIN_API_HOST } = sharedConfigEnvs;
import { casesLib } from '~/shared/lib';

const { keysToCamelCase } = casesLib;

export const coinGeckoRequester = axios.create({
    baseURL: COIN_API_HOST
});

const EXCLUDED_URLS = ['/coins/bitcoin/market_chart?vs_currency'];

coinGeckoRequester.interceptors.response.use((response) => {
    if (response?.config?.url && EXCLUDED_URLS.includes(response.config.url)) {
        return response;
    }

    return keysToCamelCase(response);
});
