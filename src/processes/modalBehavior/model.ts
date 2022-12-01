import { createEvent, createStore } from 'effector';

export enum ModalType {
    REGISTRATION = 'REGISTRATION',
    AUTH = 'AUTH'
}

interface SwitchModalPayload {
    modalType: ModalType;
    isOpen: boolean;
}
export const switchModal = createEvent<SwitchModalPayload>();

interface ModalStateByType {
    [ModalType.AUTH]?: boolean;
    [ModalType.REGISTRATION]?: boolean;
}
export const modalInitialState: ModalStateByType = { [ModalType.REGISTRATION]: false, [ModalType.AUTH]: false };

export const $modalState = createStore(modalInitialState).on(switchModal, (state, payload) => {
    const { modalType, isOpen } = payload;
    return { [modalType]: isOpen };
});

export const events = { switchModal };
