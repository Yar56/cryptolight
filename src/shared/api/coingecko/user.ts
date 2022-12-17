import { User } from '@firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { auth } from '~/shared/config/firebase';

export interface SignUpUserParams {
    email: string;
    password: string;
}

export const signUpUser = ({ email, password }: SignUpUserParams) =>
    createUserWithEmailAndPassword(auth, email, password);

export const signInUser = ({ email, password }: SignUpUserParams) => signInWithEmailAndPassword(auth, email, password);

export const signOutUser = () => signOut(auth);

export interface CheckAuthUserParams {
    onCheck(user: User | null): void;
}

export const checkAuthUser = ({ onCheck }: CheckAuthUserParams) => onAuthStateChanged(auth, (user) => onCheck(user));
