import { createStore, createEffect } from 'effector';

import { coinGeckoApi } from '~/shared/api';
import type { TrendingCoin } from '~/shared/api';

// В каждом эффекте так же может быть своя доп. обработка
export const getTrendingCoinsListFx = createEffect(() => {
    return coinGeckoApi.coins.getTrendingCoinList();
});

// Можно хранить и в нормализованном виде
type CoinsTrendingState = TrendingCoin[];

export const coinsInitialState: CoinsTrendingState = [];

const $coins = createStore<CoinsTrendingState>(coinsInitialState).on(
    getTrendingCoinsListFx.doneData,
    (state, payload) => {
        return [...state, ...payload.data.coins];
    }
);

export const $coinList = $coins;
export const $coinListIsLoading = getTrendingCoinsListFx.pending;
export const $coinListIsEmpty = $coinList.map((list) => list.length === 0);

$coinList.watch((state) => console.debug(state));
