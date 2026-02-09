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
            const token = await getToken();

            if (!token) {
                setAuth(null);
                router.replace('/welcome');
                return;
            }

            try {
                const me = await getUser();
                const data = me.data;

                const normalizedUser = {
                    ...data,
                    profileImage: data.profileImage
                        ? toAbsoluteUrl(data.profileImage)
                        : undefined,
                };

                setAuth({
                    token: data.token,
                    ...normalizedUser,
                });

                router.replace('/home');
            } catch (e) {
                setAuth(null);
                router.replace('/welcome');
            }
        };

        fetchAuth();
    }, []);

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="(main)/postDetails" options={{ presentation: 'modal' }} />
        </Stack>
    );
};

export default Layout;
