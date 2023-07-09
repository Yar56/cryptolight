import { createStore, createEffect } from 'effector';
import { useStore } from 'effector-react';

import { coinGeckoApi } from '~/shared/api';
import { TrendingCoin } from '~/shared/api/coingecko/models';

// В каждом эффекте так же может быть своя доп. обработка
export const getTrendingCoinsListFx = createEffect(() => {
    return coinGeckoApi.coins.getTrendingCoinList();
});

// Можно хранить и в нормализованном виде
type CoinsTrendingState = TrendingCoin[];

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

$coinList.watch((state) => console.debug(state));
