import React from 'react';
import { Link } from 'react-router-dom';

import Header from '~/widgets/header/ui';

const ProfilePage = () => {
    return (
        <div>
            <Header sticky />
            <div>That is a profile page</div>
            <Link to="/">main</Link>
        </div>
    );
};

export default ProfilePage;
