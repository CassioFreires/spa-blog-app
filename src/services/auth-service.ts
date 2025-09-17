import axios from 'axios';
import type { SignupPayload } from '../interfaces/signup';


export default class AuthService {

    async signup(data: SignupPayload) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
                data, // ⚠️ seu backend espera o body dentro de `data`
            });
            return response.data;
        } catch (error: any) {
            console.error(error);
            throw error?.response?.data || { message: "Erro ao criar usuário" };
        }
    }

    async signin(email: string, password: string) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signin`, {
                email: email,
                password_hash: password
            });
            return response.data; // aqui sim você retorna o resultado da API
        } catch (error: any) {
            throw error?.response?.data || { message: "Erro desconhecido" };
        }
    }

    async verify2FA(userId: string, token: string) {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/2fa/verify`, {
            userId,
            token,
        });

        return response.data; // Ex: { token: 'JWT_AQUI' }
    }




}