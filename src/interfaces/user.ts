export type IUser = {
    id?: number;
    name: string;
    email: string;
    password?: string;
    role?: string;
    createdAt?: string;
    updatedAt?: string;
    // Adicione os campos que você vai usar do backend
    lastName?: string;
    bio?: string;
    avatarUrl?: string | null;
    role_name?: string;
    role_description?: string;
};