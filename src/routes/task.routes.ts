import {Router} from 'express'
import User from '../models/User'
import Task from '../models/Task'
import {IUser, IUserResult, IUserName, IUserEmail, IUserPass, IUserInstance} from 'interfaces/user'
import {ITask, ITaskResult, ITaskInstance, ITaskId, ITaskDateToDo, ITaskTitle, ITaskText} from 'interfaces/task'
import {dateParser, dateStringify} from '../models/dateParser'
import config from '../config/default.json'
import {authMiddleware} from '../middleware/auth.middleware'


export const router: Router = Router();

router.get(
    '/all_tasks',
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

router.get(
    '/priority_tasks',
    authMiddleware,
    async (req, res) => {
        try {
            const userData = req.user as IUserResult;
            const tasks: ITaskInstance = new Task(config.PostgreSQL);
            const result: ITaskResult[] = await tasks.getUserPriorityTasks(userData.id);
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

router.post(
    '/add_task',
    authMiddleware,
    async (req, res) => {
        try {
            const userData = req.user as IUserResult;
            const newTask: ITask = req.body;
            const tasks: ITaskInstance = new Task(config.PostgreSQL);
            if(userData.email !== newTask.email) {
                throw 'wrong email'
            }
            await tasks.insertTask(newTask);
            const message = `Task "${newTask.task}" have been added`;
            res.status(200).json({
                message
            });
        }
        catch(e) {
            console.error(e);
            res.status(500).json({
                message: 'Something wrong, try again'
            })
        }
    }
)

router.put(
    '/toggle_priority',
    authMiddleware,
    async (req, res) => {
        try {
            const userData = req.user as IUserResult;
            const taskData: ITaskId = req.body
            const {id} = taskData;
            const tasks: ITaskInstance = new Task(config.PostgreSQL);
            const taskArr: ITaskResult[] = await tasks.getTaskById(id);
            if(taskArr.length === 0) {
                throw `Task doesn't exist`
            }
            const taskToToggle: ITaskResult = taskArr[0];
            if(userData.id !== taskToToggle.userId) {
                throw 'wrong data'
            }
            await tasks.togglePriority(id);
            const message = `Priority of task "${taskToToggle.task}" have been changed`;
            res.status(200).json({
                message
            });
        }
        catch(e) {
            console.error(e);
            res.status(500).json({
                message: 'Something wrong, try again'
            })
        }
    }
)