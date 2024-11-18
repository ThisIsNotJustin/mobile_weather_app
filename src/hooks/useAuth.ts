import React, { useEffect } from 'react';
import { authService } from '../app/services/platform';
import { AuthUser } from '../app/services/authTypes';

export function useAuth() {
    const [user, setUser] = React.useState<AuthUser | null>(null);

    useEffect(() => {
        const unsubscribe = authService.onAuthStateChanged((user) => {
            setUser(user);
        });

        return unsubscribe;
    }, []);

    const signIn = (email: string, password: string) => {
        return authService.signIn(email, password);
    };

    const signUp = (email: string, password: string) => {
        return authService.signUp(email, password);
    };

    const logOut = () => {
        return authService.logOut();
    };

    return { user, signIn, signUp, logOut };
}