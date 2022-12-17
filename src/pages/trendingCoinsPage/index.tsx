import { Container, Grid, Loading, Text } from '@nextui-org/react';
import { useStore } from 'effector-react';
import React, { useEffect } from 'react';

import { AnotherCoinCard } from '~/entities/anotherCoin';
import { CoinCard, coinModel } from '~/entities/coin';

import { EventType, useListType } from '~/features/coinSwitch/model';
import { CoinSwitch } from '~/features/coinSwitch/ui';
import { LikeCoin } from '~/features/likeCoin';
import { likeCoinModel } from '~/features/likeCoin';

import Header from '~/widgets/header/ui';
import { WelcomeCard } from '~/widgets/welcomeCard';

const TrendingCoinsPage = () => {
    const coins = useStore(coinModel.$coinsList);
    const isLoading = useStore(coinModel.$coinsListLoading);
    const isEmpty = useStore(coinModel.$coinsListEmpty);
    const anotherCoins = useStore(coinModel.$anotherCoinsList);
    const listType = useListType();

    /**
     * Запрашиваем данные при загрузке страницы
     * @remark Является плохой практикой в мире effector и представлено здесь - лишь для наглядной демонстрации
     * Лучше фетчить через event.pageMounted или reflect
     */

    useEffect(() => {
        coinModel.getTrendingCoinsListFx();
    }, []);

    useEffect(() => {
        coinModel.getAnotherTrendingCoinsListFx();
    }, []);

    useEffect(() => {
        likeCoinModel.getLikedUserCoinsFx();
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
                                        coins.map((coin) => {
                                            return (
                                                <CoinCard
                                                    key={coin.item.id}
                                                    coin={coin}
                                                    badge={<LikeCoin coinId={coin.item.coinId} />}
                                                />
                                            );
                                        })}
                                </>
                            </Grid.Container>
                        ) : (
                            <Grid.Container gap={2} justify="center" css={{ mt: 0, pl: 0, pr: 0 }}>
                                {anotherCoins.map((anotherCoin) => {
                                    return <AnotherCoinCard coin={anotherCoin} key={anotherCoin.id} />;
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
