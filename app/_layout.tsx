import { toAbsoluteUrl } from '@/helpers/common';
import { getUser } from '@/lib/api-user';
import { getToken } from '@/lib/auth-storage';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import './globals.css';

const Layout = () => {
    return (
        <AuthProvider>
            <MainLayout />
        </AuthProvider>
    );
};
const MainLayout = () => {
    const { setAuth } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetchAuth = async () => {
            setTimeout(async () => {
                const token = await getToken();
                if (token) {
                    const me = await getUser();
                    const data = me.data;
                    console.log('Layout data', data);
                    const normalizedUser = {
                        ...data,
                        profileImage: data.profileImage
                            ? toAbsoluteUrl(data.profileImage)
                            : undefined,
                    };
                    console.log('Layout normalizedUser', normalizedUser);
                    setAuth({
                        token,
                        ...normalizedUser,
                    });

                    router.replace('/home');
                } else {
                    setAuth(null);
                    router.replace('/welcome');
                }
            }, 1000);
        };

        fetchAuth();
    }, []);

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        />
    );
};

export default Layout;
