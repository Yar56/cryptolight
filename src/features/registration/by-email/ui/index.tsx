import React, { FunctionComponent } from 'react';
import { Modal, Button, Text, Input, Row, Spacer } from '@nextui-org/react';
import { Mail } from '../../../../shared/ui/icons/Mail';
import { Password } from '../../../../shared/ui/icons/Password';
import { useFormik } from 'formik';
import { signUpUserFx } from '../model';
import styles from './styles.module.css';

export interface AuthModalByEmailParams {
    isOpen: boolean;
    onClose(): void;
}

export const RegistrationModalByEmail: FunctionComponent<AuthModalByEmailParams> = ({ isOpen, onClose }) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validate: (values) => {
            console.log(values);
            const errors: { email: string; password: string; confirmPassword: string } = {
                email: '',
                password: '',
                confirmPassword: ''
            };
            const { email, password, confirmPassword } = values;
            if (!email) {
                errors.email = 'Заполните поле с email';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
                errors.email = 'Email некорректен';
            } else if (!password) {
                errors.password = 'Заполните поле с паролем';
            } else if (!confirmPassword) {
                errors.confirmPassword = 'Подтвердите пароль';
            } else if (password !== confirmPassword) {
                errors.confirmPassword = 'Пароли не совподают';
            }
            console.log(errors);
            return errors;
        },
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
        }
    });
    console.log({ dirty: formik.dirty, isValid: formik.isValid });
    return (
        <Modal closeButton aria-labelledby="modal-title" open={isOpen} onClose={onClose}>
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
                        value={formik.values.email}
                        color={formik.errors.email ? 'error' : 'primary'}
                        size="lg"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        contentLeft={<Mail fill="currentColor" />}
                        // helperText={formik.errors.email}
                        // label={formik.errors.email}
                    />
                    <div className={styles.errorText}>{formik.errors.email}</div>
                    {/*<Spacer y={1} />*/}
                    <Input
                        clearable
                        bordered
                        fullWidth
                        id="password"
                        value={formik.values.password}
                        color={formik.errors.password ? 'error' : 'primary'}
                        size="lg"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        contentLeft={<Password fill="currentColor" />}
                        // helperText={formik.errors.password}
                    />
                    <div className={styles.errorText}>{formik.errors.password}</div>
                    {/*<Spacer y={1} />*/}
                    <Input
                        clearable
                        bordered
                        fullWidth
                        id="confirmPassword"
                        value={formik.values.confirmPassword}
                        color={formik.errors.confirmPassword ? 'error' : 'primary'}
                        size="lg"
                        placeholder="Confirm Password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        contentLeft={<Password fill="currentColor" />}
                        // helperText={formik.errors.confirmPassword}
                    />
                    <div className={styles.errorText}>{formik.errors.confirmPassword}</div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button auto flat color="error" onClick={onClose}>
                    Закрыть
                </Button>
                <Button auto color="success" onClick={onClose} disabled={formik.isSubmitting || !formik.isValid}>
                    Зарегистрироваться
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
