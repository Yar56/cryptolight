import { createEvent, createStore } from 'effector';
import { useStoreMap } from 'effector-react';

// export type eventType = 'COIN-GECKO' | 'GLOBAL';
export enum eventType {
    COIN_GECKO = 'COIN_GECKO',
    GLOBAL = 'GLOBAL'
}

export const switchCoins = createEvent<eventType>();

type CurrentCoinsListState = {
    currentListType: eventType;
};

const $currentListType = createStore<CurrentCoinsListState>({ currentListType: eventType.COIN_GECKO }).on(
    switchCoins,
    (state, listType) => {
        return { ...state, currentListType: listType };
    }
);

export const events = { switchCoins };

export const useListType = (): eventType => {
    return useStoreMap($currentListType, (state) => state.currentListType);
};
