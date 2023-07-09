import { AxiosPromise } from 'axios';

import { cryptoLightRequester } from '~/shared/api/cryptoLight/base';
import { FavoritedCoinsMap, User } from '~/shared/api/cryptoLight/models';

export const getFavoritedCoins = (): AxiosPromise<FavoritedCoinsMap> => {
    return cryptoLightRequester.get('/favoritedCoinsMap');
};

export const setFavoritedCoins = (data: FavoritedCoinsMap): AxiosPromise<User> => {
    return cryptoLightRequester.post('/favoritedCoinsMap', data);
};
