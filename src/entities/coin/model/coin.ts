import { createStore, createEffect } from 'effector';

import { coinGeckoApi } from '~/shared/api';

type Coin = coinGeckoApi.models.Coin;

export const getCoinByIdFx = createEffect(({ coinId }: coinGeckoApi.coins.GetCoinByIdParams) => {
    return coinGeckoApi.coins.getCoinById({ coinId });
});

export const getCoinMarketChartByIdFx = createEffect(({ coinId }: coinGeckoApi.coins.GetCoinChartByIdParams) => {
    return coinGeckoApi.coins.getCoinMarketChartById({ coinId });
});

interface CoinState {
    coin?: Coin;
    coinMarketChart?: coinGeckoApi.models.CoinMarketChart;
    preparedPrices?: coinGeckoApi.models.DataProps[];
}

export const coinInitialState: CoinState = {};

export const $coinState = createStore<CoinState>(coinInitialState)
    .on(getCoinByIdFx.doneData, (state, { data }) => {
        return { ...state, coin: data };
    })
    .on(getCoinMarketChartByIdFx.doneData, (state, { data }) => {
        return {
            ...state,
            coinMarketChart: data,
            preparedPrices: data.prices.map((item) => {
                return { date: new Date(item[0]), price: item[1] };
            })
        };
    });

export const $coin = $coinState.map((state) => state.coin as Coin);
export const $preparedPrices = $coinState.map((state) => state.preparedPrices);
export const $coinIsLoading = getCoinByIdFx.pending && getCoinMarketChartByIdFx.pending;
export const $coinIsEmpty = $coinState.map((state) => !state.coin);

$coinState.watch((state) => console.debug(state));
