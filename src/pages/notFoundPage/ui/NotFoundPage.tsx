import { Card, Container, Row, Text } from '@nextui-org/react';
import React from 'react';

export const NotFoundPage: FunctionComponent = () => {
    return (
        <Container>
            <Card css={{ $$cardColor: '$colors$primary', mt: 50 }}>
                <Card.Body>
                    <Row justify="center" align="center">
                        <Text h6 size={15} color="white" css={{ m: 0 }}>
                            Такой страницы не существует!
                        </Text>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};
