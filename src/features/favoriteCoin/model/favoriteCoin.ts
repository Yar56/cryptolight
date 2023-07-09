import { createEffect, createEvent, createStore } from 'effector';
import { useStore, useStoreMap } from 'effector-react';
import produce from 'immer';

import { cryptoLightApi } from '~/shared/api';
import { FavoritedCoinsMap } from '~/shared/api/cryptoLight/models';

export const setFavoriteCoin = createEvent<string>();
type FavoriteCoinsState = Record<string, boolean>;

export const getFavoriteUserCoinsFx = createEffect(async () => await cryptoLightApi.favoriteCoins.getFavoritedCoins());
export const setFavoriteUserCoinsFx = createEffect(
    async (data: FavoritedCoinsMap) => await cryptoLightApi.favoriteCoins.setFavoritedCoins(data)
);

const $favoritedCoins = createStore<FavoriteCoinsState>({})
    .on(setFavoriteCoin, (state, coinId) =>
        produce(state, (draft) => {
            draft[coinId] = !draft[coinId];
        })
    )
    .on(getFavoriteUserCoinsFx.doneData, (state, { data }) => {
        const [likedCoins] = Object.values(data);
        return { ...state, ...likedCoins };
    });

export const events = { setFavoriteCoin };
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
