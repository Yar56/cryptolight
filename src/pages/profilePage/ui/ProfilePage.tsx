import { Container, Grid, Text } from '@nextui-org/react';
import { uniqueId } from 'lodash';
import React, { useMemo } from 'react';

import { sharedUiComponents } from '~/shared/ui';

const { CommonPageHeader } = sharedUiComponents;
import { coinModel, coinUi } from '~/entities/coin';

import { FavoriteCoin } from '~/features/favoriteCoin';
import { favoriteCoinModel } from '~/features/favoriteCoin';

import { Header } from '~/widgets/header';

const { CoinListCard } = coinUi;

export const ProfilePage: FunctionComponent = () => {
    const likedCoinsIds = favoriteCoinModel.selectors.useFavoritedCoinsIds();
    const coinList = coinModel.coinListSubModel.selectors.useCoinList();

    const favoriteCoins = useMemo(() => {
        return coinList.filter((coin) => likedCoinsIds.includes(coin.item.id));
    }, []);

    return (
        <div>
            <Header sticky />
            <Container>
                <CommonPageHeader headerText="Мои монеты" />
                <Grid.Container gap={1} justify="flex-start">
                    {favoriteCoins.length === 0 ? (
                        <Text h5 css={{ textAlign: 'center', mt: '$6' }}>
                            Список любимых монет пуст, попробуйте перезагрузить страницу
                        </Text>
                    ) : (
                        <>
                            {favoriteCoins.map((coin) => {
                                return (
                                    <Grid xs={12} sm={4} key={uniqueId()}>
                                        <CoinListCard
                                            coin={coin}
                                            likeComponent={<FavoriteCoin coinId={coin.item.id} />}
                                        />
                                    </Grid>
                                );
                            })}
                        </>
                    )}
                </Grid.Container>
            </Container>
        </div>
    );
};
