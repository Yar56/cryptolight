import produce from 'immer';
import { createEffect, createEvent, createStore } from 'effector';
import { useStore, useStoreMap } from 'effector-react';
import { getDoc } from 'firebase/firestore';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { docRefUserLikedCoins } from '~/shared/config/firebase';

export const likeCoin = createEvent<number>();
type LikedCoinsState = Record<number, boolean>;

export const getLikedUserCoinsFx = createEffect(() => {
    return getDoc(docRefUserLikedCoins);
});

const $likedCoins = createStore<LikedCoinsState>({})
    .on(likeCoin, (state, coinId) =>
        produce(state, (draft) => {
            draft[coinId] = !draft[coinId];
        })
    )
    .on(getLikedUserCoinsFx.doneData, (state, snapShot) => {
        if (snapShot.exists()) {
            const docData = snapShot.data() as Record<number, LikedCoinsState>;
            const [likedCoins] = Object.values(docData);
            return { ...state, ...likedCoins };
        }
    });

export const events = { likeCoin };
export const $likedCoinsMap = $likedCoins;

const useLikedCoins = () => useStore($likedCoinsMap);

export const useLikeCoin = ({ coinId }: { coinId: number }): boolean | undefined => {
    return useStoreMap({
        store: $likedCoins,
        keys: [coinId],
        fn: (coins, [id]) => coins[id] ?? null
    });
};

export const selectors = { useLikedCoins, useLikeCoin };
