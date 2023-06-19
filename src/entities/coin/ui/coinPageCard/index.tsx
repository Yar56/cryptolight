import { Avatar, Card, Col, Row, Text } from '@nextui-org/react';
import React, { FunctionComponent, ReactElement } from 'react';

import { Coin } from '~/shared/api';
import { numberWithSpaces } from '~/shared/lib/numberWithSpaces';

import styles from './styles.module.scss';

interface CoinCardProps {
    coin: Coin;
    favoriteCoinComponent?: ReactElement;
}

export const CoinPageCard: FunctionComponent<CoinCardProps> = ({ coin, favoriteCoinComponent }) => {
    return (
        <Card css={{ mw: '400px', maxH: '276px' }} className={styles.card}>
            <Card.Header>
                <Row justify="flex-start" align="center">
                    <Avatar text="JR" size="md" src={coin.image?.small ?? ''} css={{ mr: 10 }} />
                    <Text b css={{ fontSize: 18, marginRight: 10 }}>
                        {coin.name}
                    </Text>
                </Row>
                <Row justify="flex-end">{favoriteCoinComponent}</Row>
            </Card.Header>
            <Card.Body>
                <Text b color="#8f89b4">
                    {coin.name} price
                </Text>
                <Text b h3>
                    $ {numberWithSpaces(coin.marketData.currentPrice['usd'])}
                </Text>
            </Card.Body>
            <Card css={{ width: 'calc(100% - 20px)', margin: '0 auto 20px', p: 15 }} variant="bordered">
                <Row justify="space-between" align="center">
                    <Col span={7}>
                        <Text color="#7a7ebd">
                            Market Cap <strong>{coin.marketData.marketCapChangePercentage24H.toFixed(2)}% (1d)</strong>
                        </Text>
                        <Text b>$ {numberWithSpaces(coin.marketData.marketCap['usd'])}</Text>
                    </Col>

                    <Col span={5}>
                        <Text color="#7a7ebd">Volume</Text>
                        <Text b>$ {numberWithSpaces(coin.marketData.totalVolume['usd'])}</Text>
                    </Col>
                </Row>
            </Card>
        </Card>
    );
};
