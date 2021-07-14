import tasks from 'src/main/models/tasks'
import {IUser, IUserResult} from 'src/main/interfaces/user'
//import {ITask, ITaskResult, ITaskDateToDo, ITaskTitle, ITaskText} from 'src/main/interfaces/task'


describe('Task api for PostgreSQL DB', () => {
    const testUser: IUser = {
        name: 'admin',
        email: 'admin@test.com',
        password: 'test'
    };

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

    test('Method getUser should return empty array on the testUser', async () => {
        const res: IUserResult[] = await tasks.getUser(testUser.email);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(0);
    });

    test('Method getUser should return array with testUser after he had been added', async () => {
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
})