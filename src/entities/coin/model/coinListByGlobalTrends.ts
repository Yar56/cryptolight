import { createEffect, createStore } from 'effector';

import { coinGeckoApi } from '~/shared/api';

import { coinModel } from '~/entities/coin';
type CoinsTrendingByGlobalState = coinGeckoApi.models.Coin[];

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
coinModel.coinListSubModel.events.pageMounted.watch(() => {
    getCoinListByGlobalTrendsFx();
});
