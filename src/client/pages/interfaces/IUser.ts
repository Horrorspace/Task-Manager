export interface INewUser {
    name: string;
    email: string;
    password: string;
}

export interface IUser extends INewUser {
    id: number;
}

export interface INewUserInstance {
    getUserEmail(): string;
    getUserName(): string;
    getUserPassword(): string;
    getUserObject(): INewUser;
    setUserEmail(email: string): void;
    setUserName(name: string): void;
    setUserPassword(password: string): void;
}

export interface IUserInstance extends INewUserInstance {
    getUserId(): number;
    getUserObject(): IUser;
    setUserId(id: number): void;
}