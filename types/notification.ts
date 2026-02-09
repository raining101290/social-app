export type NotificationItem = {
    _id: string;
    title: string;
    type: 'like' | 'comment' | 'follow' | 'system';
    read: boolean;
    createdAt: string;

    senderId: {
        _id: string;
        name: string;
        profileImage: string | null;
    };

    data: {
        postId?: string;
        commentId?: string;
    };
};

export type NotificationListResponse = {
    success: boolean;
    data: NotificationItem[];
    meta: {
        offset: number;
        limit: number;
        total: number;
        hasMore: boolean;
    };
};
