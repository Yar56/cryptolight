import { Tooltip } from '@nextui-org/react';
import { SimpleColors } from '@nextui-org/react/types/utils/prop-types';
import React, { FunctionComponent } from 'react';

import classNames from '~/shared/aliases/classNames';
import { FavoritedCoinsMap } from '~/shared/api/cryptoLight/models';

import { userModel } from '~/entities/user';

import { favoriteCoinModel } from '../index';

import styles from './FavoriteCoin.module.css';
import { ReactComponent as ActiveLike } from './icons/activelikeIcon.svg';
import { ReactComponent as Like } from './icons/likeIcon.svg';

interface FavoriteCoinProps {
    coinId: string;
    className?: string;
}

const getTooltipText = (isFavorite: boolean, isUserExist: boolean): { content: string; color: SimpleColors } => {
    if (!isUserExist) {
        return { content: 'Зарегистрируйтесь или войдите', color: 'error' };
    }

    return {
        content: isFavorite ? 'Убрать из любимых монет' : 'Добавить в любимые монеты',
        color: isFavorite ? 'warning' : 'primary'
    };
};

export const FavoriteCoin: FunctionComponent<FavoriteCoinProps> = ({ coinId, className }) => {
    const { user } = userModel.useUser();
    const isFavorite = favoriteCoinModel.useFavoriteCoin({ coinId });
    const likedCoinsMap = favoriteCoinModel.selectors.useFavoritedCoins();

    const handleChange = (coinId: string) => async (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        const userId = user?.localId;
        if (!userId) {
            return;
        }

        const data: FavoritedCoinsMap = {
            [`${user?.localId}`]: { ...likedCoinsMap, [coinId]: !isFavorite }
        };

        try {
            await favoriteCoinModel.setFavoriteUserCoinsFx(data);
            favoriteCoinModel.events.setFavoriteCoin(coinId);
        } catch (error) {
            console.error('Error: ', error);
        }
    };
    const { content, color } = getTooltipText(Boolean(isFavorite), Boolean(user));

    return (
        <Tooltip content={content} color={color}>
            <div
                className={classNames(styles.like, className, { [styles.likeDisabled]: !user })}
                onClick={handleChange(coinId)}
            >
                {isFavorite ? <ActiveLike /> : <Like />}
            </div>
        </Tooltip>
    );
};
