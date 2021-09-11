import {Router} from 'express'
import Task from '../models/Task'
import {IUserResult} from 'interfaces/user'
import {ITask, ITaskResult, ITaskInstance, ITaskId, ITaskEdit, ITaskTitle, ITaskText, ITaskDateToDo} from 'interfaces/task'
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

router.get(
    '/non_priority_tasks',
    authMiddleware,
    async (req, res) => {
        try {
            const userData = req.user as IUserResult;
            const tasks: ITaskInstance = new Task(config.PostgreSQL);
            const result: ITaskResult[] = await tasks.getUserNonPriorityTasks(userData.id);
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
    '/complete_tasks',
    authMiddleware,
    async (req, res) => {
        try {
            const userData = req.user as IUserResult;
            const tasks: ITaskInstance = new Task(config.PostgreSQL);
            const result: ITaskResult[] = await tasks.getUserCompleteTasks(userData.id);
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
    '/non_complete_tasks',
    authMiddleware,
    async (req, res) => {
        try {
            const userData = req.user as IUserResult;
            const tasks: ITaskInstance = new Task(config.PostgreSQL);
            const result: ITaskResult[] = await tasks.getUserNonCompleteTasks(userData.id);
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
    '/cancel_tasks',
    authMiddleware,
    async (req, res) => {
        try {
            const userData = req.user as IUserResult;
            const tasks: ITaskInstance = new Task(config.PostgreSQL);
            const result: ITaskResult[] = await tasks.getUserCancelTasks(userData.id);
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
    '/non_cancel_tasks',
    authMiddleware,
    async (req, res) => {
        try {
            const userData = req.user as IUserResult;
            const tasks: ITaskInstance = new Task(config.PostgreSQL);
            const result: ITaskResult[] = await tasks.getUserNonCancelTasks(userData.id);
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
    '/delete_tasks',
    authMiddleware,
    async (req, res) => {
        try {
            const userData = req.user as IUserResult;
            const tasks: ITaskInstance = new Task(config.PostgreSQL);
            const result: ITaskResult[] = await tasks.getUserDeleteTasks(userData.id);
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
    '/non_delete_tasks',
    authMiddleware,
    async (req, res) => {
        try {
            const userData = req.user as IUserResult;
            const tasks: ITaskInstance = new Task(config.PostgreSQL);
            const result: ITaskResult[] = await tasks.getUserNonDeleteTasks(userData.id);
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
            const newTaskRaw: ITask = req.body;
            const newTask: ITask = {
                ...newTaskRaw,
                dateToDo: dateStringify(dateParser(newTaskRaw.dateToDo))
            }
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

router.put(
    '/toggle_complete',
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
            await tasks.toggleComplete(id);
            const message = `Complite status of task "${taskToToggle.task}" have been changed`;
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
    '/toggle_cancel',
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
            await tasks.toggleCancel(id);
            const message = `Cancel status of task "${taskToToggle.task}" have been changed`;
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

router.delete(
    '/delete_task',
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
            await tasks.toggleDelete(id);
            const message = `Task "${taskToToggle.task}" have been deleted`;
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
    '/edit_task',
    authMiddleware,
    async (req, res) => {
        try {
            const userData = req.user as IUserResult;
            const editTask: ITaskEdit = req.body;
            const tasks: ITaskInstance = new Task(config.PostgreSQL);
            const taskArr: ITaskResult[] = await tasks.getTaskById(editTask.id);
            if(taskArr.length === 0) {
                throw `Task doesn't exist`
            }
            if(userData.email !== editTask.email) {
                throw 'wrong email'
            }
            const taskToEdit: ITaskResult = taskArr[0];
            if(userData.id !== taskToEdit.userId) {
                throw 'wrong data'
            }
            if(taskToEdit.id !== editTask.id) {
                throw 'wrong id'
            }
            const id: number = taskToEdit.id;
            if(dateParser(editTask.dateToDo) !== taskToEdit.dateToDo) {
                const taskData: ITaskDateToDo = {
                    id,
                    dateToDo: dateStringify(dateParser(editTask.dateToDo))
                }
                await tasks.taskDateToDoUp(taskData)
            }
            if(editTask.task !== taskToEdit.task) {
                const taskData: ITaskText = {
                    id,
                    task: editTask.task
                }
                await tasks.taskTextUp(taskData)
            }
            if(editTask.title !== taskToEdit.title) {
                const taskData: ITaskTitle = {
                    id,
                    title: editTask.title
                }
                await tasks.taskTitleUp(taskData)
            }

            const message = `Task have been changed`;
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
