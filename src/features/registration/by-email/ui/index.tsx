import React, { FunctionComponent, useState } from 'react';
import { Modal, Button, Text, Input } from '@nextui-org/react';
import { Mail } from '../../../../shared/ui/icons/Mail';
import { Password } from '../../../../shared/ui/icons/Password';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { signUpUserFx } from '../model';
import styles from './styles.module.css';
import { FirebaseError } from '@firebase/util';
import { AuthErrorCodes } from 'firebase/auth';

export interface AuthModalByEmailParams {
    isOpen: boolean;
    onClose(): void;
}

const schema = yup.object().shape({
    email: yup.string().email('Email некорректен').required('Заполните поле с email'),
    password: yup.string().required('Заполните поле с паролем').min(8, 'Пароль слишком короткий - минимум 8 символов'),
    confirmPassword: yup
        .string()
        .required('Подтвердите пароль')
        .oneOf([yup.ref('password'), null], 'Пароли должны совподать')
});

export const RegistrationModalByEmail: FunctionComponent<AuthModalByEmailParams> = ({ isOpen, onClose }) => {
    const [apiError, setApiError] = useState<string>('');

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
                onClose();
            } catch (error) {
                const typedError = error as FirebaseError;
                if (typedError.code === AuthErrorCodes.EMAIL_EXISTS) {
                    setApiError('Такой email уже существует!');
                } else {
                    setApiError('Непредвиденная ошибка!');
                    console.error('Unknown Error');
                }
            } finally {
                resetForm();
            }
        }
    });
    const handleClose = () => {
        onClose();
        formik.resetForm();
    };

    return (
        <Modal closeButton blur aria-labelledby="modal-title" open={isOpen} onClose={handleClose}>
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
                        <Button auto flat color="error" onPress={onClose}>
                            Закрыть
                        </Button>
                        <Button auto type="submit" color="success" disabled={formik.isSubmitting || !formik.isValid}>
                            Зарегистрироваться
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal.Body>
        </Modal>
    );
};
