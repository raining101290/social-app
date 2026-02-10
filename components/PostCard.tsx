import { COLORS } from '@/constants/colors';
import { formatDate, toAbsoluteUrl } from '@/helpers/common';
import { BasePost } from '@/types/post';
import { Comment02Icon, EllipsisVertical, Heart } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { router } from 'expo-router';
import moment from 'moment';
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import Avatar from './Avatar';

type Props = {
    item: BasePost;
    currentUserId?: string;
    onLike?: (postId: string) => void;
    onDelete?: (postId: string) => void;
    showMore?: boolean;
    commentsCountOverride?: number;
};

const PostCard = ({
    item,
    currentUserId,
    onLike,
    onDelete,
    showMore = true,
    commentsCountOverride,
}: Props) => {
    const m = moment(item.createdAt);
    const displayTime = formatDate(m);
    const liked = currentUserId ? item.likes.includes(currentUserId) : false;

    const likesCount = item.likes.length;
    const commentsCount = commentsCountOverride ?? item.commentsCount;

    const likePost = () => onLike?.(item._id);
    const onComment = () => {
        if (!showMore) return null;
        router.push({ pathname: '/postDetails', params: { postId: item._id } });
    };
    const isOwner = item.userId?._id === currentUserId;

    const openMenu = () => {
        Alert.alert('Post options', undefined, [
            {
                text: 'Delete Post',
                style: 'destructive',
                onPress: () => onDelete?.(item._id),
            },
            { text: 'Cancel', style: 'cancel' },
        ]);
    };

    return (
        <View className="bg-white p-4 rounded-md border border-slate-100 mb-4">
            <View className="flex-row items-center gap-3 mb-2 justify-between">
                <View className="flex-row items-center">
                    <View className="mr-2">
                        <Avatar
                            uri={toAbsoluteUrl(item?.userId?.profileImage)}
                            size={40}
                            rounded
                        />
                    </View>
                    <View>
                        <Text className="font-bold text-text">
                            {item.userId?.name || 'Unknown'}
                        </Text>
                        <Text className="text-xs text-gray-500">{displayTime}</Text>
                    </View>
                </View>
                {showMore && isOwner && (
                    <TouchableOpacity onPress={openMenu}>
                        <HugeiconsIcon icon={EllipsisVertical} color={COLORS.text} />
                    </TouchableOpacity>
                )}
            </View>

            <Text className="text-base text-text">{item.body}</Text>
            <View className="mt-4">
                <View className="flex-row gap-4 items-center justify-end">
                    <View className="flex-row gap-2">
                        <TouchableOpacity onPress={likePost}>
                            <HugeiconsIcon
                                icon={Heart}
                                color={liked ? COLORS.error : COLORS.textLight}
                                fill={liked ? COLORS.error : 'transparent'}
                            />
                        </TouchableOpacity>
                        <Text className="text-dark text-xl">{likesCount}</Text>
                    </View>
                    <View className="flex-row gap-2">
                        <TouchableOpacity onPress={onComment}>
                            <HugeiconsIcon
                                icon={Comment02Icon}
                                color={COLORS.textLight}
                            />
                        </TouchableOpacity>
                        <Text className="text-dark text-xl">{commentsCount}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default PostCard;
