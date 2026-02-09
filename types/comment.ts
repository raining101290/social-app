export type Comment = {
    _id: string;
    text: string;
    userId: {
        _id: string;
        name?: string;
        profileImage?: string;
    };
    createdAt: string;
};
