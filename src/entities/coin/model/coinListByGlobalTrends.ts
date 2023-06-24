import { createEffect, createStore } from 'effector';

import type { Coin } from '~/shared/api';
import { coinGeckoApi } from '~/shared/api';

type CoinsTrendingByGlobalState = Coin[];
export const getCoinListByGlobalTrendsFx = createEffect(() => {
    // Здесь также может быть доп. обработка эффекта
    return coinGeckoApi.coins.getCoinListByGlobalTrends();
});

const $coinsByGlobal = createStore<CoinsTrendingByGlobalState>([]).on(
    getCoinListByGlobalTrendsFx.doneData,
    (_, payload) => payload.data
);

export const $coinListByGlobal = $coinsByGlobal;
export const $coinListByGlobalEmpty = $coinListByGlobal.map((list) => list.length === 0);

$coinListByGlobal.watch((state) => console.debug(state));
