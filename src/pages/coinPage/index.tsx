import { Avatar, Card, Container, Row, Text, Tooltip } from '@nextui-org/react';
import { get } from 'lodash';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Coin, MarketChart, MarketChartCoin } from '~/shared/api';
import { getCoinById, getCoinMarketChartById } from '~/shared/api/coingecko/coins';
import { useModalState } from '~/shared/hooks/useModalState';

import { FavoriteCoin } from '~/features/favoriteCoin';

import { Header } from '~/widgets/header';

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
                <Card>
                    <Card.Header>
                        <Row justify="flex-start" align="center">
                            <Avatar text="JR" size="md" src={coinState?.image?.small ?? ''} css={{ mr: 10 }} />
                            <Text b css={{ fontSize: 18, marginRight: 10 }}>
                                {coinState?.name}
                            </Text>
                            <select name="coinNames" id="coinNames" onChange={handleSelect} defaultValue="usd">
                                {Object.keys(coinState?.marketData.currentPrice).map((currency) => {
                                    return (
                                        <option value={currency} key={currency} selected={currency === 'usd'}>
                                            {currency}
                                        </option>
                                    );
                                })}
                            </select>
                        </Row>
                        <Row>
                            <Tooltip content="Убрать из любимых монет" color="warning">
                                <FavoriteCoin coinId={coinState.id} />
                            </Tooltip>
                        </Row>
                    </Card.Header>
                    <Card.Body css={{ p: 0 }}>
                        {/*<Card.Image*/}
                        {/*    src={coinState?.image?.small ?? ''}*/}
                        {/*    // objectFit="cover"*/}
                        {/*    width="100%"*/}
                        {/*    height={140}*/}
                        {/*    alt={coinState?.name}*/}
                        {/*/>*/}
                    </Card.Body>
                    <Card.Footer css={{ justifyItems: 'flex-start' }}>
                        {/*<Row wrap="wrap" justify="space-between" align="center">*/}
                        {/*    <Text b>{item.title}</Text>*/}
                        {/*    <Text css={{ color: '$accents7', fontWeight: '$semibold', fontSize: '$sm' }}>*/}
                        {/*        {item.price}*/}
                        {/*    </Text>*/}
                        {/*</Row>*/}
                    </Card.Footer>
                </Card>
                {/*<div className={styles.header}>*/}
                {/*    <Avatar squared src={coinState?.image?.small} className={styles.avatar} />*/}
                {/*    <div className={styles.name}>{coinState?.name}</div>*/}
                {/*    <Badge className={styles.symbol}>{coinState?.symbol}</Badge>*/}
                {/*    <div className={styles.likeWrapper}>*/}
                {/*        <LikeCoin coinId={2} className={styles.likeCoin} />*/}
                {/*    </div>*/}

                {/*    <div className={styles.priceWrapper}>*/}
                {/*        <div className={styles.priceSymbol}>*/}
                {/*            {`${coinState?.name} price (${coinState?.symbol.toUpperCase()})`}*/}
                {/*        </div>*/}

                {/*        <div className={styles.priceValue}>${coinState?.marketData?.currentPrice['usd']}</div>*/}

                {/*        <div className={styles.price24h}>*/}
                {/*            <div className={styles.price24hItem}>*/}
                {/*                Low24h: <span>${coinState?.marketData?.low24H['usd']}</span>*/}
                {/*            </div>*/}
                {/*            /!*<Spacer x={2} y={2} className={styles.spacer} />*!/*/}
                {/*            <div className={styles.price24hDivider}></div>*/}
                {/*            <div className={styles.price24hItem}>*/}
                {/*                High24h: <span>${coinState?.marketData?.high24H['usd']}</span>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className={styles.addInfo}>*/}
                {/*    <Badge>marketCapRank #{coinState?.marketCapRank}</Badge>*/}
                {/*</div>*/}
                {/*{coinState?.categories && (*/}
                {/*    <div className={styles.categories}>*/}
                {/*        <span className={styles.categoriesTitle}>Категории:</span>*/}
                {/*        <div className={styles.categoriesTags}>*/}
                {/*            {coinState?.categories?.map((category: string, index) => {*/}
                {/*                if (index >= 3) {*/}
                {/*                    return;*/}
                {/*                }*/}
                {/*                return <Badge key={index}>{category}</Badge>;*/}
                {/*            })}*/}
                {/*            {coinState?.categories.length >= 3 && (*/}
                {/*                <Button size="xs" className={styles.buttonViewAll} onClick={handleOpen}>*/}
                {/*                    Посмотреть все*/}
                {/*                </Button>*/}
                {/*            )}*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*)}*/}
                {/*<div className={styles.marketChartWrapper}>*/}
                {/*    <Text b>{coinState?.name} to USD Chart</Text>*/}
                {/*    {marketChartState?.map((itemPrice, index) => {*/}
                {/*        const [, price] = itemPrice;*/}
                {/*        // return <div key={index}>{price}</div>;*/}
                {/*    })}*/}
                {/*</div>*/}

                {/*<ModalComponent>*/}
                {/*    <Modal.Header>*/}
                {/*        <Text b size={18}>*/}
                {/*            {coinState?.name} Категории:*/}
                {/*        </Text>*/}
                {/*    </Modal.Header>*/}
                {/*    <Modal.Body>*/}
                {/*        {coinState?.categories?.map((category: string, index) => {*/}
                {/*            return <Badge key={index}>{category}</Badge>;*/}
                {/*        })}*/}
                {/*    </Modal.Body>*/}
                {/*</ModalComponent>*/}
            </Container>
        </>
    );
};
export default CoinPage;
