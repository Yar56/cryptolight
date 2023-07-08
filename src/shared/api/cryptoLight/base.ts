import axios from 'axios';

import { CRYPTO_LIGHT_HOST } from '~/shared/config';

export const cryptoLightRequester = axios.create({
    baseURL: CRYPTO_LIGHT_HOST
});
