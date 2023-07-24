import { Container, Loading, Row } from '@nextui-org/react';
import React, { PropsWithChildren, Suspense } from 'react';

export const SuspenseLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <Suspense
            fallback={
                <Container>
                    <Row justify="center" align="center" css={{ h: 100 }}>
                        <Loading type="spinner" size="xl" />
                    </Row>
                </Container>
            }
        >
            {children}
        </Suspense>
    );
};
