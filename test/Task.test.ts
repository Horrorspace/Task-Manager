import Task from '../src/models/Task'
import User from '../src/models/User'
import {IUser, IUserResult, IUserInstance} from '../src/interfaces/user'
import {ITask, ITaskResult, ITaskInstance, ITaskDateToDo, ITaskTitle, ITaskText} from '../src/interfaces/task'
import config from '../src/config/default.json'
import {dateParser, dateStringify} from '../src/models/dateParser'


describe('Task API for PostgreSQL DB', () => {
    const testUser: IUser = {
        name: 'admin',
        email: 'admin@testing.com',
        password: 'test'
    }

    const testTask: ITask = {
        email: testUser.email,
        dateToDo: dateStringify(dateParser('2005-10-19 19:23:54+07')),
        title: 'Testing',
        task: 'Test task'
    }

    const testTask2: ITask = {
        email: testUser.email,
        dateToDo: dateStringify(dateParser('2006-12-11 20:27:48+07')),
        title: 'Complite',
        task: 'Test task complite'
    }
    
    const user: IUserInstance = new User(config.PostgreSQL);
    const task: ITaskInstance = new Task(config.PostgreSQL);

    beforeAll(async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        if(userToTest.length !== 0) {
            const userId = userToTest[0].id;
            const taskTotest: ITaskResult[] = await task.getAllUserTasks(userId);
            if(taskTotest.length !== 0) {
                    await taskTotest.map(async (val) => await task.deleteTask(val.id));
                }
            }
            await user.deleteUser(testUser.email);
        }
    );
    
    afterAll(async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        if(userToTest.length !== 0) {
            const userId = userToTest[0].id;
            const taskTotest: ITaskResult[] = await task.getAllUserTasks(userId);
            if(taskTotest.length !== 0) {
                    await taskTotest.map(async (val) => await task.deleteTask(val.id));
                }
            }
            await user.deleteUser(testUser.email);
        }
    );

    test('Class Tasks is defined', () => {
        expect(Task).toBeDefined();
    });
    
    test('tasks instance is defined', () => {
        expect(task).toBeDefined();
    });

    test('All methods of task is defined', () => {
        expect(task.getAllUserTasks).toBeDefined();
        expect(task.getTaskById).toBeDefined();
        expect(task.getUserPriorityTasks).toBeDefined();
        expect(task.getUserNonPriorityTasks).toBeDefined();
        expect(task.getUserCompleteTasks).toBeDefined();
        expect(task.getUserNonCompleteTasks).toBeDefined();
        expect(task.getUserCancelTasks).toBeDefined();
        expect(task.getUserNonCancelTasks).toBeDefined();
        expect(task.getUserDeleteTasks).toBeDefined();
        expect(task.getUserNonDeleteTasks).toBeDefined();
        expect(task.insertTask).toBeDefined();
        expect(task.togglePriority).toBeDefined();
        expect(task.toggleComplete).toBeDefined();
        expect(task.toggleCancel).toBeDefined();
        expect(task.toggleDelete).toBeDefined();
        expect(task.taskDateToDoUp).toBeDefined();
        expect(task.taskTitleUp).toBeDefined();
        expect(task.taskTextUp).toBeDefined();
        expect(task.deleteTask).toBeDefined();
    });


    test('Method getAllUserTasks should return empty array on the id of testUser at start', async () => {
        await user.insertUser(testUser);
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const res: ITaskResult[] = await task.getAllUserTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(0);
    });

    test('Method getAllUserTasks should return array with testTask after it had been added by insertTask method', async () => {
        await task.insertTask(testTask);
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const res: ITaskResult[] = await task.getAllUserTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(1);
        expect(typeof(res[0])).toEqual('object');
        expect(res[0].hasOwnProperty('id')).toEqual(true);
        expect(res[0].hasOwnProperty('userId')).toEqual(true);
        expect(res[0].hasOwnProperty('created')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfDelete')).toEqual(true);
        expect(res[0].hasOwnProperty('isPriority')).toEqual(true);
        expect(res[0].hasOwnProperty('isComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('isCancel')).toEqual(true);
        expect(res[0].hasOwnProperty('isDelete')).toEqual(true);
        expect(dateStringify(res[0].dateToDo)).toEqual(testTask.dateToDo);
        expect(res[0].title).toEqual(testTask.title);
        expect(res[0].task).toEqual(testTask.task);
        expect(res[0].isPriority).toEqual(false);
        expect(res[0].isComplete).toEqual(false);
        expect(res[0].isCancel).toEqual(false);
        expect(res[0].isDelete).toEqual(false);
    });

    test('Method getTaskById should return array with testTask after it had been added by insertTask method', async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const taskTotest: ITaskResult[] = await task.getAllUserTasks(userId);
        const id = taskTotest[0].id;
        const res: ITaskResult[] = await task.getTaskById(id);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(1);
        expect(typeof(res[0])).toEqual('object');
        expect(res[0].hasOwnProperty('id')).toEqual(true);
        expect(res[0].hasOwnProperty('userId')).toEqual(true);
        expect(res[0].hasOwnProperty('created')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfDelete')).toEqual(true);
        expect(res[0].hasOwnProperty('isPriority')).toEqual(true);
        expect(res[0].hasOwnProperty('isComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('isCancel')).toEqual(true);
        expect(res[0].hasOwnProperty('isDelete')).toEqual(true);
        expect(dateStringify(res[0].dateToDo)).toEqual(testTask.dateToDo);
        expect(res[0].title).toEqual(testTask.title);
        expect(res[0].task).toEqual(testTask.task);
        expect(res[0].isPriority).toEqual(false);
        expect(res[0].isComplete).toEqual(false);
        expect(res[0].isCancel).toEqual(false);
        expect(res[0].isDelete).toEqual(false);
    });

    test('Method getUserPriorityTasks should return empty array at start', async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const res: ITaskResult[] = await task.getUserPriorityTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(0);
    })

    test('Method getUserCompleteTasks should return empty array at start', async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const res: ITaskResult[] = await task.getUserCompleteTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(0);
    })

    test('Method getUserCancelTasks should return empty array at start', async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const res: ITaskResult[] = await task.getUserCancelTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(0);
    })

    test('Method getUserDeleteTasks should return empty array at start', async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const res: ITaskResult[] = await task.getUserDeleteTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(0);
    })

    test('Method getUserNonPriorityTasks should return array with testTask at start', async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const res: ITaskResult[] = await task.getUserNonPriorityTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(1);
        expect(typeof(res[0])).toEqual('object');
        expect(res[0].hasOwnProperty('id')).toEqual(true);
        expect(res[0].hasOwnProperty('userId')).toEqual(true);
        expect(res[0].hasOwnProperty('created')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfDelete')).toEqual(true);
        expect(res[0].hasOwnProperty('isPriority')).toEqual(true);
        expect(res[0].hasOwnProperty('isComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('isCancel')).toEqual(true);
        expect(res[0].hasOwnProperty('isDelete')).toEqual(true);
        expect(dateStringify(res[0].dateToDo)).toEqual(testTask.dateToDo);
        expect(res[0].title).toEqual(testTask.title);
        expect(res[0].task).toEqual(testTask.task);
        expect(res[0].isPriority).toEqual(false);
        expect(res[0].isComplete).toEqual(false);
        expect(res[0].isCancel).toEqual(false);
        expect(res[0].isDelete).toEqual(false);
    });

    test('Method getUserNonCompleteTasks should return array with testTask at start', async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const res: ITaskResult[] = await task.getUserNonCompleteTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(1);
        expect(typeof(res[0])).toEqual('object');
        expect(res[0].hasOwnProperty('id')).toEqual(true);
        expect(res[0].hasOwnProperty('userId')).toEqual(true);
        expect(res[0].hasOwnProperty('created')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfDelete')).toEqual(true);
        expect(res[0].hasOwnProperty('isPriority')).toEqual(true);
        expect(res[0].hasOwnProperty('isComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('isCancel')).toEqual(true);
        expect(res[0].hasOwnProperty('isDelete')).toEqual(true);
        expect(dateStringify(res[0].dateToDo)).toEqual(testTask.dateToDo);
        expect(res[0].title).toEqual(testTask.title);
        expect(res[0].task).toEqual(testTask.task);
        expect(res[0].isPriority).toEqual(false);
        expect(res[0].isComplete).toEqual(false);
        expect(res[0].isCancel).toEqual(false);
        expect(res[0].isDelete).toEqual(false);
    });

    test('Method getUserNonCancelTasks should return array with testTask at start', async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const res: ITaskResult[] = await task.getUserNonCancelTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(1);
        expect(typeof(res[0])).toEqual('object');
        expect(res[0].hasOwnProperty('id')).toEqual(true);
        expect(res[0].hasOwnProperty('userId')).toEqual(true);
        expect(res[0].hasOwnProperty('created')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfDelete')).toEqual(true);
        expect(res[0].hasOwnProperty('isPriority')).toEqual(true);
        expect(res[0].hasOwnProperty('isComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('isCancel')).toEqual(true);
        expect(res[0].hasOwnProperty('isDelete')).toEqual(true);
        expect(dateStringify(res[0].dateToDo)).toEqual(testTask.dateToDo);
        expect(res[0].title).toEqual(testTask.title);
        expect(res[0].task).toEqual(testTask.task);
        expect(res[0].isPriority).toEqual(false);
        expect(res[0].isComplete).toEqual(false);
        expect(res[0].isCancel).toEqual(false);
        expect(res[0].isDelete).toEqual(false);
    });

    test('Method getUserNonDeleteTasks should return array with testTask at start', async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const res: ITaskResult[] = await task.getUserNonDeleteTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(1);
        expect(typeof(res[0])).toEqual('object');
        expect(res[0].hasOwnProperty('id')).toEqual(true);
        expect(res[0].hasOwnProperty('userId')).toEqual(true);
        expect(res[0].hasOwnProperty('created')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfDelete')).toEqual(true);
        expect(res[0].hasOwnProperty('isPriority')).toEqual(true);
        expect(res[0].hasOwnProperty('isComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('isCancel')).toEqual(true);
        expect(res[0].hasOwnProperty('isDelete')).toEqual(true);
        expect(dateStringify(res[0].dateToDo)).toEqual(testTask.dateToDo);
        expect(res[0].title).toEqual(testTask.title);
        expect(res[0].task).toEqual(testTask.task);
        expect(res[0].isPriority).toEqual(false);
        expect(res[0].isComplete).toEqual(false);
        expect(res[0].isCancel).toEqual(false);
        expect(res[0].isDelete).toEqual(false);
    });

    test('Method getUserPriorityTasks should return array with testTask after togglePriority method had been called', async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const taskTotest: ITaskResult[] = await task.getAllUserTasks(userId);
        const id = taskTotest[0].id;
        await task.togglePriority(id);
        const res: ITaskResult[] = await task.getUserPriorityTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(1);
        expect(typeof(res[0])).toEqual('object');
        expect(res[0].hasOwnProperty('id')).toEqual(true);
        expect(res[0].hasOwnProperty('userId')).toEqual(true);
        expect(res[0].hasOwnProperty('created')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfDelete')).toEqual(true);
        expect(res[0].hasOwnProperty('isPriority')).toEqual(true);
        expect(res[0].hasOwnProperty('isComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('isCancel')).toEqual(true);
        expect(res[0].hasOwnProperty('isDelete')).toEqual(true);
        expect(dateStringify(res[0].dateToDo)).toEqual(testTask.dateToDo);
        expect(res[0].title).toEqual(testTask.title);
        expect(res[0].task).toEqual(testTask.task);
        expect(res[0].isPriority).toEqual(true);
        expect(res[0].isComplete).toEqual(false);
        expect(res[0].isCancel).toEqual(false);
        expect(res[0].isDelete).toEqual(false);
    });

    test('Method getUserCompleteTasks should return array with testTask after toggleComplete method had been called', async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const taskTotest: ITaskResult[] = await task.getAllUserTasks(userId);
        const id = taskTotest[0].id;
        await task.toggleComplete(id);
        const res: ITaskResult[] = await task.getUserCompleteTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(1);
        expect(typeof(res[0])).toEqual('object');
        expect(res[0].hasOwnProperty('id')).toEqual(true);
        expect(res[0].hasOwnProperty('userId')).toEqual(true);
        expect(res[0].hasOwnProperty('created')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfDelete')).toEqual(true);
        expect(res[0].hasOwnProperty('isPriority')).toEqual(true);
        expect(res[0].hasOwnProperty('isComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('isCancel')).toEqual(true);
        expect(res[0].hasOwnProperty('isDelete')).toEqual(true);
        expect(dateStringify(res[0].dateToDo)).toEqual(testTask.dateToDo);
        expect(res[0].title).toEqual(testTask.title);
        expect(res[0].task).toEqual(testTask.task);
        expect(res[0].isPriority).toEqual(true);
        expect(res[0].isComplete).toEqual(true);
        expect(res[0].isCancel).toEqual(false);
        expect(res[0].isDelete).toEqual(false);
    });

    test('Method getUserCancelTasks should return array with testTask after toggleCancel method had been called', async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const taskTotest: ITaskResult[] = await task.getAllUserTasks(userId);
        const id = taskTotest[0].id;
        await task.toggleCancel(id);
        const res: ITaskResult[] = await task.getUserCancelTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(1);
        expect(typeof(res[0])).toEqual('object');
        expect(res[0].hasOwnProperty('id')).toEqual(true);
        expect(res[0].hasOwnProperty('userId')).toEqual(true);
        expect(res[0].hasOwnProperty('created')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfDelete')).toEqual(true);
        expect(res[0].hasOwnProperty('isPriority')).toEqual(true);
        expect(res[0].hasOwnProperty('isComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('isCancel')).toEqual(true);
        expect(res[0].hasOwnProperty('isDelete')).toEqual(true);
        expect(dateStringify(res[0].dateToDo)).toEqual(testTask.dateToDo);
        expect(res[0].title).toEqual(testTask.title);
        expect(res[0].task).toEqual(testTask.task);
        expect(res[0].isPriority).toEqual(true);
        expect(res[0].isComplete).toEqual(true);
        expect(res[0].isCancel).toEqual(true);
        expect(res[0].isDelete).toEqual(false);
    });

    test('Method getUserDeleteTasks should return array with testTask after toggleDelete method had been called', async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const taskTotest: ITaskResult[] = await task.getAllUserTasks(userId);
        const id = taskTotest[0].id;
        await task.toggleDelete(id);
        const res: ITaskResult[] = await task.getUserDeleteTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(1);
        expect(typeof(res[0])).toEqual('object');
        expect(res[0].hasOwnProperty('id')).toEqual(true);
        expect(res[0].hasOwnProperty('userId')).toEqual(true);
        expect(res[0].hasOwnProperty('created')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfDelete')).toEqual(true);
        expect(res[0].hasOwnProperty('isPriority')).toEqual(true);
        expect(res[0].hasOwnProperty('isComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('isCancel')).toEqual(true);
        expect(res[0].hasOwnProperty('isDelete')).toEqual(true);
        expect(dateStringify(res[0].dateToDo)).toEqual(testTask.dateToDo);
        expect(res[0].title).toEqual(testTask.title);
        expect(res[0].task).toEqual(testTask.task);
        expect(res[0].isPriority).toEqual(true);
        expect(res[0].isComplete).toEqual(true);
        expect(res[0].isCancel).toEqual(true);
        expect(res[0].isDelete).toEqual(true);
    });

    test('Method getUserNonPriorityTasks should return empty array after togglePriority method had been called', async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const res: ITaskResult[] = await task.getUserNonPriorityTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(0);
    });

    test('Method getUserNonCompleteTasks should return empty array after toggleComplete method had been called', async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const res: ITaskResult[] = await task.getUserNonCompleteTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(0);
    });

    test('Method getUserNonCancelTasks should return empty array after toggleCancel method had been called', async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const res: ITaskResult[] = await task.getUserNonCancelTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(0);
    });

    test('Method getUserNonDeleteTasks should return empty array after toggleDelete method had been called', async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const res: ITaskResult[] = await task.getUserNonDeleteTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(0);
    });

    test('Method getUserPriorityTasks should return empty array after togglePriority method had been called again', async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const taskTotest: ITaskResult[] = await task.getUserPriorityTasks(userId);
        const id = taskTotest[0].id;
        await task.togglePriority(id);
        const res: ITaskResult[] = await task.getUserPriorityTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(0);
    });

    test('Method getUserCompleteTasks should return empty array after toggleComplete method had been called again', async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const taskTotest: ITaskResult[] = await task.getAllUserTasks(userId);
        const id = taskTotest[0].id;
        await task.toggleComplete(id);
        const res: ITaskResult[] = await task.getUserCompleteTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(0);
    });

    test('Method getUserCancelTasks should return empty array after toggleCancel method had been called again', async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const taskTotest: ITaskResult[] = await task.getAllUserTasks(userId);
        const id = taskTotest[0].id;
        await task.toggleCancel(id);
        const res: ITaskResult[] = await task.getUserCancelTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(0);
    });

    test('Method getUserDeleteTasks should return empty array after toggleDelete method had been called again', async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const taskTotest: ITaskResult[] = await task.getAllUserTasks(userId);
        const id = taskTotest[0].id;
        await task.toggleDelete(id);
        const res: ITaskResult[] = await task.getUserDeleteTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(0);
    });

    test('Method getUserNonPriorityTasks should return array with testTask at finish', async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const res: ITaskResult[] = await task.getUserNonPriorityTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(1);
        expect(typeof(res[0])).toEqual('object');
        expect(res[0].hasOwnProperty('id')).toEqual(true);
        expect(res[0].hasOwnProperty('userId')).toEqual(true);
        expect(res[0].hasOwnProperty('created')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfDelete')).toEqual(true);
        expect(res[0].hasOwnProperty('isPriority')).toEqual(true);
        expect(res[0].hasOwnProperty('isComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('isCancel')).toEqual(true);
        expect(res[0].hasOwnProperty('isDelete')).toEqual(true);
        expect(dateStringify(res[0].dateToDo)).toEqual(testTask.dateToDo);
        expect(res[0].title).toEqual(testTask.title);
        expect(res[0].task).toEqual(testTask.task);
        expect(res[0].isPriority).toEqual(false);
        expect(res[0].isComplete).toEqual(false);
        expect(res[0].isCancel).toEqual(false);
        expect(res[0].isDelete).toEqual(false);
    });

    test('Method getUserNonCompleteTasks should return array with testTask at finish', async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const res: ITaskResult[] = await task.getUserNonCompleteTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(1);
        expect(typeof(res[0])).toEqual('object');
        expect(res[0].hasOwnProperty('id')).toEqual(true);
        expect(res[0].hasOwnProperty('userId')).toEqual(true);
        expect(res[0].hasOwnProperty('created')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfDelete')).toEqual(true);
        expect(res[0].hasOwnProperty('isPriority')).toEqual(true);
        expect(res[0].hasOwnProperty('isComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('isCancel')).toEqual(true);
        expect(res[0].hasOwnProperty('isDelete')).toEqual(true);
        expect(dateStringify(res[0].dateToDo)).toEqual(testTask.dateToDo);
        expect(res[0].title).toEqual(testTask.title);
        expect(res[0].task).toEqual(testTask.task);
        expect(res[0].isPriority).toEqual(false);
        expect(res[0].isComplete).toEqual(false);
        expect(res[0].isCancel).toEqual(false);
        expect(res[0].isDelete).toEqual(false);
    });

    test('Method getUserNonCancelTasks should return array with testTask at finish', async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const res: ITaskResult[] = await task.getUserNonCancelTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(1);
        expect(typeof(res[0])).toEqual('object');
        expect(res[0].hasOwnProperty('id')).toEqual(true);
        expect(res[0].hasOwnProperty('userId')).toEqual(true);
        expect(res[0].hasOwnProperty('created')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfDelete')).toEqual(true);
        expect(res[0].hasOwnProperty('isPriority')).toEqual(true);
        expect(res[0].hasOwnProperty('isComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('isCancel')).toEqual(true);
        expect(res[0].hasOwnProperty('isDelete')).toEqual(true);
        expect(dateStringify(res[0].dateToDo)).toEqual(testTask.dateToDo);
        expect(res[0].title).toEqual(testTask.title);
        expect(res[0].task).toEqual(testTask.task);
        expect(res[0].isPriority).toEqual(false);
        expect(res[0].isComplete).toEqual(false);
        expect(res[0].isCancel).toEqual(false);
        expect(res[0].isDelete).toEqual(false);
    });

    test('Method getUserNonDeleteTasks should return array with testTask at finish', async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const res: ITaskResult[] = await task.getUserNonDeleteTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(1);
        expect(typeof(res[0])).toEqual('object');
        expect(res[0].hasOwnProperty('id')).toEqual(true);
        expect(res[0].hasOwnProperty('userId')).toEqual(true);
        expect(res[0].hasOwnProperty('created')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfDelete')).toEqual(true);
        expect(res[0].hasOwnProperty('isPriority')).toEqual(true);
        expect(res[0].hasOwnProperty('isComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('isCancel')).toEqual(true);
        expect(res[0].hasOwnProperty('isDelete')).toEqual(true);
        expect(dateStringify(res[0].dateToDo)).toEqual(testTask.dateToDo);
        expect(res[0].title).toEqual(testTask.title);
        expect(res[0].task).toEqual(testTask.task);
        expect(res[0].isPriority).toEqual(false);
        expect(res[0].isComplete).toEqual(false);
        expect(res[0].isCancel).toEqual(false);
        expect(res[0].isDelete).toEqual(false);
    });

    test('Method taskTitleUp should change title value', async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const taskTotest: ITaskResult[] = await task.getAllUserTasks(userId);
        const id = taskTotest[0].id;
        const taskObj: ITaskTitle = {
            id,
            title: testTask2.title
        }
        await task.taskTitleUp(taskObj);
        const res: ITaskResult[] = await task.getAllUserTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(1);
        expect(typeof(res[0])).toEqual('object');
        expect(res[0].hasOwnProperty('id')).toEqual(true);
        expect(res[0].hasOwnProperty('userId')).toEqual(true);
        expect(res[0].hasOwnProperty('created')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfDelete')).toEqual(true);
        expect(res[0].hasOwnProperty('isPriority')).toEqual(true);
        expect(res[0].hasOwnProperty('isComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('isCancel')).toEqual(true);
        expect(res[0].hasOwnProperty('isDelete')).toEqual(true);
        expect(dateStringify(res[0].dateToDo)).toEqual(testTask.dateToDo);
        expect(res[0].title).toEqual(testTask2.title);
        expect(res[0].task).toEqual(testTask.task);
        expect(res[0].isPriority).toEqual(false);
        expect(res[0].isComplete).toEqual(false);
        expect(res[0].isCancel).toEqual(false);
        expect(res[0].isDelete).toEqual(false);
    });

    test('Method taskTextUp should change task value', async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const taskTotest: ITaskResult[] = await task.getAllUserTasks(userId);
        const id = taskTotest[0].id;
        const taskObj: ITaskText = {
            id,
            task: testTask2.task
        }
        await task.taskTextUp(taskObj);
        const res: ITaskResult[] = await task.getAllUserTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(1);
        expect(typeof(res[0])).toEqual('object');
        expect(res[0].hasOwnProperty('id')).toEqual(true);
        expect(res[0].hasOwnProperty('userId')).toEqual(true);
        expect(res[0].hasOwnProperty('created')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfDelete')).toEqual(true);
        expect(res[0].hasOwnProperty('isPriority')).toEqual(true);
        expect(res[0].hasOwnProperty('isComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('isCancel')).toEqual(true);
        expect(res[0].hasOwnProperty('isDelete')).toEqual(true);
        expect(dateStringify(res[0].dateToDo)).toEqual(testTask.dateToDo);
        expect(res[0].title).toEqual(testTask2.title);
        expect(res[0].task).toEqual(testTask2.task);
        expect(res[0].isPriority).toEqual(false);
        expect(res[0].isComplete).toEqual(false);
        expect(res[0].isCancel).toEqual(false);
        expect(res[0].isDelete).toEqual(false);
    });

    test('Method taskDateToDoUp should change date value', async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const taskTotest: ITaskResult[] = await task.getAllUserTasks(userId);
        const id = taskTotest[0].id;
        const taskObj: ITaskDateToDo = {
            id,
            dateToDo: testTask2.dateToDo
        }
        await task.taskDateToDoUp(taskObj);
        const res: ITaskResult[] = await task.getAllUserTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(1);
        expect(typeof(res[0])).toEqual('object');
        expect(res[0].hasOwnProperty('id')).toEqual(true);
        expect(res[0].hasOwnProperty('userId')).toEqual(true);
        expect(res[0].hasOwnProperty('created')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('dateOfDelete')).toEqual(true);
        expect(res[0].hasOwnProperty('isPriority')).toEqual(true);
        expect(res[0].hasOwnProperty('isComplete')).toEqual(true);
        expect(res[0].hasOwnProperty('isCancel')).toEqual(true);
        expect(res[0].hasOwnProperty('isDelete')).toEqual(true);
        expect(dateStringify(res[0].dateToDo)).toEqual(testTask2.dateToDo);
        expect(res[0].title).toEqual(testTask2.title);
        expect(res[0].task).toEqual(testTask2.task);
        expect(res[0].isPriority).toEqual(false);
        expect(res[0].isComplete).toEqual(false);
        expect(res[0].isCancel).toEqual(false);
        expect(res[0].isDelete).toEqual(false);
    });

    test('Method getUserTasks should return empty array on the id of testUser after he had been deleted by deleteTask method', async () => {
        const userToTest: IUserResult[] = await user.getUserByEmail(testUser.email);
        const userId = userToTest[0].id;
        const taskTotest: ITaskResult[] = await task.getAllUserTasks(userId);
        const id = taskTotest[0].id;
        const email = userToTest[0].email;
        await task.deleteTask(id);
        const res: ITaskResult[] = await task.getAllUserTasks(userId);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(0);
        await user.deleteUser(email);
    });
})
