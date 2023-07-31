import { createEffect, createStore } from 'effector';

import { coinGeckoApi } from '~/shared/api';
import { Coin } from '~/shared/api/coingecko/models';

type CoinsTrendingByGlobalState = Coin[];
export const getCoinListByGlobalTrendsFx = createEffect(() => {
    return coinGeckoApi.coins.getCoinListByGlobalTrends();
});

const $coinsByGlobal = createStore<CoinsTrendingByGlobalState>([]).on(
    getCoinListByGlobalTrendsFx.doneData,
    (_, payload) => payload.data
);

export const $coinListByGlobal = $coinsByGlobal;
export const $coinListByGlobalEmpty = $coinListByGlobal.map((list) => list.length === 0);

$coinListByGlobal.watch((state) => console.debug(state));
