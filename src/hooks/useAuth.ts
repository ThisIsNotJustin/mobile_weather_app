import React, { useEffect} from 'react';
import { getAuth, onAuthStateChanged, User, signInWithEmailAndPassword,
    createUserWithEmailAndPassword, signOut
 } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../config/firebase';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function useAuth() {
    const [user, setUser] = React.useState<User>()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(undefined);
            }
        });

        return unsubscribe;
    }, []);

    const signIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signUp = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        return signOut(auth);
    };

    return { user, signIn, signUp, logOut };
}