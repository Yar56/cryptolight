import { Avatar, Button, Card, Col, Container, Row, Text, Tooltip } from '@nextui-org/react';
import { get } from 'lodash';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Coin, MarketChart, MarketChartCoin } from '~/shared/api';
import { getCoinById, getCoinMarketChartById } from '~/shared/api/coingecko/coins';
import { useModalState } from '~/shared/hooks/useModalState';
import { numberWithSpaces } from '~/shared/lib/numberWithSpaces';

import { FavoriteCoin } from '~/features/favoriteCoin';

import { Header } from '~/widgets/header';

import styles from './styles.module.scss';
const shortPrice = ({ price }: { price: number }): string => {
    return price.toFixed(2);
};

const CoinPage: FunctionComponent = () => {
    const { coinId } = useParams<{ coinId: string }>();
    const [coinState, setCoinState] = useState<Coin>();
    const [marketChartState, setMarketChartState] = useState<MarketChart>();

    const { handleOpen, ModalComponent } = useModalState();

    useEffect(() => {
        getCoinById({ coinId }).then((response) => {
            setCoinState(response?.data);
        });
        getCoinMarketChartById({ coinId }).then((response) => {
            const data = response.data as MarketChartCoin;
            setMarketChartState(data.prices);
        });
    }, []);

    const [price, setPrice] = useState<string>(
        `${shortPrice({ price: coinState?.marketData.currentPrice.usd ?? 0 })} usd`
    );

    // const options = useMemo(() => {
    //     if (!coinState) {
    //         return [];
    //     }
    //     return Object.keys(coinState.marketData.currentPrice).map((currency) => {
    //         return { value: currency, label: currency };
    //     });
    // }, []);

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.stopPropagation();
        const { value } = e.target;
        const price = get(coinState?.marketData.currentPrice ?? 0, value);
        setPrice(`${shortPrice({ price })} ${value}`);
    };

    console.log(coinState);
    if (!coinState) {
        return null;
    }
    return (
        <>
            <Header sticky />
            <Container>
                <Link to="/">
                    <br />
                    назад
                </Link>
                <Card css={{ mw: '400px' }}>
                    <Card.Header>
                        <Row justify="flex-start" align="center">
                            <Avatar text="JR" size="md" src={coinState?.image?.small ?? ''} css={{ mr: 10 }} />
                            <Text b css={{ fontSize: 18, marginRight: 10 }}>
                                {coinState?.name}
                            </Text>
                            <select
                                className={styles.select}
                                name="coinNames"
                                id="coinNames"
                                onChange={handleSelect}
                                defaultValue="usd"
                            >
                                {Object.keys(coinState?.marketData.currentPrice).map((currency) => {
                                    return (
                                        <option value={currency} key={currency} selected={currency === 'usd'}>
                                            {currency}
                                        </option>
                                    );
                                })}
                            </select>
                        </Row>
                        <Row justify="flex-end">
                            <FavoriteCoin coinId={coinState.id} />
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Text b color="#8f89b4">
                            {coinState.name} price
                        </Text>
                        <Text b h3>
                            $ {numberWithSpaces(coinState.marketData.currentPrice['usd'])}
                        </Text>
                    </Card.Body>
                    <Card css={{ width: 'calc(100% - 40px)', margin: '0 auto 20px', p: 15 }}>
                        <Row justify="space-between" align="center">
                            <Col span={7}>
                                <Text color="#7a7ebd">
                                    Market Cap{' '}
                                    <strong>
                                        {coinState.marketData.marketCapChangePercentage24H.toFixed(2)}% (1d)
                                    </strong>
                                </Text>
                                <Text b>$ {numberWithSpaces(coinState.marketData.marketCap['usd'])}</Text>
                            </Col>

                            <Col span={5}>
                                <Text color="#7a7ebd">Volume</Text>
                                <Text b>$ {numberWithSpaces(coinState.marketData.totalVolume['usd'])}</Text>
                            </Col>
                        </Row>
                    </Card>
                </Card>
            </Container>
        </>
    );
};
export default CoinPage;
