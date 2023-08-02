import { Card, Grid } from '@nextui-org/react';
import { get } from 'lodash';
import React, { FunctionComponent, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Coin } from '~/shared/api/coingecko/models';

import { RouteName } from '~/pages/models';

import styles from './styles.module.scss';

interface CoinsByGlobalTrendsCardProps {
    coin: Coin;
    badge?: ReactNode;
}

const shortPrice = ({ price }: { price: number }): string => {
    return price.toFixed(2);
};
export const CoinListByGlobalTrendsCard: FunctionComponent<CoinsByGlobalTrendsCardProps> = ({ coin, badge }) => {
    const {
        image: { large },
        name,
        symbol,
        id,
        marketData: { currentPrice }
    } = coin;

    const navigate = useNavigate();

    const [price, setPrice] = useState<string>(`${shortPrice({ price: currentPrice.usd })} usd`);

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        const price = get(currentPrice, value);
        setPrice(`${shortPrice({ price })} ${value}`);
    };
    const handleCardClick = (event) => {
        if (event.target.tagName === 'SELECT') {
            return;
        }

        navigate({ pathname: `${RouteName.COIN_PAGE}${id}` });
    };
    return (
        <Grid xs={12} onClick={handleCardClick}>
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
                                <div className={styles.priceNamePrice}>Price to </div>
                                <div className={styles.select}>
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
                            </div>
                            <span className={styles.priceValue}>{price}</span>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </Grid>
    );
};
