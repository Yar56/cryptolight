import { Navbar, Button, Link, Text, Dropdown, Avatar } from '@nextui-org/react';
import React, { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import { cryptoLightApi } from '~/shared/api';
import { clearState } from '~/shared/lib/storage/localStorage';

import { userModel } from '~/entities/user';

import { AuthModalByEmail } from '~/features/auth/byEmail';
import { favoriteCoinModel } from '~/features/favoriteCoin';

import { RouteName } from '~/pages/models';

interface HeaderProps {
    sticky?: boolean;
}

enum DropDownActions {
    PROFILE = 'profile',
    COINS = 'coins',
    LOGOUT = 'logout'
}

export const Header: FunctionComponent<HeaderProps> = ({ sticky: isSticky }) => {
    const isUserAuth = userModel.selectors.useIsUserAuth();
    const { user } = userModel.selectors.useUser();
    const navigate = useNavigate();

    const handleProfileClick = () => navigate(RouteName.PROFILE_PAGE);
    const handleCoinsClick = () => navigate(RouteName.PROFILE_PAGE);

    const handleSignOutClick = async () => {
        try {
            await cryptoLightApi.user.signOutUser({ uid: user?.localId }).then(() => {
                userModel.events.updateUserData(undefined);
                favoriteCoinModel.events.clearFavoriteCoins();
                clearState();
            });
        } catch (error) {
            console.error(error, 'Error while user.signOutUser()');
        }
    };

    const actionByType = {
        [DropDownActions.PROFILE]: handleProfileClick,
        [DropDownActions.COINS]: handleCoinsClick,
        [DropDownActions.LOGOUT]: handleSignOutClick
    };

    const handleDropDownMenuClick = (actionType: DropDownActions) => {
        actionByType[actionType]();
    };

    return (
        <Navbar
            isBordered
            variant={isSticky ? 'sticky' : 'static'}
            containerCss={{ paddingRight: 25, paddingLeft: 25 }}
        >
            <Navbar.Brand>
                <Link
                    color="inherit"
                    href="/"
                    css={{
                        textGradient: 'to right, #121FCF 32%, #CF1512 100%',
                        fontWeight: 600
                    }}
                >
                    CryptoLight
                </Link>
            </Navbar.Brand>
            <Navbar.Content>
                {!isUserAuth && (
                    <Navbar.Item>
                        <AuthModalByEmail>
                            {({ openModal }) => (
                                <Button auto color="gradient" ghost onClick={() => openModal()}>
                                    Вход
                                </Button>
                            )}
                        </AuthModalByEmail>
                    </Navbar.Item>
                )}
                {isUserAuth && (
                    <Dropdown placement="bottom-right">
                        <Navbar.Item>
                            <Dropdown.Trigger>
                                <Avatar
                                    bordered
                                    as="button"
                                    color="primary"
                                    size="md"
                                    src="https://i.pravatar.cc/150"
                                />
                            </Dropdown.Trigger>
                        </Navbar.Item>
                        <Dropdown.Menu
                            aria-label="User menu actions"
                            color="secondary"
                            onAction={(actionKey) => handleDropDownMenuClick(actionKey as DropDownActions)}
                        >
                            <Dropdown.Item key={DropDownActions.PROFILE} css={{ height: '$18' }}>
                                <Text b color="inherit" css={{ d: 'flex' }}>
                                    Signed in as
                                </Text>
                                <Text b color="inherit" css={{ d: 'flex' }}>
                                    {user?.email}
                                </Text>
                            </Dropdown.Item>
                            <Dropdown.Item key={DropDownActions.COINS} withDivider>
                                Мои монеты
                            </Dropdown.Item>
                            <Dropdown.Item withDivider>
                                <Link href="https://www.coingecko.com/en/api" isExternal target="_blank">
                                    CoinGecko API
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item key={DropDownActions.LOGOUT} withDivider color="error">
                                Выход
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                )}
            </Navbar.Content>
        </Navbar>
    );
};
