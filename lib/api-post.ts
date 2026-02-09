import { apiFetch } from './api-client';

export function createPostApi(payload: { text: string }) {
    return apiFetch('/posts', {
        method: 'POST',
        auth: true,
        body: JSON.stringify(payload),
    });
}

export function getPostsApi(offset = 0, limit = 10) {
    return apiFetch(`/posts?offset=${offset}&limit=${limit}`, {
        method: 'GET',
        auth: true,
    });
}

export function getPostDetailApi(postId: string) {
    return apiFetch(`/posts/${postId}`, {
        method: 'GET',
        auth: true,
    });
}

export function likePostApi(postId: string) {
    return apiFetch(`/posts/${postId}/like`, {
        method: 'POST',
        auth: true,
    });
}

export function commentPostApi(postId: string, text: string) {
    return apiFetch(`/posts/${postId}/comment`, {
        method: 'POST',
        auth: true,
        body: JSON.stringify({ text }),
    });
}
