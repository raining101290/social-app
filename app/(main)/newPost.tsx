import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import Editor from '@/components/Editor';
import Header from '@/components/Header';
import ScreenWrapper from '@/components/ScreenWrapper';
import { createPostApi } from '@/lib/api-post';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

const NewPost = () => {
    const { user } = useAuth();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = React.useState(false);
    const onSubmit = async () => {
        const text = message.trim();
        if (!text) {
            Alert.alert('Post', 'Please write something first');
            return;
        }
        try {
            setLoading(true);
            await createPostApi({ text });
            setMessage('');
            router.back();
        } catch (err: any) {
            console.error(err);
            Alert.alert('Error', err.message || 'Failed to create post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScreenWrapper className="bg-white">
            <View className="flex-1 mb-8 gap-10 px-4">
                <Header title="Create Post" />
                <ScrollView
                    style={{ flexGrow: 0 }}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View className="flex-row items-center gap-4">
                        <View>
                            <Avatar uri={user?.profileImage} size={50} rounded />
                        </View>
                        <View className="flex-1">
                            <Text className="text-xl font-bold text-text">
                                {user?.name}
                            </Text>
                            <Text className="text-sm font-bold text-text">Public</Text>
                        </View>
                    </View>
                    <Editor
                        message={message}
                        setMessage={setMessage}
                        placeholder="What's on your mind?"
                    />
                </ScrollView>
                <Button
                    buttonStyle="bg-primary justify-center items-center rounded-md py-3 px-6"
                    textStyle="text-lg font-bold text-white"
                    title="Post"
                    hasShadow
                    loading={loading}
                    onPress={onSubmit}
                />
            </View>
        </ScreenWrapper>
    );
};

export default NewPost;
