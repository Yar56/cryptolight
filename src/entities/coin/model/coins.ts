import { createStore, createEffect } from 'effector';

import { coinGeckoApi } from '~/shared/api';
import type { TrendingCoin, Coin } from '~/shared/api';

// В каждом эффекте так же может быть своя доп. обработка
export const getTrendingCoinsListFx = createEffect(() => {
    // Здесь также может быть доп. обработка эффекта
    return coinGeckoApi.coins.getTrendingCoinsList();
});

// Можно хранить и в нормализованном виде
type CoinsTrendingState = TrendingCoin[];

export const coinsInitialState: CoinsTrendingState = [];

export const $coins = createStore<CoinsTrendingState>(coinsInitialState).on(
    getTrendingCoinsListFx.doneData,
    (state, payload) => {
        return [...state, ...payload.data.coins];
    }
);

export const $coinsList = $coins;
// Можно промаппить и другие вещи вроде `isEmpty`, `isLoading`, ...
export const $coinsListLoading = getTrendingCoinsListFx.pending;
export const $coinsListEmpty = $coinsList.map((list) => list.length === 0);

export const getAnotherTrendingCoinsListFx = createEffect(() => {
    // Здесь также может быть доп. обработка эффекта
    return coinGeckoApi.coins.getAnotherTrendingCoinsList();
});

export const $anotherCoins = createStore<Array<Coin>>([]).on(
    getAnotherTrendingCoinsListFx.doneData,
    (state, payload) => {
        return [...state, ...payload.data];
    }
);

export const $anotherCoinsList = $anotherCoins;
export const $anotherCoinsListEmpty = $anotherCoins.map((list) => list.length === 0);
