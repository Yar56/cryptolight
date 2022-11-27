import React from 'react';
import { useStore } from 'effector-react';
import { $modalState, events, ModalType } from '../../processes/modalBehavior';
import { AuthModalByEmail } from '../../features/auth/by-email';
import { RegistrationModalByEmail } from '../../features/registration/by-email';

// eslint-disable-next-line react/display-name
export const withModal = (component: () => React.ReactNode) => () => {
    const { REGISTRATION, AUTH } = useStore($modalState);

    const handleCloseRegistrationModal = () => events.switchModal({ modalType: ModalType.REGISTRATION });
    const handleCloseAuthModal = () => events.switchModal({ modalType: ModalType.AUTH });

    return (
        <div>
            {component()}
            <>
                <AuthModalByEmail isOpen={AUTH} onClose={handleCloseAuthModal} />
                <RegistrationModalByEmail isOpen={REGISTRATION} onClose={handleCloseRegistrationModal} />
            </>
        </div>
    );
};
