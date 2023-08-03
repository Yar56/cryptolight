import { Card, Container, Grid, Loading, Text } from '@nextui-org/react';
import { useMediaQuery } from '@uidotdev/usehooks';
import { useStore } from 'effector-react';
import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import CommonPageHeader from '~/shared/ui/components/commonPageHeader/CommonPageHeader';

import { coinModel, coinUi } from '~/entities/coin';

import { FavoriteCoin } from '~/features/favoriteCoin';
import { PriceChart } from '~/features/priceChart';

import { Header } from '~/widgets/header';

import styles from './styles.module.scss';

const { CoinPageCard } = coinUi;

const CoinPage: FunctionComponent = () => {
    const { coinId } = useParams<{ coinId: string }>();
    const coin = useStore(coinModel.coinSubModel.$coin);
    const preparedPrices = useStore(coinModel.coinSubModel.$preparedPrices);

    const coinDataIsLoading = useStore(coinModel.coinSubModel.$coinIsLoading);
    const coinIsEmpty = useStore(coinModel.coinSubModel.$coinIsEmpty);

    const isDesktop = useMediaQuery('only screen and (min-width: 1280px)');
    const isXs = useMediaQuery('only screen and (max-width: 600px)');

    const fetchData = useCallback(async () => {
        return await Promise.all([
            coinModel.coinSubModel.getCoinByIdFx({ coinId }),
            coinModel.coinSubModel.getCoinMarketChartByIdFx({ coinId })
        ]);
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Header sticky />
            <Container>
                {coinIsEmpty && !coinDataIsLoading ? (
                    <Text h5 css={{ textAlign: 'center', mt: '$6' }}>
                        Монета не найдена, попробуйте перезагрузить страницу.
                    </Text>
                ) : (
                    <>
                        {coinDataIsLoading && (
                            <Grid.Container justify="center" gap={5}>
                                <Grid>
                                    <Loading type="spinner" size="xl" />
                                </Grid>
                            </Grid.Container>
                        )}
                        {!coinDataIsLoading && (
                            <>
                                <CommonPageHeader headerText={`Монета ${coin.name}`} />
                                <div className={styles.wrapper}>
                                    <CoinPageCard
                                        coin={coin}
                                        favoriteCoinComponent={<FavoriteCoin coinId={coin.id} />}
                                    />
                                    {preparedPrices?.length ? (
                                        <div className={styles.chart}>
                                            <PriceChart
                                                data={preparedPrices}
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
                            </>
                        )}
                    </>
                )}
            </Container>
        </>
    );
};
export default CoinPage;
