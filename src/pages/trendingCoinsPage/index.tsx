import React, { useEffect } from 'react';
import { Container, Grid, Loading } from '@nextui-org/react';
import { WelcomeCard } from '../../shared/ui/welcomeCard';
import Header from '../../widgets/header/ui';
import { useStore } from 'effector-react';
import { CoinCard, coinModel } from 'entities/coin';

const TrendingCoinsPage = () => {
    const coins = useStore(coinModel.$coinsList);
    const isLoading = useStore(coinModel.$coinsListLoading);
    // const isEmpty = useStore(coinModel.$coinsListEmpty);

    /**
     * Запрашиваем данные при загрузке страницы
     * @remark Является плохой практикой в мире effector и представлено здесь - лишь для наглядной демонстрации
     * Лучше фетчить через event.pageMounted или reflect
     */
    useEffect(() => coinModel.getTrendingCoinsListFx(), []);

    return (
        <>
            <Header sticky />
            <Container css={{ mt: 20 }}>
                <WelcomeCard />
                <Grid.Container gap={2} justify="center" css={{ mt: 10 }}>
                    <>
                        {isLoading && <Loading type="spinner" size="lg" />}
                        {!isLoading &&
                            coins.map((coin) => {
                                return <CoinCard key={coin.item.id} coin={coin} />;
                            })}
                    </>
                </Grid.Container>
            </Container>
        </>
    );
};

export default TrendingCoinsPage;
