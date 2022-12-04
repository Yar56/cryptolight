import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';

export interface SignUpUserParams {
    email: string;
    password: string;
}
// todo это сущность
export const signUpUser = ({ email, password }: SignUpUserParams) =>
    createUserWithEmailAndPassword(auth, email, password);

export const signInUser = ({ email, password }: SignUpUserParams) => signInWithEmailAndPassword(auth, email, password);
