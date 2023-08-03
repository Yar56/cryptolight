import { Switch, Text } from '@nextui-org/react';
import React, { FunctionComponent } from 'react';

import { events, EventType, useListType } from '../model';

import styles from './CoinSwitch.module.css';

export const CoinSwitch: FunctionComponent = () => {
    const listType = useListType();
    const isCoinGecko = listType === EventType.COIN_GECKO;

    const handleChange = () => events.switchCoins(isCoinGecko ? EventType.GLOBAL : EventType.COIN_GECKO);
    return (
        <div className={styles.switchWrapper}>
            <Text h5 css={{ mb: 0 }}>
                Trending Coins (by {isCoinGecko ? 'CoinGecko' : 'Global Trends'})
            </Text>
            <Switch color="primary" size="sm" checked={isCoinGecko && false} onChange={handleChange} />
        </div>
    );
};
