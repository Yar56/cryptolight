import { Card, Grid, Row } from '@nextui-org/react';
import { noop } from 'lodash';
import React, { FunctionComponent, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import { TrendingCoin } from '~/shared/api';

import styles from './styles.module.css';

interface CoinCardProps {
    coin: TrendingCoin;
    likeComponent?: ReactElement;
}

export const CoinPageCard: FunctionComponent<CoinCardProps> = ({ coin, likeComponent }) => {
    return <Grid xs={12} onClick={noop}></Grid>;
};
