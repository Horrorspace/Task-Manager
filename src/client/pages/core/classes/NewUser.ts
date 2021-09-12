import {INewUser, INewUserInstance} from '@interfaces/IUser'


export default class NewUser implements INewUserInstance {
    protected email: string;
    protected name: string;
    protected password: string;
    
    constructor({email, name, password}: INewUser) {
        this.email = email;
        this.name = name;
        this.password = password;
    }

    public getUserEmail(): string {
        return this.email
    }
    public getUserName(): string {
        return this.name
    }
    public getUserPassword(): string {
        return this.password
    }
    public getUserObject(): INewUser {
        return {
            email: this.email,
            name: this.name,
            password: this.password
        }
    }
    public setUserEmail(email: string): void {
        this.email = email
    }
    public setUserName(name: string): void {
        this.name = name
    }
    public setUserPassword(password: string): void {
        this.password = password
    }
}