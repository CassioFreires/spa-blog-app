import axios from 'axios';


type UserSignup = {
    name: string,
    email: string,
    password_hash: string;
    confirmPassword: string
}

export default class AuthService {

    private url = 'http://localhost:3000';

    async signup(data: UserSignup) {
        try {
            const user = await axios.post(`${this.url}/api/auth/signup`, {data});
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async signin(email: string, password: string) {
        try {
            const response = await axios.post(`${this.url}/api/auth/signin`, {
                email: email,
                password_hash: password
            });

            console.log(response)
            return response.data; // aqui sim você retorna o resultado da API
        } catch (error: any) {
            console.log(error);
            throw error?.response?.data || { message: "Erro desconhecido" };
        }
    }

    async verify2FA(userId: string, token: string) {
        const response = await axios.post(`${this.url}/api/auth/2fa/verify`, {
            userId,
            token,
        });

        return response.data; // Ex: { token: 'JWT_AQUI' }
    }




}