import CommentItem from '@/components/CommentItem';
import Input from '@/components/Input';
import Loading from '@/components/Loading';
import PostCard from '@/components/PostCard';
import ScreenWrapper from '@/components/ScreenWrapper';
import { COLORS } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import { commentPostApi, getPostDetailApi } from '@/lib/api-post';
import { Comment, DetailPost } from '@/types/post';
import { SentIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const PostDetails = () => {
    const { postId } = useLocalSearchParams<{ postId: string }>();
    const { user } = useAuth();
    const [post, setPost] = useState<DetailPost | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string>('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!postId) return;

        const loadPost = async () => {
            try {
                setLoading(true);
                const res = await getPostDetailApi(postId);
                if (!res.success) {
                    throw new Error('API failed');
                }
                setPost(res.data.post);
                setComments(res.data.comments);
            } catch (e: any) {
                setError(e.message || 'Failed to load post');
            } finally {
                setLoading(false);
            }
        };

        loadPost();
    }, [postId]);

    const onNewComment = async () => {
        if (!message.trim()) return;
        if (!postId) return;

        try {
            setSubmitting(true);

            const res = await commentPostApi(postId, message.trim());

            if (res.success) {
                const newComment = res.data;
                setComments(prev => [newComment, ...prev]);
                setMessage('');
            } else {
                Alert.alert('Failed to add comment');
            }
        } catch (e: any) {
            setError(e.message || 'Comment failed');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <ScreenWrapper>
                <Loading />
            </ScreenWrapper>
        );
    }

    if (error) {
        return (
            <ScreenWrapper>
                <Text>{error}</Text>
            </ScreenWrapper>
        );
    }

    if (!post) {
        return (
            <ScreenWrapper bg="bg-white">
                <View className="m-4 items-center justify-center bg-white rounded-md p-8">
                    <Text className="text-base font-bold text-text">Post not found!</Text>
                </View>
            </ScreenWrapper>
        );
    }

    return (
        <ScreenWrapper bg="bg-white">
            <View className="px-4">
                <ScrollView>
                    <PostCard
                        item={post}
                        currentUserId={user?._id}
                        showMore={false}
                        commentsCountOverride={comments.length}
                    />
                    <View className="flex-row items-center gap-2">
                        <Input
                            inputClass=""
                            containerClass="mt-6 mb-4 flex-1"
                            placeholder="Write comment"
                            value={message}
                            onChangeText={setMessage}
                        />
                        <TouchableOpacity
                            style={{ borderWidth: 0.3, borderColor: COLORS.success }}
                            className="flex justify-center items-center bg-white rounded-lg p-2 mt-2  w-14 h-12"
                            onPress={onNewComment}
                        >
                            {submitting ? (
                                <Loading />
                            ) : (
                                <HugeiconsIcon icon={SentIcon} color={COLORS.success} />
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <View>
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <CommentItem
                                key={index}
                                loggedInUserId={user?._id || ''}
                                comment={comment}
                            />
                        ))
                    ) : (
                        <View className="p-4 bg-white rounded-md border border-gray">
                            <Text>Be first to comment</Text>
                        </View>
                    )}
                </View>
            </View>
        </ScreenWrapper>
    );
};

export default PostDetails;
