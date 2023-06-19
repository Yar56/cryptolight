import { Tooltip } from '@nextui-org/react';
import { SimpleColors } from '@nextui-org/react/types/utils/prop-types';
import { setDoc } from 'firebase/firestore';
import React, { FunctionComponent, useEffect } from 'react';

import classNames from '~/shared/aliases/classNames';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { docRefUserLikedCoins } from '~/shared/config/firebase';

import { userModel } from '~/entities/user';

import * as likeCoinModel from '../../model';

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

    useEffect(() => {
        if (Object.keys(likedCoinsMap).length === 0) {
            return;
        }
        const data = {
            [`${user?.uid}`]: { ...likedCoinsMap }
        };

        (async () => {
            try {
                await setDoc(docRefUserLikedCoins, data);
                console.log('This value has been written to the database: ', docRefUserLikedCoins.id);
            } catch (error) {
                console.error('Error: ', error);
            }
        })();
    }, [likedCoinsMap]);

    const handleChange = async (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        const userId = user?.uid;
        if (!userId) {
            return;
        }
        likeCoinModel.events.setFavoriteCoin(coinId);
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
