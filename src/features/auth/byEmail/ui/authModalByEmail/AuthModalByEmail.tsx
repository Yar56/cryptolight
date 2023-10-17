import { Button, Input, Modal, Text } from '@nextui-org/react';
import { useFormik } from 'formik';
import React, { FunctionComponent, useReducer, useState } from 'react';
import * as yup from 'yup';

import { cryptoLightApi } from '~/shared/api';
import { commonModalTypes } from '~/shared/types';
import { sharedUiIcons } from '~/shared/ui';

import { signInUserFx } from '~/entities/user/model';

import styles from './AuthModalByEmail.module.css';

const { Mail, Password } = sharedUiIcons;

export type AuthModalByEmailParams = commonModalTypes.ModalByEmailParams;

const errorMessages = cryptoLightApi.models.AuthErrorMessages;

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
                const typedError = error as cryptoLightApi.models.FirebaseError;
                if (typedError.message === errorMessages.EMAIL_NOT_FOUND) {
                    setApiError('Такого email не существует');
                } else if (typedError.message === errorMessages.INVALID_PASSWORD) {
                    setApiError('Неверный пароль');
                } else if (typedError.message === errorMessages.USER_DISABLED) {
                    setApiError('Юзер был отключен');
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
