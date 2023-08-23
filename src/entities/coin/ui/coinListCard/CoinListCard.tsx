import { Card, Grid, Row } from '@nextui-org/react';
import React, { FunctionComponent, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import { coinGeckoApi } from '~/shared/api';

import { coinLib } from '~/entities/coin/';

import styles from './CoinListCard.module.css';

interface CoinCardProps {
    coin: coinGeckoApi.models.TrendingCoin;
    likeComponent?: ReactElement;
}

export const CoinListCard: FunctionComponent<CoinCardProps> = ({ coin, likeComponent }) => {
    const {
        item: { large, id: coinId, name, symbol, priceBtc }
    } = coin;
    const navigate = useNavigate();
    const handleCardClick = () => navigate({ pathname: coinLib.getCoinPageUrl({ coinId }) });

    return (
        <Grid xs={12} onClick={handleCardClick}>
            <div className={styles.cardWrapper}>
                <Card isPressable isHoverable variant="bordered">
                    <Card.Body>
                        <Row justify="flex-start" align="center">
                            <Row>
                                <img alt={coinId} src={large} width="34px" height="34px" />
                                <div className={styles.nameWrapper}>
                                    <div className={styles.name}>{name}</div>
                                    <div className={styles.symbol}>{symbol}</div>
                                </div>
                            </Row>
                            <div className={styles.priceWrapper}>
                                <div className={styles.priceName}>Price to Bitcoin:</div>
                                <span className={styles.priceValue}>{priceBtc}</span>
                            </div>
                            {likeComponent && <div className={styles.likeWrapper}>{likeComponent}</div>}
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        </Grid>
    );
};
