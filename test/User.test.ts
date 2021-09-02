import User from '../src/models/User'
import {IUser, IUserResult, IUserName, IUserEmail, IUserPass, IUserInstance} from '../src/interfaces/user'
import config from '../src/config/default.json'


describe('User API for PostgreSQL DB', () => {
    const testUser: IUser = {
        name: 'admin',
        email: 'admin@testing.com',
        password: 'test'
    };

    const testUser2: IUser = {
        name: 'user',
        email: 'user@testing.com',
        password: '1111'
    };

    const user: IUserInstance = new User(config.PostgreSQL);

    beforeAll(async () => {
        const res: IUserResult[] = await user.getUserByEmail(testUser.email);
        if(res.length !== 0) {
            await user.deleteUser(testUser.email);
        }
        const res2: IUserResult[] = await user.getUserByEmail(testUser2.email);
        if(res2.length !== 0) {
            await user.deleteUser(testUser2.email);
        }
    });
    
    test('Class User is defined', () => {
        expect(User).toBeDefined();
    });

    test('user instance is defined', () => {
        expect(user).toBeDefined();
    });

    test('All methods of user is defined', () => {
        expect(user.getAllUsers).toBeDefined();
        expect(user.getUserByEmail).toBeDefined();
        expect(user.getUserById).toBeDefined();
        expect(user.insertUser).toBeDefined();
        expect(user.userNameUp).toBeDefined();
        expect(user.userEmailUp).toBeDefined();
        expect(user.userPassUp).toBeDefined();
        expect(user.deleteUser).toBeDefined();
    });
    
    test('Method getAllUsers should return array at start', async () => {
        const res: IUserResult[] = await user.getAllUsers();
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
    });

    test('Method getUserByEmail should return empty array on the testUser at start', async () => {
        const res: IUserResult[] = await user.getUserByEmail(testUser.email);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(0);
    });

    test('Method getUserByEmail should return array on testUser after he had been added by insertUser method', async () => {
        await user.insertUser(testUser);
        const res: IUserResult[] = await user.getUserByEmail(testUser.email);
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
    
    test('Method getAllUsers should return non-empty array after user insert', async () => {
        const res: IUserResult[] = await user.getAllUsers();
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toBeGreaterThan(0);
    });

    test('Method getUserById should return array on the testUser', async () => {
        const targetUser: IUserResult[] = await user.getUserByEmail(testUser.email);
        const id: number = targetUser[0].id;
        const res: IUserResult[] = await user.getUserById(id);
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

    test('Method userNameUp should change name', async () => {
        const targetUser: IUserResult[] = await user.getUserByEmail(testUser.email);
        const id: number = targetUser[0].id;
        const changeObj: IUserName = {
            id,
            name: testUser2.name
        };
        await user.userNameUp(changeObj);
        const res: IUserResult[] = await user.getUserById(id);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(1);
        expect(typeof(res[0])).toEqual('object');
        expect(res[0].hasOwnProperty('id')).toEqual(true);
        expect(res[0].hasOwnProperty('name')).toEqual(true);
        expect(res[0].hasOwnProperty('email')).toEqual(true);
        expect(res[0].hasOwnProperty('password')).toEqual(true);
        expect(res[0].name).toEqual(testUser2.name);
        expect(res[0].email).toEqual(testUser.email);
        expect(res[0].password).toEqual(testUser.password);
    });

    test('Method userEmailUp should change email', async () => {
        const targetUser: IUserResult[] = await user.getUserByEmail(testUser.email);
        const id: number = targetUser[0].id;
        const changeObj: IUserEmail = {
            id,
            email: testUser2.email
        };
        await user.userEmailUp(changeObj);
        const res: IUserResult[] = await user.getUserById(id);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(1);
        expect(typeof(res[0])).toEqual('object');
        expect(res[0].hasOwnProperty('id')).toEqual(true);
        expect(res[0].hasOwnProperty('name')).toEqual(true);
        expect(res[0].hasOwnProperty('email')).toEqual(true);
        expect(res[0].hasOwnProperty('password')).toEqual(true);
        expect(res[0].name).toEqual(testUser2.name);
        expect(res[0].email).toEqual(testUser2.email);
        expect(res[0].password).toEqual(testUser.password);
    });

    test('Method userPassUp should change password', async () => {
        const targetUser: IUserResult[] = await user.getUserByEmail(testUser2.email);
        const id: number = targetUser[0].id;
        const changeObj: IUserPass = {
            id,
            pass: testUser2.password
        };
        await user.userPassUp(changeObj);
        const res: IUserResult[] = await user.getUserById(id);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(1);
        expect(typeof(res[0])).toEqual('object');
        expect(res[0].hasOwnProperty('id')).toEqual(true);
        expect(res[0].hasOwnProperty('name')).toEqual(true);
        expect(res[0].hasOwnProperty('email')).toEqual(true);
        expect(res[0].hasOwnProperty('password')).toEqual(true);
        expect(res[0].name).toEqual(testUser2.name);
        expect(res[0].email).toEqual(testUser2.email);
        expect(res[0].password).toEqual(testUser2.password);
    });

    test('Method getUserByEmail should return empty array on the testUser after he had been deleted by deleteUser method', async () => {
        await user.deleteUser(testUser.email);
        const res: IUserResult[] = await user.getUserByEmail(testUser.email);
        expect(typeof(res)).toEqual('object');
        expect(Array.isArray(res)).toEqual(true);
        expect(res.length).toEqual(0);
        await user.deleteUser(testUser2.email);
    });
})
