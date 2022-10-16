import React, { FunctionComponent } from 'react';
import { Card } from '@nextui-org/react';
import { Coin } from '../../../../shared/api';
import styles from './styles.module.css';

interface CoinCardProps {
    coin: Coin;
}

export const CoinCard: FunctionComponent<CoinCardProps> = ({ coin }) => {
    const {
        // eslint-disable-next-line camelcase
        item: { large, id, name, symbol, price_btc }
    } = coin;
    return (
        <Card css={{ mt: 20 }} isPressable isHoverable variant="bordered" className={styles.card}>
            <Card.Body className={styles.flexContainer}>
                <div className={styles.description}>
                    <img alt={id} src={large} width="34px" height="34px" />
                    <div className={styles.nameWrapper}>
                        <div className={styles.name}>{name}</div>
                        <div className={styles.symbol}>{symbol}</div>
                    </div>
                </div>
                <div className={styles.priceWrapper}>
                    <div className={styles.priceName}>Price to Bitcoin:</div>
                    {/* eslint-disable-next-line camelcase */}
                    <span className={styles.priceValue}>{price_btc}</span>
                </div>
            </Card.Body>
        </Card>
    );
};
