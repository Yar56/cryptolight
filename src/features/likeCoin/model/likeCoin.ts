import produce from 'immer';
import { createEvent, createStore } from 'effector';
import { useStoreMap } from 'effector-react';

export const likeCoin = createEvent<number>();
type LikedCoinsState = Record<number, boolean>;

const $likedCoins = createStore<LikedCoinsState>({}).on(likeCoin, (state, coinId) =>
    produce(state, (draft) => {
        draft[coinId] = !draft[coinId];
    })
);

export const events = { likeCoin };
export const $likedCoinsMap = $likedCoins;

export const useLikeCoin = (coinId: number): boolean | undefined => {
    return useStoreMap({
        store: $likedCoins,
        keys: [coinId],
        fn: (coins, [id]) => coins[id] ?? null
    });
};
