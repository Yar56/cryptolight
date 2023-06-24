import { Card, Container, Grid, Spacer, Text } from '@nextui-org/react';
import React from 'react';

import BackButton from '~/shared/ui/components/backButton/BackButton';
import CommonPageHeader from '~/shared/ui/components/commonPageHeader/CommonPageHeader';

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
                <CommonPageHeader headerText="Мои монеты" />
                <Grid.Container gap={2} justify="center">
                    <Grid xs={12} sm={4}>
                        <MockItem text="1 of 3" />
                    </Grid>
                    <Grid xs={12} sm={4}>
                        <MockItem text="2 of 3" />
                    </Grid>
                    <Grid xs={12} sm={4}>
                        <MockItem text="3 of 3" />
                    </Grid>
                    <Grid xs={12} sm={4}>
                        <MockItem text="3 of 3" />
                    </Grid>
                    <Grid xs={12} sm={4}>
                        <MockItem text="3 of 3" />
                    </Grid>
                </Grid.Container>
            </Container>
        </div>
    );
};

export default ProfilePage;
