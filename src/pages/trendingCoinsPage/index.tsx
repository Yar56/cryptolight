import { Container, Grid, Loading, Text } from '@nextui-org/react';
import { useStore } from 'effector-react';
import React, { useEffect } from 'react';

import { coinUi, coinModel } from '~/entities/coin';
const { CoinListCard, CoinListByGlobalTrendsCard } = coinUi;
const { coinListSubModel, coinListByGlobalTrendsSubModel } = coinModel;

import { EventType, useListType } from '~/features/coinSwitch/model';
import { CoinSwitch } from '~/features/coinSwitch/ui';
import { FavoriteCoin, favoriteCoinModel } from '~/features/favoriteCoin';

import { Header } from '~/widgets/header';
import { WelcomeCard } from '~/widgets/welcomeCard';

const TrendingCoinsPage = () => {
    const coinList = useStore(coinListSubModel.$coinList);
    const isLoading = useStore(coinListSubModel.$coinListIsLoading);
    const isEmpty = useStore(coinListSubModel.$coinListIsEmpty);
    const coinsByGlobal = useStore(coinListByGlobalTrendsSubModel.$coinListByGlobal);
    const listType = useListType();

    /**
     * Запрашиваем данные при загрузке страницы
     * @remark Является плохой практикой в мире effector и представлено здесь - лишь для наглядной демонстрации
     * Лучше фетчить через event.pageMounted или reflect
     */

    useEffect(() => {
        coinModel.coinListSubModel.getTrendingCoinsListFx();
    }, []);

    useEffect(() => {
        coinModel.coinListByGlobalTrendsSubModel.getCoinListByGlobalTrendsFx();
    }, []);

    useEffect(() => {
        favoriteCoinModel.getFavoriteUserCoinsFx();
    }, []);

    const isCoinGeckoType = listType === EventType.COIN_GECKO;

    return (
        <>
            <Header sticky />
            <Container css={{ mt: 20 }}>
                <WelcomeCard />
                <CoinSwitch />
                {isEmpty && !isLoading ? (
                    <Text h5 css={{ textAlign: 'center', mt: '$6' }}>
                        Список трендовых монет пуст, попробуйте перезагрузить страницу
                    </Text>
                ) : (
                    <>
                        {isCoinGeckoType ? (
                            <Grid.Container gap={2} justify="center" css={{ mt: 0, pl: 0, pr: 0 }}>
                                <>
                                    {isLoading && <Loading type="spinner" size="lg" />}
                                    {!isLoading &&
                                        coinList.map((coin) => {
                                            return (
                                                <CoinListCard
                                                    key={coin.item.id}
                                                    coin={coin}
                                                    likeComponent={<FavoriteCoin coinId={coin.item.id} />}
                                                />
                                            );
                                        })}
                                </>
                            </Grid.Container>
                        ) : (
                            <Grid.Container gap={2} justify="center" css={{ mt: 0, pl: 0, pr: 0 }}>
                                {coinsByGlobal.map((anotherCoin) => {
                                    return <CoinListByGlobalTrendsCard coin={anotherCoin} key={anotherCoin.id} />;
                                })}
                            </Grid.Container>
                        )}
                    </>
                )}
            </Container>
        </>
    );
};

export default TrendingCoinsPage;
