import { createStore, createEffect, createEvent } from 'effector';
import { useStore } from 'effector-react';

import { coinGeckoApi } from '~/shared/api';

const pageMounted = createEvent();

export const getTrendingCoinsListFx = createEffect(() => {
    return coinGeckoApi.coins.getTrendingCoinList();
});

type CoinsTrendingState = coinGeckoApi.models.TrendingCoin[];

export const coinsInitialState: CoinsTrendingState = [];

const $coins = createStore<CoinsTrendingState>(coinsInitialState).on(
    getTrendingCoinsListFx.doneData,
    (_, payload) => payload.data.coins
);

export const $coinList = $coins;
export const $coinListIsLoading = getTrendingCoinsListFx.pending;
export const $coinListIsEmpty = $coinList.map((list) => list.length === 0);

const useCoinList = () => useStore($coinList);
export const selectors = { useCoinList };
export const events = { pageMounted };

$coinList.watch((state) => console.debug(state));

pageMounted.watch(() => {
    getTrendingCoinsListFx();
});
