import Avatar from '@/components/Avatar';
import ScreenWrapper from '@/components/ScreenWrapper';
import { COLORS } from '@/constants/colors';
import { HEIGHT_PERCENTAGE } from '@/helpers/common';
import { Heart, PlusSignSquareFreeIcons } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

const Home = () => {
    const { user } = useAuth();
    const router = useRouter();
    console.log('Home user:', user);
    return (
        <ScreenWrapper>
            <View className="flex-1">
                <View className="flex-row items-center justify-between mb-6 mx-4">
                    <Text className="text-3xl font-bold text-text">Social</Text>
                    <View className="flex-row items-center gap-4">
                        <Pressable onPress={() => router.push('/notifications')}>
                            <HugeiconsIcon icon={Heart} color={COLORS.text} />
                        </Pressable>
                        <Pressable onPress={() => router.push('/newPost')}>
                            <HugeiconsIcon
                                icon={PlusSignSquareFreeIcons}
                                color={COLORS.text}
                            />
                        </Pressable>
                        <Pressable onPress={() => router.push('/profile')}>
                            <Avatar
                                uri={user?.profileImage}
                                size={HEIGHT_PERCENTAGE(3.8)}
                                rounded={true}
                            />
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScreenWrapper>
    );
};

export default Home;
