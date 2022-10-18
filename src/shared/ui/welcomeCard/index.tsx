import React, { FunctionComponent } from 'react';
import { Button, Card, Row, Text } from '@nextui-org/react';
import styles from 'styles.module.css';

export const WelcomeCard: FunctionComponent = () => {
    const user = 'Alex';

    return (
        <Card css={{ $$cardColor: '$colors$primary', color: '#fff' }}>
            <Card.Header className={styles.header}>Привет {user}</Card.Header>
            <Card.Body css={{ pt: '$0' }}>
                <Row justify="flex-start" align="center">
                    <Text h6 size={15} color="white" css={{ m: 0 }}>
                        Сделайте свои первые инвестиции уже сегодня
                    </Text>
                </Row>
                <Row justify="flex-start" align="center" css={{ mt: 10 }}>
                    <Button auto className={styles.button}>
                        Войти
                    </Button>
                </Row>
            </Card.Body>
        </Card>
    );
};
