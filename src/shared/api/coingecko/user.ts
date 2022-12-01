import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';

export interface SignUpUserParams {
    email: string;
    password: string;
}

export const signUpUser = ({ email, password }: SignUpUserParams) =>
    createUserWithEmailAndPassword(auth, email, password);
