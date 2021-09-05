import {Router} from 'express'
import User from '../models/User'
import Task from '../models/Task'
import {IUser, IUserResult, IUserName, IUserEmail, IUserPass, IUserInstance} from 'interfaces/user'
import {ITask, ITaskResult, ITaskInstance, ITaskDateToDo, ITaskTitle, ITaskText} from 'interfaces/task'
import {dateParser, dateStringify} from '../models/dateParser'
import config from '../config/default.json'


export const router: Router = Router();

router.get(
    '/',
    async (req, res) => {
        try {
            
        }
        catch(e) {
            console.error(e);
            res.status(500).json({
                message: 'Something wrong, try again'
            })
        }
    }
)