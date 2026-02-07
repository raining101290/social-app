import { apiFetch } from './api-client';

export function signupApi(payload: { name: string; email: string; password: string }) {
    return apiFetch('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

export function loginApi(payload: { email: string; password: string }) {
    return apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}
