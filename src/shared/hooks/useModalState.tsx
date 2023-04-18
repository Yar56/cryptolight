import { Modal } from '@nextui-org/react';
import React, { PropsWithChildren, useState } from 'react';

interface ModalState {
    handleClose: () => void;
    handleOpen: () => void;
    ModalComponent: React.FunctionComponent<React.PropsWithChildren>;
}

export const useModalState = (): ModalState => {
    const [modalState, setModalState] = useState<boolean>(false);

    const handleClose = () => {
        setModalState(false);
    };
    const handleOpen = () => {
        setModalState(true);
    };

    const MenuComponent: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
        return (
            <Modal closeButton aria-labelledby="modal-title" open={modalState} onClose={handleClose}>
                {children}
            </Modal>
        );
    };

    return { handleOpen, handleClose, ModalComponent: MenuComponent };
};
