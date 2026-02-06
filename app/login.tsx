import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import Input from '@/components/Input';
import ScreenWrapper from '@/components/ScreenWrapper';
import { COLORS } from '@/constants/colors';
import { CirclePasswordIcon, Mail01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StatusBar, Text, TextInput, View } from 'react-native';

const Login = () => {
    const emailRef = React.useRef<TextInput>(null);
    const passwordRef = React.useRef<TextInput>(null);
    const [loading, setLoading] = React.useState(false);
    const onSubmit = () => {
        if (!emailRef.current || !passwordRef.current) {
            alert('Please fill all the fields');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };
    return (
        <ScreenWrapper>
            <StatusBar barStyle="dark-content" />
            <View className="flex-1 gap-8 px-4">
                <BackButton />

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
                        inputRef={emailRef}
                        onChangeText={text => {
                            emailRef.current = text;
                        }}
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
                        inputRef={passwordRef}
                        onChangeText={text => {
                            passwordRef.current = text;
                        }}
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
