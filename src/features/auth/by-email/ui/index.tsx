import React, { FunctionComponent, MouseEventHandler } from 'react';
import { Button, Input, Modal, Text } from '@nextui-org/react';
import { Mail } from '../../../../shared/ui/icons/Mail';
import { Password } from '../../../../shared/ui/icons/Password';
import { useFormik } from 'formik';

export interface AuthModalByEmailParams {
    isOpen: boolean;
    onClose(): void;
}

export const AuthModalByEmail: FunctionComponent<AuthModalByEmailParams> = ({ isOpen, onClose }) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        }
    });

    const handleAuthClick = () => {
        console.debug('click');
    };
    return (
        <Modal closeButton aria-labelledby="modal-title" open={isOpen} onClose={onClose}>
            <Modal.Header>
                <Text id="modal-title" size={18}>
                    <Text size={18}>Вхождение старого бро</Text>
                    <Text b size={18}>
                        Cryptolight
                    </Text>
                </Text>
            </Modal.Header>
            <Modal.Body>
                <Input
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Email"
                    contentLeft={<Mail fill="currentColor" />}
                />
                <Input
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Password"
                    contentLeft={<Password fill="currentColor" />}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button auto flat color="error" onClick={onClose}>
                    Закрыть
                </Button>
                <Button auto onClick={handleAuthClick}>
                    Войти
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
