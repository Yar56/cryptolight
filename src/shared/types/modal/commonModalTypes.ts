interface Callback {
    openModal(): void;
}

export interface ModalByEmailParams {
    children({ openModal }: Callback): JSX.Element;
}
