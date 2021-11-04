import {IUser, IUserInstance} from '@interfaces/IUser'
import NewUser from '@core/classes/NewUser'


export default class User extends NewUser implements IUserInstance {
    protected id: number;
    
    constructor({id, email, name, password}: IUser) {
        super({email, name, password});
        this.id = id;
    }

    getUserId(): number {
        return this.id
    }
    getUserObject(): IUser {
        return {
            id: this.id,
            email: this.email,
            name: this.name,
            password: this.password
        }
    }
    setUserId(id: number): void {
        this.id = id
    }
}