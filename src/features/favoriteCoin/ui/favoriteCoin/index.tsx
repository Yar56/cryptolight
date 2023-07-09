import { Tooltip } from '@nextui-org/react';
import { SimpleColors } from '@nextui-org/react/types/utils/prop-types';
import React, { FunctionComponent } from 'react';

import classNames from '~/shared/aliases/classNames';
import { FavoritedCoinsMap } from '~/shared/api/cryptoLight/models';

import { userModel } from '~/entities/user';

import * as likeCoinModel from '../../model';
import { setFavoriteUserCoinsFx } from '../../model';

import { ReactComponent as ActiveLike } from './icons/activelikeIcon.svg';
import { ReactComponent as Like } from './icons/likeIcon.svg';
import styles from './styles.module.css';

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
    const isFavorite = likeCoinModel.useFavoriteCoin({ coinId });
    const likedCoinsMap = likeCoinModel.selectors.useFavoritedCoins();

    const handleChange = async (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        const userId = user?.localId;
        if (!userId) {
            return;
        }
        likeCoinModel.events.setFavoriteCoin(coinId);

        if (Object.keys(likedCoinsMap).length === 0) {
            return;
        }
        const data: FavoritedCoinsMap = {
            [`${user?.localId}`]: { ...likedCoinsMap }
        };
        try {
            await setFavoriteUserCoinsFx(data);
        } catch (error) {
            console.error('Error: ', error);
        }
    };
    const { content, color } = getTooltipText(Boolean(isFavorite), Boolean(user));

    return (
        <Tooltip content={content} color={color}>
            <div
                className={classNames(styles.like, className, { [styles.likeDisabled]: !user })}
                onClick={handleChange}
            >
                {isFavorite ? <ActiveLike /> : <Like />}
            </div>
        </Tooltip>
    );
};
