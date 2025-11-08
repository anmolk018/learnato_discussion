export type Reply = {
    id: string;
    postId: string;
    content: string;
    author?: string;
    createdAt: string;
};


export type Post = {
    id: string;
    title: string;
    content: string;
    author?: string;
    votes: number;
    createdAt: string;
    replies: Reply[];
};