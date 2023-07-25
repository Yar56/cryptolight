import { AxiosPromise } from 'axios';

import { cryptoLightRequester } from '~/shared/api/cryptoLight/base';
import { FavoritedCoinsMap, FavoritedCoinsMapResponse, User } from '~/shared/api/cryptoLight/models';

export interface GetFavoritedCoinsParams {
    userId: string;
}
export const getFavoritedCoins = ({ userId }: GetFavoritedCoinsParams): AxiosPromise<FavoritedCoinsMapResponse> => {
    return cryptoLightRequester.get('/favoritedCoinsMap', { params: { userId } });
};

export const setFavoritedCoins = (data: FavoritedCoinsMap): AxiosPromise<User> => {
    return cryptoLightRequester.post('/setFavoritedCoinsMap', data);
};
