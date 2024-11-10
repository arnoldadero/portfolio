// src/api/auth.ts
import axios from 'axios';
import { LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth';

const API_URL = 'http://localhost:8080';

export const authApi = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const { data } = await axios.post(`${API_URL}/login`, credentials);
        return data;
    },

    register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
        const { data } = await axios.post(`${API_URL}/register`, credentials);
        return data;
    }
};