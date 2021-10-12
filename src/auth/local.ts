import {Strategy as LocalStrategy} from 'passport-local'
import bcrypt from 'bcryptjs'
import {IUserResult, IUserInstance} from 'interfaces/user'
import User from '../models/User'
import config from '../config/default.json'


export const localStrategy = new LocalStrategy(
    {
        usernameField: 'email'
    },
    async (username, password, done): Promise<void> => {
        try {
            const users: IUserInstance = new User(config.PostgreSQL);
            const userArr: IUserResult[] = await users.getUserByEmail(username);
            if(userArr.length === 0) {
                return done(null, false, {message: 'Incorrect email'})
            }

            const user: IUserResult = userArr[0];
            const isMatch: boolean = await bcrypt.compare(password, user.password);
            if(!isMatch) {
                return done(null, false, { message: 'Incorrect password.' })
            }
            else {
                return done(null, user)
            }
        }
        catch(e) {
            return done(e)
        }
    }
)