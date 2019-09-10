import axios from 'axios';
import { baseUrl } from '../config/config';

export function auth(token) {
    return axios.get(`${baseUrl}${routes.auth}`, {
        headers: token
            ? {
                'x-access-token': token
            }
            : {}
    });
}

export async function apiGetRooms() {
    return await axios.get(`${baseUrl}/api/rooms-list`);
}

export async function apiPostRoom(room) {
    return await axios.post(`${baseUrl}/api/room`, { room });
}

export async function apiGetMessages() {
    return await axios.get(`${baseUrl}/api/messages`);
}

export async function apiDeleteMessages() {
    return await axios.delete(`${baseUrl}/api/messages`);
}