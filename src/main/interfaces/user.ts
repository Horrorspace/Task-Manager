export interface IUserName {
    name: string;
    id: number;
}

export interface IUserEmail {
    email: string;
    id: number;
}

export interface IUserPass {
    pass: string;
    id: number;
}

export interface IUser {
    name: string;
    email: string;
    password: string;
}

export interface IUserResult extends IUser {
    id: number;
}