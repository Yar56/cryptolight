import React, { useEffect } from 'react';
import { Container, Grid, Loading, Text } from '@nextui-org/react';
import { WelcomeCard } from '../../shared/ui/welcomeCard';
import Header from '../../widgets/header/ui';
import { useStore } from 'effector-react';
import { CoinCard, coinModel } from 'entities/coin';
import { LikeCoin } from '../../features/likeCoin';
import { CoinSwitch } from 'features/coinSwitch/ui';
import { eventType, useListType } from '../../features/coinSwitch/model';
import { AnotherCoinCard } from '../../entities/anotherCoin';

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
    useEffect(() => coinModel.getTrendingCoinsListFx(), []);
    useEffect(() => coinModel.getAnotherTrendingCoinsListFx(), []);

    // const currentList = listType === eventType.COIN_GECKO ? coins : anotherCoins;

    const isCoinGeckoType = listType === eventType.COIN_GECKO;

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
                                                    badge={<LikeCoin coinId={coin.item.coin_id} />}
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
