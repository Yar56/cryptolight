import { Modal, Button, Text, Input } from '@nextui-org/react';
import { useFormik } from 'formik';
import React, { FunctionComponent, useReducer, useState } from 'react';
import * as yup from 'yup';

import { cryptoLightApi } from '~/shared/api';
import { commonModalTypes } from '~/shared/types';
import { Mail } from '~/shared/ui/icons/Mail';
import { Password } from '~/shared/ui/icons/Password';

import { signUpUserFx } from '~/entities/user/model';

import styles from './RegistrationModalByEmail.module.css';

export type RegistrationModalByEmailParams = commonModalTypes.ModalByEmailParams;
const errorMessages = cryptoLightApi.models.AuthErrorMessages;

const initialState = { isOpenRegistration: false };

enum ActionKind {
    OPEN_REGISTRATION = 'OPEN_REGISTRATION'
}

interface Action {
    type: ActionKind;
    payload: boolean;
}

interface State {
    isOpenRegistration: boolean;
}
const reducer = (state: State, action: Action): State => {
    const { type, payload } = action;
    switch (type) {
        case ActionKind.OPEN_REGISTRATION:
            return { ...state, isOpenRegistration: payload };
        default:
            throw new Error('action.type = undefined');
    }
};

type Reducer<S, A> = (prevState: S, action: A) => S;

const schema = yup.object().shape({
    email: yup.string().email('Email некорректен').required('Заполните поле с email'),
    password: yup.string().required('Заполните поле с паролем').min(8, 'Пароль слишком короткий - минимум 8 символов'),
    confirmPassword: yup
        .string()
        .required('Подтвердите пароль')
        .oneOf([yup.ref('password'), null], 'Пароли должны совподать')
});

export const RegistrationModalByEmail: FunctionComponent<RegistrationModalByEmailParams> = ({ children }) => {
    const [apiError, setApiError] = useState<string>('');
    const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, initialState);
    const handleOpenRegistration = () => dispatch({ type: ActionKind.OPEN_REGISTRATION, payload: true });
    const closeModal = () => {
        dispatch({ type: ActionKind.OPEN_REGISTRATION, payload: false });
    };
    const handleClose = () => {
        closeModal();
        formik.resetForm();
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: schema,
        onSubmit: async (values, { resetForm }) => {
            const { email, password } = values;

            try {
                await signUpUserFx({ email, password });
                handleClose();
            } catch (error) {
                const typedError = error as cryptoLightApi.models.FirebaseError;

                if (typedError.message === errorMessages.EMAIL_EXISTS) {
                    setApiError('Такой email уже существует!');
                } else if (typedError.message === errorMessages.OPERATION_NOT_ALLOWED) {
                    setApiError('Вход с паролем отключен для этого проекта. Обратитесь в поддержку');
                } else if (typedError.message === errorMessages.TOO_MANY_ATTEMPTS_TRY_LATER) {
                    setApiError('Слишком много попыток, попробуйте позже');
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
                    handleOpenRegistration();
                }
            })}
            <Modal closeButton blur aria-labelledby="modal-title" open={state.isOpenRegistration} onClose={handleClose}>
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        <Text>Регистрация нового бро</Text>
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
                            id="email"
                            name="email"
                            type="text"
                            disabled={formik.isSubmitting}
                            value={formik.values.email}
                            color={formik.errors.email ? 'error' : 'primary'}
                            size="lg"
                            placeholder="Email"
                            onChange={formik.handleChange}
                            contentLeft={<Mail fill="currentColor" />}
                            aria-label="Email"
                        />
                        <div className={styles.errorText}>{formik.errors.email}</div>
                        <Input
                            clearable
                            bordered
                            fullWidth
                            id="password"
                            name="password"
                            type="password"
                            disabled={formik.isSubmitting}
                            value={formik.values.password}
                            color={formik.errors.password ? 'error' : 'primary'}
                            size="lg"
                            placeholder="Password"
                            onChange={formik.handleChange}
                            contentLeft={<Password fill="currentColor" />}
                            aria-label="Password"
                        />
                        <div className={styles.errorText}>{formik.errors.password}</div>
                        <Input
                            clearable
                            bordered
                            fullWidth
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            disabled={formik.isSubmitting}
                            value={formik.values.confirmPassword}
                            color={formik.errors.confirmPassword ? 'error' : 'primary'}
                            size="lg"
                            placeholder="Confirm Password"
                            onChange={formik.handleChange}
                            contentLeft={<Password fill="currentColor" />}
                            aria-label="confirmPassword"
                        />
                        <div className={styles.errorText}>{formik.errors.confirmPassword}</div>
                        <div className={styles.errorText}>{apiError}</div>
                        <Modal.Footer css={{ pr: '0px' }}>
                            <Button auto flat color="error" onPress={handleClose}>
                                Закрыть
                            </Button>
                            <Button
                                auto
                                type="submit"
                                color="success"
                                disabled={formik.isSubmitting || !formik.isValid}
                            >
                                Зарегистрироваться
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};
