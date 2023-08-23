import axios from 'axios';

import { envs } from '~/shared/config';

export const cryptoLightRequester = axios.create({
    baseURL: envs.CRYPTO_LIGHT_HOST
});
