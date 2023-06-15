import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as GoBackIcon } from './icons/goBackIcon.svg';

const BackButton = () => {
    return (
        <Link to="/">
            <br />
            <GoBackIcon />
        </Link>
    );
};

export default BackButton;
