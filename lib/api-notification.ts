import { apiFetch } from './api-client';

export function getNotificationsApi(offset = 0, limit = 20) {
    return apiFetch(`/notifications?offset=${offset}&limit=${limit}`, {
        method: 'GET',
        auth: true,
    });
}

export function createNotificationApi(payload: {
    receiverId: string;
    title: string;
    type: string;
    data?: Record<string, any>;
}) {
    return apiFetch('/notifications', {
        method: 'POST',
        auth: true,
        body: JSON.stringify(payload),
    });
}

export function markNotificationReadApi(notificationId: string) {
    return apiFetch(`/notifications/${notificationId}/read`, {
        method: 'PATCH',
        auth: true,
    });
}

export function markAllNotificationsReadApi() {
    return apiFetch(`/notifications/read-all`, {
        method: 'PATCH',
        auth: true,
    });
}

export function getUnreadNotificationCountApi() {
    return apiFetch('/notifications/unread-count', {
        method: 'GET',
        auth: true,
    });
}
