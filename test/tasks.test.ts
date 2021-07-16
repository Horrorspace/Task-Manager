import tasks from 'src/main/models/tasks'
import {IUser, IUserResult} from 'src/main/interfaces/user'
import {ITask, ITaskResult} from 'src/main/interfaces/task'


describe('Task API for PostgreSQL DB', () => {
    const testUser: IUser = {
        name: 'admin',
        email: 'admin@testing.com',
        password: 'test'
    };

    const testTask: ITask = {
        email: testUser.email,
        dateToDo: '2005-10-19 19:23:54+07',
        title: 'Testing',
        task: 'Test task'
    }

    beforeAll(async () => {
        const res: IUserResult[] = await tasks.getUser(testUser.email);
        if(res.length !== 0) {
            await tasks.deleteUser(testUser.email);
        }
    });

    test('Class tasks is defined', () => {
        expect(tasks).toBeDefined();
    });

    test('All methods of tasks is defined', () => {
        expect(tasks.getUser).toBeDefined();
        expect(tasks.getUserTasks).toBeDefined();
        expect(tasks.insertTask).toBeDefined();
        expect(tasks.insertUser).toBeDefined();
        expect(tasks.taskDateToDoUp).toBeDefined();
        expect(tasks.taskTextUp).toBeDefined();
        expect(tasks.taskTitleUp).toBeDefined();
        expect(tasks.toggleCancel).toBeDefined();
        expect(tasks.toggleComplete).toBeDefined();
        expect(tasks.toggleDelete).toBeDefined();
        expect(tasks.togglePriority).toBeDefined();
        expect(tasks.userEmailUp).toBeDefined();
        expect(tasks.userNameUp).toBeDefined();
        expect(tasks.userPassUp).toBeDefined();
    });

    test('Method getUser should return empty array on the testUser at start', async () => {
        const res: IUserResult[] = await tasks.getUser(testUser.email);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(0);
    });

    test('Method getUser should return array with testUser after he had been added by insertUser method', async () => {
        await tasks.insertUser(testUser);
        const res: IUserResult[] = await tasks.getUser(testUser.email);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(1);
        expect(typeof(res[0])).toEqual('object');
        expect(res[0].hasOwnProperty('id')).toEqual(true);
        expect(res[0].hasOwnProperty('name')).toEqual(true);
        expect(res[0].hasOwnProperty('email')).toEqual(true);
        expect(res[0].hasOwnProperty('password')).toEqual(true);
        expect(res[0].name).toEqual(testUser.name);
        expect(res[0].email).toEqual(testUser.email);
        expect(res[0].password).toEqual(testUser.password);
    });

    test('Method getUserTasks should return empty array on the id of testUser at start', async () => {
        const user: IUserResult[] = await tasks.getUser(testUser.email);
        const res: ITaskResult[] = await tasks.getUserTasks(user[0].id);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(0);
    });

    test('Method getUserTasks should return array with testTask after it had been added by insertTask method', async () => {
        await tasks.insertTask(testTask);
        const user: IUserResult[] = await tasks.getUser(testUser.email);
        const res: ITaskResult[] = await tasks.getUserTasks(user[0].id);
        console.log(res[0].dateToDo);
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
        expect(res[0].dateToDo).toEqual(testTask.dateToDo);
        expect(res[0].title).toEqual(testTask.title);
        expect(res[0].task).toEqual(testTask.task);
        expect(res[0].isPriority).toEqual(false);
        expect(res[0].isComplete).toEqual(false);
        expect(res[0].isCancel).toEqual(false);
        expect(res[0].isDelete).toEqual(false);
    });

    test('Method getUserTasks should return array with testTask containing property isPriority with value TRUE after togglePriority method had been called', async () => {
        const user: IUserResult[] = await tasks.getUser(testUser.email);
        const userTasks: ITaskResult[] = await tasks.getUserTasks(user[0].id);
        await tasks.togglePriority(userTasks[0].id);
        const res: ITaskResult[] = await tasks.getUserTasks(user[0].id);
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
        expect(res[0].dateToDo).toEqual(testTask.dateToDo);
        expect(res[0].title).toEqual(testTask.title);
        expect(res[0].task).toEqual(testTask.task);
        expect(res[0].isPriority).toEqual(true);
        expect(res[0].isComplete).toEqual(false);
        expect(res[0].isCancel).toEqual(false);
        expect(res[0].isDelete).toEqual(false);
    });

    test('Method getUserTasks should return array with testTask containing property isPriority with value FALSE after togglePriority method had been called again', async () => {
        const user: IUserResult[] = await tasks.getUser(testUser.email);
        const userTasks: ITaskResult[] = await tasks.getUserTasks(user[0].id);
        await tasks.togglePriority(userTasks[0].id);
        const res: ITaskResult[] = await tasks.getUserTasks(user[0].id);
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
        expect(res[0].dateToDo).toEqual(testTask.dateToDo);
        expect(res[0].title).toEqual(testTask.title);
        expect(res[0].task).toEqual(testTask.task);
        expect(res[0].isPriority).toEqual(false);
        expect(res[0].isComplete).toEqual(false);
        expect(res[0].isCancel).toEqual(false);
        expect(res[0].isDelete).toEqual(false);
    });

    test('Method getUserTasks should return array with testTask containing property isComplete with value TRUE after toggleComplete method had been called', async () => {
        const user: IUserResult[] = await tasks.getUser(testUser.email);
        const userTasks: ITaskResult[] = await tasks.getUserTasks(user[0].id);
        await tasks.toggleComplete(userTasks[0].id);
        const res: ITaskResult[] = await tasks.getUserTasks(user[0].id);
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
        expect(res[0].dateToDo).toEqual(testTask.dateToDo);
        expect(res[0].title).toEqual(testTask.title);
        expect(res[0].task).toEqual(testTask.task);
        expect(res[0].isPriority).toEqual(false);
        expect(res[0].isComplete).toEqual(true);
        expect(res[0].isCancel).toEqual(false);
        expect(res[0].isDelete).toEqual(false);
    });

    test('Method getUserTasks should return array with testTask containing property isComplete with value FALSE after toggleComplete method had been called again', async () => {
        const user: IUserResult[] = await tasks.getUser(testUser.email);
        const userTasks: ITaskResult[] = await tasks.getUserTasks(user[0].id);
        await tasks.toggleComplete(userTasks[0].id);
        const res: ITaskResult[] = await tasks.getUserTasks(user[0].id);
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
        expect(res[0].dateToDo).toEqual(testTask.dateToDo);
        expect(res[0].title).toEqual(testTask.title);
        expect(res[0].task).toEqual(testTask.task);
        expect(res[0].isPriority).toEqual(false);
        expect(res[0].isComplete).toEqual(false);
        expect(res[0].isCancel).toEqual(false);
        expect(res[0].isDelete).toEqual(false);
    });

    test('Method getUserTasks should return array with testTask containing property isCancel with value TRUE after toggleCancel method had been called', async () => {
        const user: IUserResult[] = await tasks.getUser(testUser.email);
        const userTasks: ITaskResult[] = await tasks.getUserTasks(user[0].id);
        await tasks.toggleCancel(userTasks[0].id);
        const res: ITaskResult[] = await tasks.getUserTasks(user[0].id);
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
        expect(res[0].dateToDo).toEqual(testTask.dateToDo);
        expect(res[0].title).toEqual(testTask.title);
        expect(res[0].task).toEqual(testTask.task);
        expect(res[0].isPriority).toEqual(false);
        expect(res[0].isComplete).toEqual(false);
        expect(res[0].isCancel).toEqual(true);
        expect(res[0].isDelete).toEqual(false);
    });

    test('Method getUserTasks should return array with testTask containing property isCancel with value FALSE after toggleCancel method had been called again', async () => {
        const user: IUserResult[] = await tasks.getUser(testUser.email);
        const userTasks: ITaskResult[] = await tasks.getUserTasks(user[0].id);
        await tasks.toggleCancel(userTasks[0].id);
        const res: ITaskResult[] = await tasks.getUserTasks(user[0].id);
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
        expect(res[0].dateToDo).toEqual(testTask.dateToDo);
        expect(res[0].title).toEqual(testTask.title);
        expect(res[0].task).toEqual(testTask.task);
        expect(res[0].isPriority).toEqual(false);
        expect(res[0].isComplete).toEqual(false);
        expect(res[0].isCancel).toEqual(false);
        expect(res[0].isDelete).toEqual(false);
    });

    test('Method getUserTasks should return array with testTask containing property isDelete with value TRUE after toggleDelete method had been called', async () => {
        const user: IUserResult[] = await tasks.getUser(testUser.email);
        const userTasks: ITaskResult[] = await tasks.getUserTasks(user[0].id);
        await tasks.toggleDelete(userTasks[0].id);
        const res: ITaskResult[] = await tasks.getUserTasks(user[0].id);
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
        expect(res[0].dateToDo).toEqual(testTask.dateToDo);
        expect(res[0].title).toEqual(testTask.title);
        expect(res[0].task).toEqual(testTask.task);
        expect(res[0].isPriority).toEqual(false);
        expect(res[0].isComplete).toEqual(false);
        expect(res[0].isCancel).toEqual(false);
        expect(res[0].isDelete).toEqual(true);
    });

    test('Method getUserTasks should return array with testTask containing property isDelete with value FALSE after toggleDelete method had been called again', async () => {
        const user: IUserResult[] = await tasks.getUser(testUser.email);
        const userTasks: ITaskResult[] = await tasks.getUserTasks(user[0].id);
        await tasks.toggleDelete(userTasks[0].id);
        const res: ITaskResult[] = await tasks.getUserTasks(user[0].id);
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
        expect(res[0].dateToDo).toEqual(testTask.dateToDo);
        expect(res[0].title).toEqual(testTask.title);
        expect(res[0].task).toEqual(testTask.task);
        expect(res[0].isPriority).toEqual(false);
        expect(res[0].isComplete).toEqual(false);
        expect(res[0].isCancel).toEqual(false);
        expect(res[0].isDelete).toEqual(false);
    });

    test('Method getUserTasks should return empty array on the id of testUser after he had been deleted by deleteTask method', async () => {
        const user: IUserResult[] = await tasks.getUser(testUser.email);
        const userTasks: ITaskResult[] = await tasks.getUserTasks(user[0].id);
        await tasks.deleteTask(userTasks[0].id);
        const res: ITaskResult[] = await tasks.getUserTasks(user[0].id);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(0);
    });

    test('Method getUser should return empty array on the testUser after he had been deleted by deleteUser method', async () => {
        await tasks.deleteUser(testUser.email);
        const res: IUserResult[] = await tasks.getUser(testUser.email);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(0);
    });
})