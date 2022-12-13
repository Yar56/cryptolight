import axios from 'axios';
import keysToCamelCase from '../../lib/keysToCamelCase';
import { API_HOST } from '~/shared/config';

// Потенциально, можно передавать accessToken
export const apiInstance = axios.create({
    baseURL: API_HOST
});

apiInstance.interceptors.response.use((response) => keysToCamelCase(response));
