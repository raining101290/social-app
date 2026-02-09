export type BasePost = {
    _id: string;
    body: string;
    userId: PostUser | null;
    likes: string[];
    createdAt: string;
    updatedAt?: string;

    commentsCount?: number;
};

export type FeedPost = BasePost & {
    commentsCount: number;
};

export type DetailPost = BasePost;

export type PostUser = {
    _id: string;
    name?: string;
    profileImage?: string;
};

export type PostDetail = {
    _id: string;
    id: string;
    body: string;
    userId: PostUser | null;
    likes: string[];
    createdAt: string;
    updatedAt: string;
};

export type Comment = {
    _id: string;
    id: string;
    text: string;
    userId: PostUser | null;
    createdAt: string;
};
