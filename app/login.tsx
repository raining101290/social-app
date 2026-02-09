import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import Input from '@/components/Input';
import ScreenWrapper from '@/components/ScreenWrapper';
import { COLORS } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import { toAbsoluteUrl } from '@/helpers/common';
import { loginApi } from '@/lib/api';
import { getUser } from '@/lib/api-user';
import { saveToken } from '@/lib/auth-storage';
import { CirclePasswordIcon, Mail01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StatusBar, Text, View } from 'react-native';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = React.useState(false);
    const { setAuth } = useAuth();

    const onSubmit = async () => {
        if (!email || !password) {
            alert('Please fill all the fields');
            return;
        }

        try {
            setLoading(true);

            const res = await loginApi({ email, password });

            if (!res.success) {
                alert('Login failed');
                return;
            }

            await saveToken(res.token);

            const me = await getUser();
            const data = me.data;

            setAuth({
                token: res.token,
                ...data,
                profileImage: data.profileImage
                    ? toAbsoluteUrl(data.profileImage)
                    : undefined,
            });

            router.replace('/home');
        } catch (err: any) {
            alert(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScreenWrapper>
            <StatusBar barStyle="dark-content" />
            <View className="flex-1 gap-8 px-4">
                <BackButton router={router} />

                <View>
                    <Text className="text-4xl font-extrabold text-text py-2">Hey, </Text>
                    <Text className="text-4xl font-extrabold text-text py-2">
                        Welcome back!
                    </Text>
                </View>

                <View>
                    <Text className="text-lg text-text">Please login to continue</Text>

                    <Input
                        icon={<HugeiconsIcon icon={Mail01Icon} color={COLORS.text} />}
                        inputClass=""
                        containerClass="mt-6 mb-4"
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Input
                        icon={
                            <HugeiconsIcon
                                icon={CirclePasswordIcon}
                                color={COLORS.text}
                            />
                        }
                        inputClass=""
                        containerClass="mt-6 mb-4"
                        secureTextEntry
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Text className="text-right text-primaryDark font-bold mt-2 mb-4">
                        Forgot Password?
                    </Text>

                    <Button
                        buttonStyle="bg-primary justify-center items-center rounded-md py-3 px-6"
                        textStyle="text-lg font-bold text-white"
                        title="Login"
                        hasShadow
                        loading={loading}
                        onPress={onSubmit}
                    />
                    <View className="flex-row items-center justify-center mt-12">
                        <Text className="text-text">{`Don't have an account? `}</Text>
                        <Pressable onPress={() => router.push('/register')}>
                            <Text className="text-primaryDark font-bold">Sign Up</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScreenWrapper>
    );
};

export default Login;
