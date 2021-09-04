import {QueryResult} from 'pg'


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

export interface IUserInstance {
    getAllUsers(): Promise<IUserResult[]>;
    getUserByEmail(email: string): Promise<IUserResult[]>;
    getUserById(id: number): Promise<IUserResult[]>;
    insertUser({name, email, password}: IUser): Promise<QueryResult>;
    userNameUp({id, name}: IUserName): Promise<QueryResult>;
    userEmailUp({id, email}: IUserEmail): Promise<QueryResult>;
    userPassUp({id, pass}: IUserPass): Promise<QueryResult>;
    deleteUser(email: string): Promise<QueryResult>;
}