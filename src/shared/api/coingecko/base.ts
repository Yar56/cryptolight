import axios from 'axios';
import keysToCamelCase from '../../lib/keysToCamelCase';
// import { API_URL } from 'shared/config';

// Потенциально, можно передавать accessToken
export const apiInstance = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/'
});

apiInstance.interceptors.response.use((response) => keysToCamelCase(response));
