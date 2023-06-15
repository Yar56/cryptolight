// import { createStore, createEffect } from 'effector';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { coinGeckoApi } from '~/shared/api';
import type { TrendingCoin, Coin } from '~/shared/api';

type CoinsTrendingState = {
    isLoadingCoinList?: boolean;
    coinList?: TrendingCoin[];
    isLoadingCoinListByGlobal?: boolean;
    coinListByGlobal?: Array<Coin>;
};

export const coinsInitialState: CoinsTrendingState = {
    isLoadingCoinList: false,
    coinList: [],
    isLoadingCoinListByGlobal: false,
    coinListByGlobal: []
};

export const fetchTrendingCoinList = createAsyncThunk('coins/fetchTrendingCoinList', async () => {
    return coinGeckoApi.coins.getTrendingCoinsList();
});
export const fetchTrendingCoinListByGlobal = createAsyncThunk('coins/fetchTrendingCoinListByGlobal', async () => {
    return coinGeckoApi.coins.getAnotherTrendingCoinsList();
});
export const coinsSlice = createSlice({
    name: 'coins',
    initialState: coinsInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrendingCoinList.pending, (state) => {
                return { ...state, isLoadingCoinList: true };
            })
            .addCase(fetchTrendingCoinList.fulfilled, (state, action) => {
                return { ...state, isLoadingCoinList: false, coinList: action.payload.data.coins };
            })
            .addCase(fetchTrendingCoinListByGlobal.pending, (state) => {
                return { ...state, isLoadingCoinListByGlobal: true };
            })
            .addCase(fetchTrendingCoinListByGlobal.fulfilled, (state, action) => {
                return { ...state, isLoadingCoinList: false, coinListByGlobal: action.payload.data };
            });
    }
});

const selectCoins = (state) => state.coinList;
const selectIsLoadingCoinList = (state) => state.isLoadingCoinList;
const selectIsEmptyCoinList = (state) => state.coinList.length === 0;

export const selectCoinsByGlobal = (state) => state.coinListByGlobal;
export const selectIsLoadingCoinListByGlobal = (state) => state.isLoadingCoinListByGlobal;
export const selectIsEmptyCoinListByGlobal = (state) => state.coinListByGlobal.length === 0;

export const coinsReducer = coinsSlice.reducer;
