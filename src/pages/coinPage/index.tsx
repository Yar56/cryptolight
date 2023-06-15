import { Box, Typography } from '@mui/material';
import { Avatar, Button, Card, Col, Container, Row, Spacer, Text } from '@nextui-org/react';
import { useMediaQuery, useWindowSize } from '@uidotdev/usehooks';
import { get } from 'lodash';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Coin, DataProps, MarketChartCoin } from '~/shared/api';
import { getCoinById, getCoinMarketChartById } from '~/shared/api/coingecko/coins';
import { useModalState } from '~/shared/hooks/useModalState';
import { numberWithSpaces } from '~/shared/lib/numberWithSpaces';

import { FavoriteCoin } from '~/features/favoriteCoin';
import PriceChart from '~/features/priceChart/ui/priceChart';

import { Header } from '~/widgets/header';

import { ReactComponent as GoBackIcon } from './images/goBackIcon.svg';
import styles from './styles.module.scss';

const shortPrice = ({ price }: { price: number }): string => {
    return price.toFixed(2);
};
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const CoinPage: FunctionComponent = () => {
    const { coinId } = useParams<{ coinId: string }>();
    const [coinState, setCoinState] = useState<Coin>();
    const [marketChartState, setMarketChartState] = useState<DataProps[]>();

    const isDesktop = useMediaQuery('only screen and (min-width: 1280px)');
    const isXs = useMediaQuery('only screen and (max-width: 600px)');
    console.log(isDesktop);
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const { handleOpen, ModalComponent } = useModalState();

    useEffect(() => {
        getCoinById({ coinId }).then((response) => {
            setCoinState(response?.data);
        });
        getCoinMarketChartById({ coinId }).then((response) => {
            const data = response.data as MarketChartCoin;

            const formattedPrices: DataProps[] = data.prices.map((item) => {
                return { date: new Date(item[0]), price: item[1] };
            });

            setMarketChartState(formattedPrices);
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

    if (!coinState) {
        return null;
    }
    return (
        <>
            <Header sticky />
            <Container>
                <Spacer y={1} />
                <div className={styles.wrapper}>
                    <Card css={{ mw: '400px', maxH: '276px' }} className={styles.card}>
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
                        <Card css={{ width: 'calc(100% - 20px)', margin: '0 auto 20px', p: 15 }} variant="bordered">
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

                    {marketChartState?.length ? (
                        <div className={styles.chart}>
                            <PriceChart
                                data={marketChartState}
                                height={400}
                                width={isXs ? 400 : 600}
                                margin={{
                                    top: 16,
                                    right: 16,
                                    bottom: 40,
                                    left: 48
                                }}
                            />
                        </div>
                    ) : null}
                </div>
                {isDesktop && (
                    <Card
                        css={{
                            w: 'calc(100% - 200px)',
                            h: '400px',
                            display: 'block',
                            margin: '50px auto',
                            paddingLeft: '50px',
                            background:
                                'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(15,130,145,1) 80%, rgba(0,212,255,1) 100%)'
                        }}
                    >
                        <Card.Body css={{ h: '100%', display: 'flex', justifyContent: 'center' }}>
                            <Text
                                h2
                                size={60}
                                weight="bold"
                                css={{
                                    textGradient: '45deg, $blue600 -20%, $pink600 50%'
                                }}
                            >
                                CryptoLight
                            </Text>
                            <Text
                                h2
                                size={60}
                                weight="bold"
                                css={{
                                    textGradient: '45deg, $purple600 -20%, $pink600 100%'
                                }}
                            >
                                App
                            </Text>
                            <Text
                                h3
                                size={50}
                                weight="bold"
                                css={{
                                    textGradient: '45deg, $yellow600 -20%, $red600 100%'
                                }}
                            >
                                coming soon
                            </Text>
                        </Card.Body>
                    </Card>
                )}
            </Container>
        </>
    );
};
export default CoinPage;
