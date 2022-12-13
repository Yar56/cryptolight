import React, { FunctionComponent, useEffect } from 'react';
import * as likeCoinModel from '../../model';
import { ReactComponent as Like } from './icons/like.svg';
import { ReactComponent as ActiveLike } from './icons/activeLike.svg';
import styles from './styles.module.css';
import { userModel } from '~/entities/user';
import { setDoc } from 'firebase/firestore';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { docRefUserLikedCoins } from '~/shared/config/firebase';
import { events, ModalType } from '~/processes/modalBehavior';

interface LikeCoinProps {
    coinId: number;
}

export const LikeCoin: FunctionComponent<LikeCoinProps> = ({ coinId }) => {
    const { user } = userModel.useUser();
    const isLike = likeCoinModel.useLikeCoin({ coinId });
    const likedCoinsMap = likeCoinModel.selectors.useLikedCoins();

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
            events.switchModal({ modalType: ModalType.AUTH, isOpen: true });
            return;
        }
        likeCoinModel.events.likeCoin(coinId);
    };

    return (
        <div className={styles.like} onClick={handleChange}>
            {isLike ? <ActiveLike /> : <Like />}
        </div>
    );
};
