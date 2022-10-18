import React, { FunctionComponent } from 'react';
import * as likeCoinModel from '../../model';
import Like from './icons/like.svg';
import ActiveLike from './icons/activeLike.svg';
import styles from 'styles.module.css';
interface LikeCoinProps {
    coinId: number;
}

export const LikeCoin: FunctionComponent<LikeCoinProps> = ({ coinId }) => {
    const isLike = likeCoinModel.useLikeCoin(coinId);

    const handleChange = () => likeCoinModel.events.likeCoin(coinId);

    return (
        <div className={styles.like} onClick={handleChange}>
            {isLike ? <ActiveLike /> : <Like />}
        </div>
    );
};
