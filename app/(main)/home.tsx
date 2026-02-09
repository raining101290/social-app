import Avatar from '@/components/Avatar';
import Loading from '@/components/Loading';
import PostCard from '@/components/PostCard';
import ScreenWrapper from '@/components/ScreenWrapper';
import { COLORS } from '@/constants/colors';
import { delay, HEIGHT_PERCENTAGE } from '@/helpers/common';
import { getUnreadNotificationCountApi } from '@/lib/api-notification';
import { getPostsApi, likePostApi } from '@/lib/api-post';
import { BasePost } from '@/types/post';
import { Bell, PlusSignSquareFreeIcons } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

const LIMIT = 10;

const Home = () => {
    const { user } = useAuth();

    const router = useRouter();
    const [posts, setPosts] = useState<BasePost[]>([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    const loadPosts = async () => {
        try {
            setRefreshing(true);
            const start = Date.now();
            const res = await getPostsApi(0, LIMIT);
            const elapsed = Date.now() - start;
            if (elapsed < 1000) {
                await delay(1000 - elapsed);
            }
            setPosts(res.data);
            setOffset(res.data.length);
            setHasMore(res.meta.hasMore);
        } finally {
            setRefreshing(false);
        }
    };

    const loadUnreadCount = async () => {
        try {
            const res = await getUnreadNotificationCountApi();
            if (res.success) {
                setUnreadCount(res.data);
            }
        } catch {}
    };

    const loadMore = async () => {
        if (!hasMore || loadingMore || refreshing) return;
        setLoadingMore(true);
        const start = Date.now();
        const res = await getPostsApi(offset, LIMIT);
        const elapsed = Date.now() - start;
        if (elapsed < 1000) {
            await delay(1000 - elapsed);
        }
        setPosts(prev => {
            const map = new Map(prev.map(p => [p._id, p]));
            for (const p of res.data) {
                map.set(p._id, p);
            }
            return Array.from(map.values());
        });
        setOffset(prev => prev + res.data.length);
        setHasMore(res.meta.hasMore);
        setLoadingMore(false);
    };

    useFocusEffect(
        useCallback(() => {
            loadPosts();
            loadUnreadCount();
        }, [])
    );

    const renderFooter = useCallback(() => {
        if (loadingMore) {
            return (
                <View style={{ marginVertical: 30 }}>
                    <Loading />
                </View>
            );
        }
        if (!hasMore && posts.length > 0) {
            return (
                <View className="p-4 items-center">
                    <Text>No more posts</Text>
                </View>
            );
        }
        return null;
    }, [loadingMore, hasMore, posts.length]);

    if (!user) {
        return <Loading />;
    }
    const renderPost = ({ item }: { item: BasePost }) => (
        <PostCard item={item} currentUserId={user._id} onLike={handleLike} showMore />
    );
    const renderEmpty = () => {
        if (refreshing) return null;
        return (
            <View className="p-4 items-center">
                <Text>No posts yet</Text>
            </View>
        );
    };

    const handleLike = async (postId: string) => {
        setPosts(prev =>
            prev.map(post => {
                if (post._id !== postId) return post;

                const liked = post.likes.includes(user._id);

                return {
                    ...post,
                    likes: liked
                        ? post.likes.filter(id => id !== user._id)
                        : [...post.likes, user._id],
                };
            })
        );

        try {
            await likePostApi(postId);
        } catch {
            // rollback on failure
            setPosts(prev =>
                prev.map(post => {
                    if (post._id !== postId) return post;

                    const liked = post.likes.includes(user._id);

                    return {
                        ...post,
                        likes: liked
                            ? post.likes.filter(id => id !== user._id)
                            : [...post.likes, user._id],
                    };
                })
            );
        }
    };
    console.log('unreadCount::', unreadCount);
    return (
        <ScreenWrapper>
            <View className="flex-1">
                <View className="flex-row items-center justify-between mb-6 mx-4">
                    <Text className="text-3xl font-bold text-text">Social</Text>
                    <View className="flex-row items-center gap-4">
                        {/* <Pressable onPress={() => router.push('/notifications')}>
                            <HugeiconsIcon icon={Bell} color={COLORS.text} />
                        </Pressable> */}
                        <Pressable onPress={() => router.push('/notifications')}>
                            <View>
                                <HugeiconsIcon icon={Bell} color={COLORS.text} />

                                {unreadCount > 0 && (
                                    <View
                                        className="absolute -top-2 -right-2 bg-red-500 rounded-full px-1.5"
                                        style={{ minWidth: 18, alignItems: 'center' }}
                                    >
                                        <Text className="text-white text-xs font-bold">
                                            {unreadCount > 99 ? '99+' : unreadCount}
                                        </Text>
                                    </View>
                                )}
                            </View>
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
                <View className="flex-1 mb-8 gap-10 px-4">
                    <FlatList
                        data={posts}
                        keyExtractor={item => item._id}
                        renderItem={renderPost}
                        refreshing={refreshing}
                        onRefresh={loadPosts}
                        onEndReached={loadMore}
                        onEndReachedThreshold={0.5}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 24 }}
                        ListFooterComponent={renderFooter}
                        ListEmptyComponent={renderEmpty}
                    />
                </View>
            </View>
        </ScreenWrapper>
    );
};

export default Home;
