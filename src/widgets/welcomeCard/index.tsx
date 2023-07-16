import { Button, Card, Row, Text } from '@nextui-org/react';
import React, { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import { userModel } from '~/entities/user';

import { AuthModalByEmail } from '~/features/auth/by-email';
import { RegistrationModalByEmail } from '~/features/registration/by-email';

import styles from './styles.module.css';

export const WelcomeCard: FunctionComponent = () => {
    const navigate = useNavigate();
    const isUserAuth = userModel.selectors.useIsUserAuth();
    const { user } = userModel.selectors.useUser();
    const handleCoinsClick = () => navigate('/profile');

    return (
        <Card css={{ $$cardColor: '$colors$primary', color: '#fff', maxW: '590px' }}>
            <Card.Header className={styles.header}>Привет {isUserAuth ? user?.email : 'незнакомец'}</Card.Header>
            <Card.Body css={{ pt: '$0' }}>
                <Row justify="flex-start" align="center">
                    <Text h6 size={15} color="white" css={{ m: 0 }}>
                        Сделайте свои первые инвестиции уже сегодня
                    </Text>
                </Row>
                <Row justify="flex-start" align="center" css={{ mt: 10 }}>
                    {isUserAuth ? (
                        <Button color="success" auto onClick={handleCoinsClick}>
                            Мои монеты
                        </Button>
                    ) : (
                        <>
                            <AuthModalByEmail>
                                {({ openModal }) => (
                                    <Button auto className={styles.button} onClick={() => openModal()}>
                                        Вход
                                    </Button>
                                )}
                            </AuthModalByEmail>
                            <RegistrationModalByEmail>
                                {({ openModal }) => (
                                    <Button auto color="success" onClick={() => openModal()}>
                                        Регистрация
                                    </Button>
                                )}
                            </RegistrationModalByEmail>
                        </>
                    )}
                </Row>
            </Card.Body>
        </Card>
    );
};
