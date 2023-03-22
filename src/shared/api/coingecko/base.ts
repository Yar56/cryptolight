import axios from 'axios';

import { API_HOST } from '~/shared/config';

import keysToCamelCase from '../../lib/keysToCamelCase';

export const apiInstance = axios.create({
    baseURL: API_HOST
});

apiInstance.interceptors.response.use((response) => keysToCamelCase(response));
