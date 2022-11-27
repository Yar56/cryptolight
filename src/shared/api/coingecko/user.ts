import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';

// const auth = getAuth();

export interface SignUpUserParams {
    email: string;
    password: string;
}

export const signUpUser = ({ email, password }: SignUpUserParams) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log({ userCredential, user });
            return user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return error;
            // ..
        });
};
