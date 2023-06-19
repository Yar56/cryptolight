import { createStore, createEffect } from 'effector';

import { coinGeckoApi } from '~/shared/api';
// import type { TrendingCoin } from '~/shared/api';

// В каждом эффекте так же может быть своя доп. обработка
export const getCoinByIdFx = createEffect(() => {
    // Здесь также может быть доп. обработка эффекта
    return coinGeckoApi.coins.getTrendingCoinsList();
});

// Можно хранить и в нормализованном виде
// type CoinsTrendingState = TrendingCoin[];

// export const coinsInitialState: CoinsTrendingState = [];

export const $coin = createStore({}).on(getCoinByIdFx.doneData, (state, payload) => {
    return [...state, ...payload.data.coins];
});

// export const $coin = $coin;
// export const $coinListLoading = getTrendingCoinsListFx.pending;
// export const $coinListEmpty = $coinList.map((list) => list.length === 0);
//
// $coinList.watch((state) => console.debug(state));
