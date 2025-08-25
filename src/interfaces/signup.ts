export interface SignupPayload {
    name:string;
    lastName:string;
    email:string,
    password_hash:string;
    confirmPassword:string;
    role_id:number;
}

