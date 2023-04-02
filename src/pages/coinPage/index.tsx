import { Avatar, Container } from '@nextui-org/react';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getCoinById } from '~/shared/api/coingecko/coins';

import { LikeCoin } from '~/features/likeCoin';

import { Header } from '~/widgets/header';

import styles from './styles.module.scss';

const CoinPage: FunctionComponent = () => {
    const { coinId } = useParams<{ coinId: string }>();
    const [state, setState] = useState<unknown>();

    useEffect(() => {
        getCoinById({ coinId }).then((res) => {
            console.log(res);
            setState(res?.data);
        });
    }, []);

    return (
        <div>
            <Header sticky />
            <Container>
                <Link to="/">
                    <br />
                    назад
                </Link>
                <Avatar squared src={state?.image?.small} />
                <div className={styles.likeWrapper}>
                    <LikeCoin coinId={2} />
                </div>
            </Container>
        </div>
    );
};
export default CoinPage;
