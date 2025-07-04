import axios from 'axios';

export default class AuthService {

    private url = 'http://localhost:3000';


    async signin(email: string, password: string) {
        try {
            console.log('cai')
            await axios.post(`${this.url}/api/auth/signin`, {
                email: email,
                password_hash: password
            }).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
        } catch (error: any) {
            console.log(error);
            throw error;
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


