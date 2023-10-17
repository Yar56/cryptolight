import axios from 'axios';

import { sharedConfigEnvs } from '~/shared/config';
const { CRYPTO_LIGHT_HOST } = sharedConfigEnvs;

export const cryptoLightRequester = axios.create({
    baseURL: CRYPTO_LIGHT_HOST
});
