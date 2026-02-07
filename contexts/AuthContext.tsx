import React, { createContext, ReactNode, useContext, useState } from 'react';

export type AuthUser = {
    token: string;
    name?: string;
    email?: string;
    profileImage?: string;
    phone?: string;
    age?: number;
    bio?: string;
};

type AuthContextType = {
    user: AuthUser | null;
    setAuth: (authUser: AuthUser | null) => void;
    setUserData: (userData: Partial<AuthUser>) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type Props = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<AuthUser | null>(null);

    const setAuth = (authUser: AuthUser | null) => {
        setUser(authUser);
    };

    const setUserData = (userData: Partial<AuthUser>) => {
        setUser(prev => (prev ? { ...prev, ...userData } : prev));
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setAuth, setUserData, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used inside AuthProvider');
    }
    return ctx;
};
