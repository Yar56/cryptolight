import React, { FunctionComponent } from 'react';
import { Button, Card, Row, Text } from '@nextui-org/react';
import styles from './styles.module.css';
import { events, ModalType } from '~/processes/modalBehavior';
import { userModel } from '~/entities/user';

export const WelcomeCard: FunctionComponent = () => {
    const handleAuthClick = () => events.switchModal({ modalType: ModalType.AUTH, isOpen: true });
    const handleRegistrationClick = () => events.switchModal({ modalType: ModalType.REGISTRATION, isOpen: true });
    const isUserAuth = userModel.selectors.useIsUserAuth();
    const { user } = userModel.selectors.useUser();

    return (
        <Card css={{ $$cardColor: '$colors$primary', color: '#fff' }}>
            <Card.Header className={styles.header}>Привет {isUserAuth ? user?.email : 'незнакомец'}</Card.Header>
            <Card.Body css={{ pt: '$0' }}>
                <Row justify="flex-start" align="center">
                    <Text h6 size={15} color="white" css={{ m: 0 }}>
                        Сделайте свои первые инвестиции уже сегодня
                    </Text>
                </Row>
                <Row justify="flex-start" align="center" css={{ mt: 10 }}>
                    {isUserAuth ? (
                        <Button color="success" auto onClick={handleAuthClick}>
                            Мои монеты
                        </Button>
                    ) : (
                        <>
                            {' '}
                            <Button auto className={styles.button} onClick={handleAuthClick}>
                                Вход
                            </Button>
                            <Button auto color="success" onClick={handleRegistrationClick}>
                                Регистрация
                            </Button>
                        </>
                    )}
                </Row>
            </Card.Body>
        </Card>
    );
};
