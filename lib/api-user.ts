import { API_BASE, apiFetch } from './api-client';
import { getToken } from './auth-storage';

export function getUser() {
    return apiFetch('/users/me', {
        method: 'GET',
        auth: true,
    });
}

export function updateProfileApi(payload: {
    name?: string;
    bio?: string;
    phone?: string;
    age?: number;
}) {
    return apiFetch('/users/me', {
        method: 'PUT',
        auth: true,
        body: JSON.stringify(payload),
    });
}

export function changePasswordApi(payload: {
    currentPassword: string;
    newPassword: string;
}) {
    return apiFetch('/users/password', {
        method: 'PUT',
        auth: true,
        body: JSON.stringify(payload),
    });
}

export async function updateAvatarApi(uri: string) {
    const token = await getToken();

    const form = new FormData();

    form.append('profileImage', {
        uri,
        name: 'avatar.jpg',
        type: 'image/jpeg',
    } as any);

    const res = await fetch(`${API_BASE}/users/me/avatar`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: form,
    });

    if (!res.ok) {
        const text = await res.text();
        console.error('UPLOAD ERROR RAW:', text);
        throw new Error('Upload failed');
    }

    return res.json();
}
