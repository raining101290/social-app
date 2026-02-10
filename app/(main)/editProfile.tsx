import Button from '@/components/Button';
import Header from '@/components/Header';
import Input from '@/components/Input';
import ScreenWrapper from '@/components/ScreenWrapper';
import { COLORS } from '@/constants/colors';
import { IMAGES } from '@/constants/images';
import { toAbsoluteUrl } from '@/helpers/common';
import { updateAvatarApi, updateProfileApi } from '@/lib/api-user';
import { Camera, File, Phone, UserIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

type EditUserState = {
    name: string;
    phone: string;
    bio: string;
    profileImage: string;
};

const EditProfile = () => {
    const { user: currentUser, setAuth, setUserData } = useAuth();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<EditUserState>({
        name: '',
        phone: '',
        bio: '',
        profileImage: '',
    });

    useEffect(() => {
        if (!currentUser) return;
        setUser({
            name: currentUser.name || '',
            phone: (currentUser as any).phone || '',
            profileImage: currentUser.profileImage || '',
            bio: currentUser.bio || '',
        });
    }, [currentUser]);

    useEffect(() => {
        if (!currentUser?.profileImage) return;

        setUser(prev => ({
            ...prev,
            profileImage: currentUser.profileImage!,
        }));
    }, [currentUser?.profileImage]);

    const OnChnageImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            Alert.alert('Permission required');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (result.canceled) return;

        const uri = result.assets[0].uri;

        // optimistic preview
        setUser(prev => ({ ...prev, profileImage: uri }));

        try {
            setLoading(true);

            const res = await updateAvatarApi(uri);
            const fullUrl = toAbsoluteUrl(res.data.profileImage);

            setUser(prev => ({
                ...prev,
                profileImage: fullUrl || '',
            }));

            setUserData({
                ...res.data,
                profileImage: fullUrl,
            });

            Alert.alert('Success', 'Avatar updated');
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async () => {
        let userData = { ...user };
        let { name, phone, bio } = userData;
        if (!name || !phone || !bio) {
            Alert.alert('Profile', 'Please fill all the informations');
            return;
        }
        try {
            setLoading(true);
            const res = await updateProfileApi({
                name,
                bio,
                phone,
            });
            if (res.success) {
                setAuth({
                    ...currentUser,
                    ...res.data,
                    profileImage: currentUser?.profileImage,
                });
                Alert.alert('Success', 'Profile updated');
                router.back();
            }
        } catch (err) {
            Alert.alert('Error', 'Update failed');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    const imageSource = user.profileImage ? { uri: user.profileImage } : IMAGES.avatar;

    return (
        <ScreenWrapper className="bg-white">
            <View className="flex-1 bg-white px-4">
                <Header title="Edit Profile" mb={30} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="items-center mt-6 relative w-48 h-48 self-center">
                        <Image
                            className="w-full h-48 rounded-xxl"
                            source={imageSource}
                            resizeMode="contain"
                        />
                        <Pressable
                            className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow shadow-gray-300 elevation-5"
                            onPress={OnChnageImage}
                        >
                            <HugeiconsIcon icon={Camera} color={COLORS.text} />
                        </Pressable>
                    </View>
                    <View className="mt-8">
                        <Text>Please fill your profile information</Text>

                        <Input
                            icon={<HugeiconsIcon icon={UserIcon} color={COLORS.text} />}
                            inputClass=""
                            containerClass="mt-6 mb-4"
                            placeholder="Enter your name"
                            value={user.name}
                            onChangeText={text => setUser({ ...user, name: text })}
                        />

                        <Input
                            icon={<HugeiconsIcon icon={Phone} color={COLORS.text} />}
                            inputClass=""
                            containerClass="mt-6 mb-4"
                            placeholder="Enter your phone number"
                            value={user.phone}
                            onChangeText={text => setUser({ ...user, phone: text })}
                        />

                        <Input
                            icon={<HugeiconsIcon icon={File} color={COLORS.text} />}
                            inputClass=""
                            containerClass="mt-6 mb-4"
                            placeholder="Enter your bio"
                            value={user.bio}
                            multiline={true}
                            onChangeText={text => setUser({ ...user, bio: text })}
                        />

                        <Button
                            title="Update"
                            onPress={onSubmit}
                            loading={loading}
                            hasShadow
                            buttonStyle="bg-primary justify-center items-center rounded-md py-3 px-6"
                            textStyle="text-lg font-bold text-white"
                        />
                    </View>
                </ScrollView>
            </View>
        </ScreenWrapper>
    );
};

export default EditProfile;
