import {Router} from 'express'
import {check, validationResult} from 'express-validator'
import config from '../config/default.json'
import User from '../models/User'
import {IUser, IUserResult, IUserName, IUserEmail, IUserPass, IUserInstance} from 'interfaces/user'
import passport from 'passport'



export const router: Router = Router();

router.post(
    '/login',
    [
        check('email', 'Invalid email')
            .isEmail(),
        check('password', 'Empty password')
            .exists()
    ],
    passport.authenticate(
        'local', {
            successMessage: 'You have been logined',
            failureFlash: true
        }
    )
)

router.post(
    '/logout',
    (req, res) => {
        req.logout();
        res.status(200).json({
            message: 'You have been logouted'
        })
    }
)

router.post(
    '/register',
    [
        check('email', 'Invalid email')
            .isEmail(),
        check('password', 'Invalid password')
            .isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid data'
                })
            }
            const userData: IUser = req.body;
            const {email, password} = userData;

            const users: IUserInstance = new User(config.PostgreSQL);
            const userArr: IUserResult[] = await users.getUserByEmail(email);
            if(userArr.length !== 0) {
                return res.status(400).json({
                    message: 'This email already has been used'
                })
            }

            await users.insertUser(userData);

            res.status(201).json({
                message: `User with email: ${email} has been added`
            })
        }
        catch(e) {
            res.status(500).json({
                message: 'Something wrong, try again'
            })
        }
    }
)