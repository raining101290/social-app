import { formatDate, toAbsoluteUrl } from '@/helpers/common';
import { Comment } from '@/types/post';
import moment from 'moment';
import React from 'react';
import { Text, View } from 'react-native';
import Avatar from './Avatar';
type Props = {
    comment: Comment;
    loggedInUserId?: string;
};
const CommentItem = ({ comment }: Props) => {
    const m = moment(comment.createdAt);
    const displayTime = formatDate(m);
    // will be needed when provide delete option
    // console.log('userId::', loggedInUserId, comment.userId?._id);
    return (
        <View key={comment._id} className="flex-row items-start rounded-md p-3 mb-2">
            <View className="mr-2 w-[38px] h-[38px]">
                <Avatar
                    uri={toAbsoluteUrl(comment?.userId?.profileImage)}
                    size={38}
                    rounded
                />
            </View>
            <View className="flex-1 bg-gray rounded-md p-4">
                <View className="flex-row justify-between items-start mb-1">
                    <Text className="font-semibold text-text">
                        {comment.userId?.name || 'User'}
                    </Text>

                    <Text className="text-xs text-text">{displayTime}</Text>
                </View>
                {/* {loggedInUserId === comment.userId?._id && (
                    <View className="absolute bottom-4 right-2">
                        <HugeiconsIcon icon={Delete} color={COLORS.error} size={16} />
                    </View>
                )} */}
                <Text className="text-text">{comment.text}</Text>
            </View>
        </View>
    );
};

export default CommentItem;
