import { getToken } from '@/lib/auth-storage';

export const API_BASE = 'http://localhost:5055/api';

type FetchOptions = RequestInit & {
    auth?: boolean;
};

export async function apiFetch(path: string, options: FetchOptions = {}) {
    const { auth = false, headers, ...rest } = options;

    const finalHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(headers as Record<string, string>),
    };

    if (auth) {
        const token = await getToken();
        if (token) {
            finalHeaders.Authorization = `Bearer ${token}`;
        }
    }

    const res = await fetch(`${API_BASE}${path}`, {
        ...rest,
        headers: finalHeaders,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data?.message || 'Request failed');
    }

    return data;
}
