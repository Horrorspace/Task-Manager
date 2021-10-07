import {BasicStrategy} from 'passport-http'
import bcrypt from 'bcryptjs'
import {IUserResult, IUserInstance} from 'interfaces/user'
import User from '../models/User'
import config from '../config/default.json'


export const basicStrategy = new BasicStrategy(
    {
        usernameField: 'email'
    },
    async (username, password, done): Promise<void> => {

    }
)