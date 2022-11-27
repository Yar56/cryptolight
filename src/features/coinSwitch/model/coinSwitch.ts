import { createEvent, createStore } from 'effector';
import { useStoreMap } from 'effector-react';

// export type eventType = 'COIN-GECKO' | 'GLOBAL';
export enum EventType {
    COIN_GECKO = 'COIN_GECKO',
    GLOBAL = 'GLOBAL'
}

export const switchCoins = createEvent<EventType>();

type CurrentCoinsListState = {
    currentListType: EventType;
};

const $currentListType = createStore<CurrentCoinsListState>({ currentListType: EventType.COIN_GECKO }).on(
    switchCoins,
    (state, listType) => {
        return { ...state, currentListType: listType };
    }
);

export const events = { switchCoins };

export const useListType = (): EventType => {
    return useStoreMap($currentListType, (state) => state.currentListType);
};
