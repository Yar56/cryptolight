import { Spacer, Text } from '@nextui-org/react';
import React from 'react';

import { sharedUiComponents } from '~/shared/ui';
const { BackButton } = sharedUiComponents;

interface CommonPageHeaderProps {
    headerText: string;
}
export const CommonPageHeader: FunctionComponent<CommonPageHeaderProps> = ({ headerText }) => {
    return (
        <>
            <Spacer y={1} />
            <BackButton />
            <Spacer y={1} />
            <Text h3 css={{ m: 0, ml: 10 }}>
                {headerText}
            </Text>
            <Spacer y={1} />
        </>
    );
};
