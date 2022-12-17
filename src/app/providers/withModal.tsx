import { useStore } from 'effector-react';
import React from 'react';

import { AuthModalByEmail } from '~/features/auth/by-email';
import { RegistrationModalByEmail } from '~/features/registration/by-email';

import { $modalState, events, ModalType } from '~/processes/modalBehavior';

// eslint-disable-next-line react/display-name
export const withModal = (component: () => React.ReactNode) => () => {
    const { REGISTRATION, AUTH } = useStore($modalState);

    const handleCloseRegistrationModal = () => events.switchModal({ modalType: ModalType.REGISTRATION, isOpen: false });
    const handleCloseAuthModal = () => events.switchModal({ modalType: ModalType.AUTH, isOpen: false });

    return (
        <div>
            {component()}
            <>
                <AuthModalByEmail isOpen={Boolean(AUTH)} onClose={handleCloseAuthModal} />
                <RegistrationModalByEmail isOpen={Boolean(REGISTRATION)} onClose={handleCloseRegistrationModal} />
            </>
        </div>
    );
};
