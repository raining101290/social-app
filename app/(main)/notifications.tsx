import Avatar from '@/components/Avatar';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import ScreenWrapper from '@/components/ScreenWrapper';
import { formatDate, toAbsoluteUrl } from '@/helpers/common';
import { getNotificationsApi, markNotificationReadApi } from '@/lib/api-notification';
import { NotificationItem } from '@/types/notification';
import { router } from 'expo-router';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

const Notification = () => {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {
        try {
            setLoading(true);
            const res = await getNotificationsApi(0, 20);
            console.log('res::', res);
            if (res.success) {
                setNotifications(res.data);
            }
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadNotifications();
        setRefreshing(false);
    };

    const openNotification = async (item: NotificationItem) => {
        // mark read optimistically
        if (!item.read) {
            setNotifications(prev =>
                prev.map(n => (n._id === item._id ? { ...n, read: true } : n))
            );

            await markNotificationReadApi(item._id);
        }

        // deep link based on payload
        if (item.data?.postId) {
            router.push({
                pathname: '/postDetails',
                params: { postId: item.data.postId },
            });
        }
    };

    const renderItem = ({ item }: { item: NotificationItem }) => {
        const m = moment(item.createdAt);
        const displayTime = formatDate(m);
        return (
            <TouchableOpacity
                onPress={() => openNotification(item)}
                className={`flex-row items-center p-3 rounded-md mb-3 border ${
                    item.read ? 'bg-white border-gray-100' : 'bg-blue-50 border-blue-100'
                }`}
            >
                <View className="mr-2 w-[38px] h-[38px]">
                    <Avatar
                        uri={toAbsoluteUrl(item?.senderId?.profileImage ?? undefined)}
                        size={38}
                        rounded
                    />
                </View>

                <View className="ml-3 flex-1">
                    <Text className="font-semibold text-text">
                        {item.senderId?.name || 'User'}
                    </Text>
                    <Text className="text-text mt-1">{item.title}</Text>
                    <Text className="text-xs text-text mt-2">{displayTime}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <ScreenWrapper bg="bg-white">
            <View className="flex-1 bg-white px-4">
                <Header title="Notifications" mb={20} />

                {loading ? (
                    <Loading />
                ) : (
                    <FlatList
                        data={notifications}
                        keyExtractor={i => i._id}
                        renderItem={renderItem}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        ListEmptyComponent={
                            <View className="items-center mt-20">
                                <Text className="text-gray-500">
                                    No notifications yet
                                </Text>
                            </View>
                        }
                    />
                )}
            </View>
        </ScreenWrapper>
    );
};

export default Notification;
