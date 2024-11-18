import { Platform } from 'react-native';
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../config/firebase';
import { AuthUser, IAuthService } from './authTypes';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const mapUser = (user: any): AuthUser => ({
    uid: user.uid,
    email: user.email,
});

export const authService: IAuthService = {
    signIn: async (email: string, password: string) => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return { user: mapUser(result.user) };
    },
    signUp: async (email: string, password: string) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        return { user: mapUser(result.user) };
    },
    logOut: () => signOut(auth),
    onAuthStateChanged: (callback: (user: AuthUser | null) => void) => 
        onAuthStateChanged(auth, (user) => callback(user ? mapUser(user) : null))
};