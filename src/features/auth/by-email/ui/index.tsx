import { FirebaseError } from '@firebase/util';
import { Button, Input, Modal, Text } from '@nextui-org/react';
import { AuthErrorCodes } from 'firebase/auth';
import { useFormik } from 'formik';
import React, { FunctionComponent, useReducer, useState } from 'react';
import * as yup from 'yup';

import { Mail } from '~/shared/ui/icons/Mail';
import { Password } from '~/shared/ui/icons/Password';

import { ModalByEmailParams } from '~/features/commonModalTypes';

import { signInUserFx } from '../model';

import styles from './styles.module.css';

export type AuthModalByEmailParams = ModalByEmailParams;

const initialState = { isOpenAuth: false };

enum ActionKind {
    OPEN_AUTH = 'OPEN_AUTH'
}

interface Action {
    type: ActionKind;
    payload: boolean;
}

interface State {
    isOpenAuth: boolean;
}
const reducer = (state: State, action: Action): State => {
    const { type, payload } = action;
    switch (type) {
        case ActionKind.OPEN_AUTH:
            return { ...state, isOpenAuth: payload };
        default:
            throw new Error('action.type = undefined');
    }
};

type Reducer<S, A> = (prevState: S, action: A) => S;

const schema = yup.object().shape({
    email: yup.string().email('Email некорректен').required('Заполните поле с email'),
    password: yup.string().required('Заполните поле с паролем').min(8, 'Пароль слишком короткий - минимум 8 символов')
});
export const AuthModalByEmail: FunctionComponent<AuthModalByEmailParams> = ({ children }) => {
    const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, initialState);
    const handleOpenAuth = () => dispatch({ type: ActionKind.OPEN_AUTH, payload: true });
    const closeModal = () => {
        dispatch({ type: ActionKind.OPEN_AUTH, payload: false });
    };

    const handleClose = () => {
        closeModal();
        formik.resetForm();
    };

    const [apiError, setApiError] = useState<string>('');
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: schema,
        onSubmit: async (values, { resetForm }) => {
            const { email, password } = values;

            try {
                await signInUserFx({ email, password });
                handleClose();
            } catch (error) {
                const typedError = error as FirebaseError;
                if (typedError.code === AuthErrorCodes.EMAIL_EXISTS) {
                    setApiError('Такой email уже существует!');
                } else if (typedError.code === AuthErrorCodes.INVALID_PASSWORD) {
                    setApiError('Неверный пароль');
                } else if (typedError.code === AuthErrorCodes.USER_DELETED) {
                    setApiError('Такого email не существует');
                } else {
                    setApiError('Непредвиденная ошибка!');
                    console.error('Unknown Error', error);
                }
            } finally {
                resetForm();
            }
        }
    });

    return (
        <>
            {children({
                openModal: () => {
                    handleOpenAuth();
                }
            })}
            <Modal blur closeButton aria-labelledby="modal-title" open={state.isOpenAuth} onClose={handleClose}>
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        <Text size={18}>Вхождение старого бро</Text>
                        <Text b size={18}>
                            Cryptolight
                        </Text>
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit}>
                        <Input
                            clearable
                            bordered
                            fullWidth
                            color={formik.errors.email ? 'error' : 'primary'}
                            size="lg"
                            placeholder="Email"
                            id="email"
                            name="email"
                            type="text"
                            disabled={formik.isSubmitting}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            contentLeft={<Mail fill="currentColor" />}
                            aria-label="Email"
                        />
                        <div className={styles.errorText}>{formik.errors.email}</div>
                        <Input
                            clearable
                            bordered
                            fullWidth
                            color={formik.errors.password ? 'error' : 'primary'}
                            size="lg"
                            id="password"
                            name="password"
                            type="password"
                            disabled={formik.isSubmitting}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            placeholder="Password"
                            contentLeft={<Password fill="currentColor" />}
                            aria-label="Password"
                        />
                        <div className={styles.errorText}>{formik.errors.password}</div>
                        {apiError && !formik.dirty && formik.isValid && (
                            <div className={styles.errorText}>{apiError}</div>
                        )}
                        <Modal.Footer css={{ pr: '0px' }}>
                            <Button auto flat color="error" onClick={handleClose}>
                                Закрыть
                            </Button>
                            <Button auto type="submit">
                                Вход
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};
