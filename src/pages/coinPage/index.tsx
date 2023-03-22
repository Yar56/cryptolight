import React, { FunctionComponent, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getCoinById } from '~/shared/api/coingecko/coins';

const CoinPage: FunctionComponent = () => {
    useEffect(() => {
        getCoinById().then((res) => {
            console.log(res);
        });
    }, []);
    return (
        <div>
            CoinPage
            <Link to="/">main</Link>
        </div>
    );
};
export default CoinPage;
