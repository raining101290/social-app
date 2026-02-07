import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import BackButton from './BackButton';

type HeaderProps = {
    title: string;
    showBack?: boolean;
    mb?: number;
};

const Header = ({ title, showBack = true, mb = 10 }: HeaderProps) => {
    const router = useRouter();
    return (
        <View
            style={{ marginBottom: mb }}
            className="flex-row justify-center items-center mt-5 gap-2"
        >
            {showBack && (
                <View className="absolute left-0">
                    <BackButton router={router} />
                </View>
            )}
            <Text className="text-xl font-bold text-textDark">{title}</Text>
        </View>
    );
};

export default Header;
