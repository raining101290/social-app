import Header from '@/components/Header';
import ScreenWrapper from '@/components/ScreenWrapper';
import { COLORS } from '@/constants/colors';
import { IMAGES } from '@/constants/images';
import { removeToken } from '@/lib/auth-storage';
import {
    Calendar,
    Edit01Icon,
    Email,
    File,
    LogOut,
    Phone,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
    const { user, logout } = useAuth();
    const router = useRouter();
    const onLogout = async () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Logout',
                style: 'destructive',
                onPress: async () => {
                    await removeToken();
                    logout();
                    router.replace('/welcome');
                },
            },
        ]);
    };
    return (
        <ScreenWrapper>
            <UserHeader user={user} router={router} logout={onLogout} />
        </ScreenWrapper>
    );
};

type UserHeaderProps = {
    user: any;
    router: ReturnType<typeof useRouter>;
    logout: () => void;
};
const UserHeader = ({ user, router, logout }: UserHeaderProps) => {
    const imageSource = user?.profileImage ? { uri: user.profileImage } : IMAGES.avatar;
    return (
        <View className="flex-1 bg-white px-4">
            <View>
                <Header title="Profile" mb={30} />
                <TouchableOpacity
                    onPress={logout}
                    className="absolute right-0 bg-[#fee2e2] p-2 rounded top-3"
                >
                    <HugeiconsIcon icon={LogOut} color={COLORS.error} />
                </TouchableOpacity>
            </View>

            <View className="px-4">
                <View className="gap-5">
                    <View className="items-center mt-6 relative w-48 h-48 self-center">
                        <Image
                            className="w-full h-48 rounded-xxl"
                            source={imageSource}
                            resizeMode="contain"
                        />
                        <Pressable
                            className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow shadow-gray-300 elevation-5"
                            onPress={() => router.push('/editProfile')}
                        >
                            <HugeiconsIcon icon={Edit01Icon} color={COLORS.text} />
                        </Pressable>
                    </View>

                    <View className="items-center">
                        <Text className="text-2xl font-bold text-textDark">
                            {user?.name}
                        </Text>
                        <View className="flex-row items-center justify-center gap-2">
                            <HugeiconsIcon size={16} icon={Email} color={COLORS.text} />
                            <Text className="text-sm text-textLight">
                                {user?.email || ''}
                            </Text>
                        </View>
                    </View>
                    <View className="mt-4">
                        <View className="flex-row items-center gap-2 mb-2">
                            <View className="flex items-center flex-row gap-2">
                                <HugeiconsIcon
                                    size={16}
                                    icon={Phone}
                                    color={COLORS.text}
                                />
                                <Text className="text-base font-semibold text-textDark w-[50px]">
                                    Phone
                                </Text>
                            </View>
                            <Text className="text-base text-textDark">
                                {user?.phone || '--'}
                            </Text>
                        </View>
                        <View className="flex-row items-center gap-2 mb-2">
                            <View className="flex items-center flex-row gap-2">
                                <HugeiconsIcon
                                    size={16}
                                    icon={Calendar}
                                    color={COLORS.text}
                                />
                                <Text className="text-base font-semibold text-textDark w-[50px]">
                                    Age
                                </Text>
                            </View>
                            <Text className="text-base text-textDark">
                                {user?.age || '--'}
                            </Text>
                        </View>
                        <View className="flex-row items-center gap-2 mb-2">
                            <View className="flex items-center flex-row gap-2">
                                <HugeiconsIcon
                                    size={16}
                                    icon={File}
                                    color={COLORS.text}
                                />
                                <Text className="text-base font-semibold text-textDark w-[50px]">
                                    Bio
                                </Text>
                            </View>
                            <Text className="text-base text-textDark">
                                {user?.bio || '--'}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Profile;
