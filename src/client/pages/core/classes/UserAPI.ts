import {Subscription} from 'rxjs'
import {fromFetch} from 'rxjs/fetch'
import {map, filter, switchMap} from 'rxjs/operators'
import {apiUrl} from '@core/const/urlConst'
import User from '@core/classes/User'
import NewUser from '@core/classes/NewUser'
import {INewUser, INewUserInstance, IUser, IUserInstance, ILogin} from '@interfaces/IUser'



export default class UserAPI {
    private static newUserKeys: string[] = ['name', 'email', 'password'];
    private static newUserTypes: string[] = ['string', 'string', 'string'];
    private static userKeys: string[] = [...UserAPI.newUserKeys, 'id'];
    private static userTypes: string[] = [...UserAPI.newUserTypes, 'number'];
    private static authUrl: string = `${apiUrl}/auth`

    private static headers: Headers = new Headers({
        'Content-Type': 'application/json'
    })
    
    constructor() {}

    private static userCheck(task: Object): boolean {
        if(UserAPI.userKeys.every(key => task.hasOwnProperty(key))) {
            return UserAPI.userKeys.every((key, i) => typeof(task[key]) === UserAPI.userTypes[i]);
        }
        else {
            return false
        }
    }

    private static newUserCheck(task: Object): boolean {
        if(UserAPI.newUserKeys.every(key => task.hasOwnProperty(key))) {
            return UserAPI.newUserKeys.every((key, i) => typeof(task[key]) === UserAPI.newUserTypes[i]);
        }
        else {
            return false
        }
    }

    public static async getCurrentUser(): Promise<IUserInstance> {
        return new Promise((resolve, reject) => {
            const url: string = `${UserAPI.authUrl}/user`;
            const data$ = fromFetch(url, {
                method: 'GET',
                headers: UserAPI.headers
            }).pipe(
                switchMap(res => {
                    if(res.status === 200 ) {
                        return res.json()
                    }
                    else {
                        throw {
                            status: res.status,
                            message: 'API error'
                        }
                    }
                }),
                filter((val: any) => typeof(val) === 'object'),
                filter((val: any) => UserAPI.userCheck(val)),
                map((user: IUser): IUserInstance => new User(user))
            );
            const sub: Subscription = data$.subscribe({
                next: (user: IUserInstance) => {
                    resolve(user)
                },
                error: (e) => {
                    reject(e)
                }
            })
        })
    }

    public static async toLogin(login: ILogin): Promise<IUserInstance> {
        return new Promise((resolve, reject) => {
            const url: string = `${UserAPI.authUrl}/login`;
            const data$ = fromFetch(url, {
                method: 'POST',
                headers: UserAPI.headers,
                body: JSON.stringify(login)
            }).pipe(
                switchMap(res => {
                    if(res.status === 200 ) {
                        return res.json()
                    }
                    else {
                        throw {
                            status: res.status,
                            message: 'API error'
                        }
                    }
                }),
                filter((val: any) => typeof(val) === 'object'),
                filter((val: any) => UserAPI.userCheck(val)),
                map((user: IUser): IUserInstance => new User(user))
            );
            const sub: Subscription = data$.subscribe({
                next: (user) => {
                    resolve(user)
                },
                error: (e) => {
                    reject(e)
                }
            })
        })
    }

    public static async toLogout(): Promise<void> {
        return new Promise((resolve, reject) => {
            const url: string = `${UserAPI.authUrl}/logout`;
            const data$ = fromFetch(url, {
                method: 'POST',
                headers: UserAPI.headers
            }).pipe(
                map(res => {
                    if(res.status === 200 ) {
                        return res.json()
                    }
                    else {
                        throw {
                            status: res.status,
                            message: 'API error'
                        }
                    }
                })
            );
            const sub: Subscription = data$.subscribe({
                complete: () => {
                    resolve()
                },
                error: (e) => {
                    reject(e)
                }
            })
        })
    }

    public static async toRegister(user: INewUser): Promise<void> {
        return new Promise((resolve, reject) => {
            const url: string = `${UserAPI.authUrl}/register`;
            const data$ = fromFetch(url, {
                method: 'POST',
                headers: UserAPI.headers,
                body: JSON.stringify(user)
            }).pipe(
                map(res => {
                    if(res.status === 200 ) {
                        return res.json()
                    }
                    else {
                        throw {
                            status: res.status,
                            message: 'API error'
                        }
                    }
                })
            );
            const sub: Subscription = data$.subscribe({
                complete: () => {
                    resolve()
                },
                error: (e) => {
                    reject(e)
                }
            })
        })
    }
}