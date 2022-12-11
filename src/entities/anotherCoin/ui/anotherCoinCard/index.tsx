import React, { FunctionComponent, ReactNode, useState } from 'react';
import { Card, Grid } from '@nextui-org/react';
import { Coin } from '~/shared/api';
import styles from './styles.module.css';
import { get } from 'lodash';

interface CoinCardProps {
    coin: Coin;
    badge?: ReactNode;
}

const shortPrice = ({ price }: { price: number }): string => {
    return price.toFixed(2);
};
export const AnotherCoinCard: FunctionComponent<CoinCardProps> = ({ coin, badge }) => {
    const {
        image: { large },
        name,
        symbol,
        id,
        marketData: { currentPrice }
    } = coin;

    const [price, setPrice] = useState<string>(`${shortPrice({ price: currentPrice.usd })} usd`);

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        const price = get(currentPrice, value);
        setPrice(`${shortPrice({ price })} ${value}`);
    };

    return (
        <Grid xs={12}>
            <div className={styles.cardWrapper}>
                {badge && <div className={styles.badgeWrapper}>{badge}</div>}
                <Card variant="bordered">
                    <Card.Body className={styles.flexContainer} css={{ pr: '20px' }}>
                        <div className={styles.description}>
                            <img alt={id} src={large} width="34px" height="34px" />
                            <div className={styles.nameWrapper}>
                                <div className={styles.name}>{name}</div>
                                <div className={styles.symbol}>{symbol}</div>
                            </div>
                        </div>
                        <div className={styles.priceWrapper}>
                            <div className={styles.priceName}>
                                Price to{' '}
                                <select name="coinNames" id="coinNames" onChange={handleSelect} defaultValue="usd">
                                    {Object.keys(currentPrice).map((currency) => {
                                        return (
                                            <option value={currency} key={currency} selected={currency === 'usd'}>
                                                {currency}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <span className={styles.priceValue}>{price}</span>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </Grid>
    );
};
