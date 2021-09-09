import {Router} from 'express'
import User from '../models/User'
import Task from '../models/Task'
import {IUser, IUserResult, IUserName, IUserEmail, IUserPass, IUserInstance} from 'interfaces/user'
import {ITask, ITaskResult, ITaskInstance, ITaskDateToDo, ITaskTitle, ITaskText} from 'interfaces/task'
import {dateParser, dateStringify} from '../models/dateParser'
import config from '../config/default.json'
import {authMiddleware} from '../middleware/auth.middleware'


export const router: Router = Router();

router.get(
    '/',
    authMiddleware,
    async (req, res) => {
        try {
            const userData = req.user as IUserResult;
            const tasks: ITaskInstance = new Task(config.PostgreSQL);
            const result: ITaskResult[] = await tasks.getAllUserTasks(userData.id);
            res.status(200).json(result);
        }
        catch(e) {
            console.error(e);
            res.status(500).json({
                message: 'Something wrong, try again'
            })
        }
    }
)