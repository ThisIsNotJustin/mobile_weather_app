export interface AuthUser {
    uid: string;
    email: string | null;
}

export interface AuthCredential {
    user: AuthUser;
}

export interface IAuthService {
    signIn: (email: string, password: string) => Promise<AuthCredential>;
    signUp: (email: string, password: string) => Promise<AuthCredential>;
    logOut: () => Promise<void>;
    onAuthStateChanged: (callback: (user: AuthUser | null) => void) => () => void;
}