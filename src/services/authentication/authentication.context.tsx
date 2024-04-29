import React, { useState, createContext, ReactNode } from 'react';

import {
    createUserWithEmailAndPassword,
    User,
    onAuthStateChanged,
    signOut,
} from 'firebase/auth';
import { loginRequest } from './authentication.service';
import { auth } from '../../../firebaseConfig';

interface AuthenticationContextProps {
    isLoading: boolean;
    user: User | null;
    error: string | null;
    onLogin: (email: string, password: string) => void;
    onRegister: (
        email: string,
        password: string,
        repeatedPassword: string
    ) => void;
    onLogout: () => void;
    isAuthenticated: boolean;
}

const defaultContext = {
    isLoading: false,
    user: null,
    error: null,
    onLogin: () => {},
    onRegister: () => {},
    onLogout: () => {},
    isAuthenticated: false,
};

export const AuthenticationContext =
    createContext<AuthenticationContextProps>(defaultContext);

export const AuthenticationContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    // note: check typescript type for userChanged
    onAuthStateChanged(auth, (userChanged: any) => {
        if (userChanged) {
            setUser(userChanged);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    });

    const onLogin = (email: string, password: string) => {
        setIsLoading(true);
        loginRequest(email, password)
            .then((client) => {
                setIsLoading(false);
                setUser(client.user);
                setError(null);
            })
            .catch((e) => {
                setIsLoading(false);
                setError(e.toString());
            });
    };

    const onRegister = (
        email: string,
        password: string,
        repeatedPassword: string
    ) => {
        setIsLoading(true);
        if (password !== repeatedPassword) {
            setError('Error: Passwords do not match');
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((client) => {
                setIsLoading(false);
                setUser(client.user);
                setError(null);
            })
            .catch((e) => {
                setIsLoading(false);
                setError(e.toString());
            });
    };

    const onLogout = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            setIsLoading(false);
            setUser(null);
        });
    };

    return (
        <AuthenticationContext.Provider
            value={{
                user,
                isLoading,
                error,
                onLogin,
                onRegister,
                onLogout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};
