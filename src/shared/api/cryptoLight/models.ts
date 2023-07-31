export interface User {
    displayName: string;
    email: string;
    expiresIn: string;
    idToken: string;
    kind: string;
    localId: string; // firebase uid
    refreshToken: string;
    registered: boolean;
}

export interface AuthStateChangesResponse {
    kind: string;
    users: User[];
}

export type FavoritedCoinsMap = Record<string, Record<string, boolean>>;
export type FavoritedCoinsMapResponse = Record<string, boolean>;

export interface FirebaseError {
    code: number;
    message: AuthErrorMessages;
}

export enum AuthErrorMessages {
    // singIn
    EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
    INVALID_PASSWORD = 'INVALID_PASSWORD',
    USER_DISABLED = 'USER_DISABLED',

    // signUp
    EMAIL_EXISTS = 'EMAIL_EXISTS',
    OPERATION_NOT_ALLOWED = 'OPERATION_NOT_ALLOWED',
    TOO_MANY_ATTEMPTS_TRY_LATER = 'TOO_MANY_ATTEMPTS_TRY_LATER'
}
