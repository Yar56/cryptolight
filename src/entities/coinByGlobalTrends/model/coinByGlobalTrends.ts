import { createEffect, createStore } from 'effector';

import type { Coin } from '~/shared/api';
import { coinGeckoApi } from '~/shared/api';

type CoinsTrendingByGlobalState = Coin[];
export const getAnotherTrendingCoinsListFx = createEffect(() => {
    // Здесь также может быть доп. обработка эффекта
    return coinGeckoApi.coins.getAnotherTrendingCoinsList();
});

export const $coinsByGlobal = createStore<CoinsTrendingByGlobalState>([]).on(
    getAnotherTrendingCoinsListFx.doneData,
    (state, payload) => {
        return [...state, ...payload.data];
    }
);

export const $coinListByGlobal = $coinsByGlobal;
export const $coinListByGlobalEmpty = $coinListByGlobal.map((list) => list.length === 0);

$coinListByGlobal.watch((state) => console.debug(state));
