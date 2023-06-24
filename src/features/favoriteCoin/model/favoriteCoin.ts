import { createEffect, createEvent, createStore } from 'effector';
import { useStore, useStoreMap } from 'effector-react';
import { getDoc } from 'firebase/firestore';
import produce from 'immer';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { docRefUserLikedCoins } from '~/shared/config/firebase';

export const setFavoriteCoin = createEvent<string>();
type FavoriteCoinsState = Record<string, boolean>;

export const getFavoriteUserCoinsFx = createEffect(() => {
    return getDoc(docRefUserLikedCoins);
});

const $favoritedCoins = createStore<FavoriteCoinsState>({})
    .on(setFavoriteCoin, (state, coinId) =>
        produce(state, (draft) => {
            draft[coinId] = !draft[coinId];
        })
    )
    .on(getFavoriteUserCoinsFx.doneData, (state, snapShot) => {
        if (snapShot.exists()) {
            const docData = snapShot.data() as Record<number, FavoriteCoinsState>;
            const [likedCoins] = Object.values(docData);
            return { ...state, ...likedCoins };
        }
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
