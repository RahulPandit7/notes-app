export interface AuthUser {
    id: number;
    name: string;
    email: string;

}

export interface AuthResponse extends AuthUser {
    token: string;
}
export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}