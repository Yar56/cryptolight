import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as GoBackIcon } from './icons/goBackIcon.svg';

export const BackButton = () => {
    return (
        <Link to="/" style={{ display: 'flex', marginLeft: 10, maxWidth: '70px', justifyContent: 'space-between' }}>
            <GoBackIcon /> <span>Назад</span>
        </Link>
    );
};
