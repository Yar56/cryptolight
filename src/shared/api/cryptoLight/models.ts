export interface User {
    displayName: string;
    email: string;
    expiresIn: string;
    idToken: string;
    kind: string;
    localId: string; //this is uid in firebase
    refreshToken: string;
    registered: boolean;
}

export interface AuthStateChangesResponse {
    kind: string;
    users: User[];
}

// User from AuthStateChangesResponse['users']
// {
//     "localId": string,
//     "email": string,
//     "passwordHash": string,
//     "emailVerified": boolean,
//     "passwordUpdatedAt": number,
//     "providerUserInfo": [
//         {
//             "providerId": string,
//             "federatedId": string,
//             "email": string,
//             "rawId": string
//         }
//     ],
//     "validSince": string,
//     "disabled": boolean,
//     "lastLoginAt": string,
//     "createdAt": string,
//     "lastRefreshAt": string
// }

export type FavoritedCoinsMap = Record<string, Record<string, boolean>>;
