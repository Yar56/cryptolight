import React, { FunctionComponent } from 'react';
import styles from './styles.module.css';
import { Switch, Text } from '@nextui-org/react';
import { events, eventType, useListType } from '../../model';

export const CoinSwitch: FunctionComponent = () => {
    const listType = useListType();
    const isCoinGecko = listType === eventType.COIN_GECKO;

    const handleChange = () => events.switchCoins(isCoinGecko ? eventType.GLOBAL : eventType.COIN_GECKO);
    return (
        <div className={styles.switchWrapper}>
            <Text h5 css={{ mb: 0 }}>
                Trending Coins (by {isCoinGecko ? 'CoinGecko' : 'Global Trends'})
            </Text>
            <Switch color="primary" size="sm" checked={isCoinGecko && false} onChange={handleChange} />
        </div>
    );
};
