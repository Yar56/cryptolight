import { AxiosPromise } from 'axios';

import { cryptoLightApi } from '~/shared/api';

export interface GetFavoritedCoinsParams {
    userId: string;
}
export const getFavoritedCoins = ({
    userId
}: GetFavoritedCoinsParams): AxiosPromise<cryptoLightApi.models.FavoritedCoinsMapResponse> => {
    return cryptoLightApi.base.cryptoLightRequester.get('/favoritedCoinsMap', { params: { userId } });
};

export const setFavoritedCoins = (
    data: cryptoLightApi.models.FavoritedCoinsMap
): AxiosPromise<cryptoLightApi.models.User> => {
    return cryptoLightApi.base.cryptoLightRequester.post('/setFavoritedCoinsMap', data);
};
