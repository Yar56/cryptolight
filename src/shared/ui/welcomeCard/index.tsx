import React, { FunctionComponent } from 'react';
import { Button, Card, Row, Text } from '@nextui-org/react';

export const WelcomeCard: FunctionComponent = () => {
    return (
        <Card css={{ $$cardColor: '$colors$primary' }} isPressable>
            <Card.Header>Это Welcome Card</Card.Header>
            <Card.Body>
                <Row justify="center" align="center">
                    <Text h6 size={15} color="black" css={{ m: 0 }}>
                        NextUI gives you the best developer experience with all the features you need for building
                        beautiful and modern websites and applications.
                    </Text>
                </Row>
                <Row justify="flex-start" align="center" css={{ mt: 10 }}>
                    <Button color="success" auto>
                        Invest Today
                    </Button>
                </Row>
            </Card.Body>
        </Card>
    );
};
