import * as SecureStore from 'expo-secure-store';

export async function saveToken(token: string) {
    await SecureStore.setItemAsync('auth_token', token);
}

export async function getToken() {
    return SecureStore.getItemAsync('auth_token');
}

export async function clearToken() {
    return SecureStore.deleteItemAsync('auth_token');
}

export const removeToken = async () => {
    await SecureStore.deleteItemAsync('auth_token');
};
