import express from 'express'
import path from 'path'
import {IConf} from './interfaces/config'
import config from './config/default.json'
import cors, { CorsOptions } from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'
import {localStrategy} from './auth/local'
import {router as authRouter} from './routes/auth.routes'
import {router as taskRouter} from './routes/task.routes'
import {IUser, IUserResult, IUserName, IUserEmail, IUserPass, IUserInstance} from 'interfaces/user'
import User from './models/User'
import { cookie } from 'express-validator'
import {authMiddleware} from './middleware/auth.middleware'
import connectSequelize from 'connect-session-sequelize'
import {Sequelize} from 'sequelize'

const SequelizeStore = connectSequelize(session.Store);
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    database: 'sessions',
    username: 'admin',
    password: 'KQoEgwBi'
});
const sessionStore = new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 60*60*1000,
    expiration: 24*60*60*1000
})


config as IConf;

const PORT: number = config.port || 3007;
const app = express();
const __dirname: string = path.dirname(__filename);

const corsOptions: CorsOptions = {
    origin: '*',
    allowedHeaders: ['Content-Type',
     'X-Custom-Header',
     'x-requested-with',
     'Host',
     'User-Agent',
     'Accept',
     'Accept-Encoding',
     'Accept-Language',
     'Access-Control-Request-Headers',
     'Access-Control-Request-Method',
     'Proxy-Authorization',
     'Proxy-Connection',
     'Referer',
     'Sec-Fetch-Mode',
     'User-Agent',
     'Connection'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
    credentials: true,
    preflightContinue: true
}

app.use((req, res, next) => {
    console.log(req.method);
    next()
})

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use(session({
    secret: "cats and dogs",
    store: sessionStore,
    resave: false,
    proxy: false,
    saveUninitialized: false,
    
}));
sessionStore.sync();


app.use(passport.initialize());
app.use(passport.session());
passport.use(localStrategy);
passport.serializeUser((exUser: Express.User, done) => {
    try {
        const user = exUser as IUserResult
        done(null, user.id)
    }
    catch(e) {
      done(e)
    }
    
});
passport.deserializeUser(async (id: number, done) => {
    try {
        const users: IUserInstance = new User(config.PostgreSQL);
        const userArr: IUserResult[] = await users.getUserById(id);
        if(userArr.length === 0) {
            throw 'Incorrect user id'
        }
        else {
            console.log(userArr[0]);
            done(null, userArr[0])
        }
    }
    catch(e) {
        done(e)
    }
});

app.get('/', (req, res) => {
    try {
      const test = {
        message: 'OK'
      };
      res.json(test);
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

app.get(
    '/test',
    (req, res, next) => {
        console.log(req.session.id, req.session.cookie, req.sessionID);
        next()
    },
    authMiddleware,
    (req, res) => {
    try {
        const user = req.user as IUserResult;
        console.log(user.id);
        const test = {
            message: 'test'
        };
      res.json(test);
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

app.options('*', (req, res) => {
    res.status(204).send();
})

app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);


// app.get('*', (req, res) => {
//     console.log(req.url);
//     res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
// })
  

async function start(): Promise<void> {
    try {
        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}...`);
        });
    }
    catch(e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start();
