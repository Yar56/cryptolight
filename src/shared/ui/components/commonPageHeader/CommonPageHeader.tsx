import { Spacer, Text } from '@nextui-org/react';
import React from 'react';

import BackButton from '~/shared/ui/components/backButton/BackButton';

interface CommonPageHeaderProps {
    headerText: string;
}
const CommonPageHeader: FunctionComponent<CommonPageHeaderProps> = ({ headerText }) => {
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

export default CommonPageHeader;
