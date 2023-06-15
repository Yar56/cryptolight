import { Card, Container, Grid, Text } from '@nextui-org/react';
import React from 'react';

import BackButton from '~/shared/ui/components/backButton/BackButton';

import { Header } from '~/widgets/header';

const ProfilePage = () => {
    const MockItem = ({ text }) => {
        return (
            <Card css={{ h: '$24', $$cardColor: '$colors$primary' }}>
                <Card.Body>
                    <Text h6 size={15} color="white" css={{ mt: 0 }}>
                        {text}
                    </Text>
                </Card.Body>
            </Card>
        );
    };
    return (
        <div>
            <Header sticky />
            <Container>
                <BackButton />
                <Grid.Container gap={2} justify="center">
                    <Grid xs={4}>
                        <MockItem text="1 of 3" />
                    </Grid>
                    <Grid xs={4}>
                        <MockItem text="2 of 3" />
                    </Grid>
                    <Grid xs={4}>
                        <MockItem text="3 of 3" />
                    </Grid>
                    <Grid xs={4}>
                        <MockItem text="3 of 3" />
                    </Grid>
                    <Grid xs={4}>
                        <MockItem text="3 of 3" />
                    </Grid>
                </Grid.Container>
            </Container>
        </div>
    );
};

export default ProfilePage;
