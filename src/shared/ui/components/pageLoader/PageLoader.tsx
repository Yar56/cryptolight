import { Grid, Loading } from '@nextui-org/react';
import React from 'react';

const PageLoader = () => {
    return (
        <Grid.Container gap={10} justify="center">
            <Grid>
                <Loading type="default" />
            </Grid>
        </Grid.Container>
    );
};

export default PageLoader;
