import {Router} from 'express'
import {check, validationResult} from 'express-validator'
import config from '../config/default.json'
import User from '../models/User'
import {IUser, IUserResult, IEmailChange, IUserName, IUserEmail, IUserPass, IUserInstance, INameChange} from 'interfaces/user'
import passport from 'passport'
import {authMiddleware} from '../middleware/auth.middleware'



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
            successFlash: true,
            successMessage: 'You have been logined',
            failureFlash: true,
            session: true
        }
    ),
    (req, res) => {
        try {
            const user = req.user as IUserResult;
            res.status(200).json(user);
        } 
        catch (e) {
            res.status(500).json({ 
                auth: false,
                message: 'Something wrong, try again' 
            })
        }
    }
)

router.post(
    '/email_update',
    [
        check('email', 'Invalid email')
            .isEmail(),
        check('password', 'Empty password')
            .exists()
    ],
    passport.authenticate(
        'local', {
            successFlash: false,
            successMessage: 'You have been logined',
            failureFlash: false,
            session: false
        }
    ),
    async (req, res) => {
        try {
            const body: IEmailChange = req.body;
            const user = req.user as IUserResult;
            const newEmail = body.newEmail;
            const oldEmail = user.email;

            const users: IUserInstance = new User(config.PostgreSQL);
            await users.userEmailUp({
                id: user.id, 
                email: newEmail
            });

            res.status(200).json({
                message: `Email have been changed from ${oldEmail} to ${newEmail}`
            });
        } 
        catch (e) {
            res.status(500).json({ 
                message: 'Something wrong, try again' 
            })
        }
    }
)

router.post(
    '/name_update',
    [
        check('email', 'Invalid email')
            .isEmail(),
        check('password', 'Empty password')
            .exists()
    ],
    passport.authenticate(
        'local', {
            successFlash: true,
            successMessage: 'You have been logined',
            failureFlash: true,
            session: false
        }
    ),
    async (req, res) => {
        try {
            const body: INameChange = req.body;
            const user = req.user as IUserResult;
            const newName = body.newName;
            const oldname = user.name;

            const users: IUserInstance = new User(config.PostgreSQL);
            await users.userNameUp({
                id: user.id, 
                name: newName
            });

            res.status(200).json({
                message: `Name have been changed from ${oldname} to ${newName}`
            });
        } 
        catch (e) {
            res.status(500).json({ 
                message: 'Something wrong, try again' 
            })
        }
    }
)

router.post(
    '/logout',
    (req, res) => {
        try {
            req.logout();
            res.status(200).json({
                message: 'You have been logouted'
            })
        }
        catch(e) {
            console.error(e);
            res.status(500).json({
                message: 'Something wrong, try again'
            })
        }
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
            const {name, email, password} = userData;

            const users: IUserInstance = new User(config.PostgreSQL);
            const userArr: IUserResult[] = await users.getUserByEmail(email);
            if(userArr.length !== 0) {
                return res.status(400).json({
                    message: 'This email already has been used'
                })
            }
            
            const newUser: IUser = {
                name,
                email,
                password
            }
            await users.insertUser(newUser);

            res.status(201).json({
                message: `User with email: ${email} has been added`
            })
        }
        catch(e) {
            console.error(e);
            res.status(500).json({
                message: 'Something wrong, try again'
            })
        }
    }
)

router.get(
    '/user',
    authMiddleware,
    (req, res) => {
    try {
        const user = req.user as IUserResult;
        console.log(user.id);
        res.status(200).json(user);
    } 
    catch (e) {
        res.status(500).json({ 
            auth: false,
            message: 'Something wrong, try again' 
        })
    }
})
