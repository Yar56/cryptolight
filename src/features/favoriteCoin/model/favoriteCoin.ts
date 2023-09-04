import { createEffect, createEvent, createStore } from 'effector';
import { useStore, useStoreMap } from 'effector-react';
import produce from 'immer';

import { cryptoLightApi } from '~/shared/api';

import { coinModel } from '~/entities/coin';
import { userModel } from '~/entities/user';

const setFavoriteCoin = createEvent<string>();
const clearFavoriteCoins = createEvent();

type FavoriteCoinsState = Record<string, boolean>;

export const getFavoriteUserCoinsFx = createEffect(
    async (data: cryptoLightApi.favoriteCoins.GetFavoritedCoinsParams) =>
        await cryptoLightApi.favoriteCoins.getFavoritedCoins(data)
);
export const setFavoriteUserCoinsFx = createEffect(
    async (data: cryptoLightApi.models.FavoritedCoinsMap) => await cryptoLightApi.favoriteCoins.setFavoritedCoins(data)
);

const $favoritedCoins = createStore<FavoriteCoinsState>({})
    .on(setFavoriteCoin, (state, coinId) =>
        produce(state, (draft) => {
            draft[coinId] = !draft[coinId];
        })
    )
    .on(clearFavoriteCoins, () => {
        return {};
    })
    .on(getFavoriteUserCoinsFx.doneData, (state, { data }) => {
        return { ...state, ...data };
    });

export const events = { setFavoriteCoin, clearFavoriteCoins };
export const $favoritedCoinsMap = $favoritedCoins;
export const $favoritedCoinsIds = $favoritedCoins.map((item) => Object.keys(item).map((id) => id));

const useFavoritedCoins = () => useStore($favoritedCoinsMap);
const useFavoritedCoinsIds = () => useStore($favoritedCoinsIds);

export const useFavoriteCoin = ({ coinId }: { coinId: string }): boolean | undefined => {
    return useStoreMap({
        store: $favoritedCoins,
        keys: [coinId],
        fn: (coins, [id]) => coins[id] ?? null
    });
};

export const selectors = { useFavoritedCoins, useFavoriteCoin, useFavoritedCoinsIds };
$favoritedCoins.watch((state) => console.debug(state));

coinModel.coinListSubModel.events.pageMounted.watch(() => {
    userModel.$user.watch((state) => {
        if (!state.user) {
            console.log('user is undefined, skip getFavoriteUserCoinsFx');
            return;
        }
        getFavoriteUserCoinsFx({ userId: state.user.localId });
    });
});
