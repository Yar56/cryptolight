import { Container, Grid, Loading, Text } from '@nextui-org/react';
import { useStore } from 'effector-react';
import { uniqueId } from 'lodash';
import React, { useEffect } from 'react';

import { coinUi, coinModel } from '~/entities/coin';
import { userModel } from '~/entities/user';
const { CoinListCard, CoinListByGlobalTrendsCard } = coinUi;
const { coinListSubModel, coinListByGlobalTrendsSubModel } = coinModel;

import { EventType, useListType } from '~/features/coinSwitch/model';
import { CoinSwitch } from '~/features/coinSwitch/ui';
import { FavoriteCoin, favoriteCoinModel } from '~/features/favoriteCoin';

import { Header } from '~/widgets/header';
import { WelcomeCard } from '~/widgets/welcomeCard';

const TrendingCoinsPage = () => {
    const { user } = userModel.selectors.useUser();
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
        if (!user) {
            console.log('user is undefined, skip getFavoriteUserCoinsFx');
            return;
        }
        favoriteCoinModel.getFavoriteUserCoinsFx({ userId: user.localId });
    }, [user]);

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
                            <Grid.Container gap={1} justify="flex-start">
                                <>
                                    {isLoading && <Loading type="spinner" size="lg" />}
                                    {!isLoading &&
                                        coinList.map((coin) => {
                                            return (
                                                <Grid xs={12} sm={6} md={4} key={uniqueId()}>
                                                    <CoinListCard
                                                        coin={coin}
                                                        likeComponent={<FavoriteCoin coinId={coin.item.id} />}
                                                    />
                                                </Grid>
                                            );
                                        })}
                                </>
                            </Grid.Container>
                        ) : (
                            <Grid.Container gap={1} justify="center">
                                {coinsByGlobal.map((anotherCoin) => {
                                    return (
                                        <Grid xs={12} sm={6} md={4} key={uniqueId()}>
                                            <CoinListByGlobalTrendsCard coin={anotherCoin} />
                                        </Grid>
                                    );
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
