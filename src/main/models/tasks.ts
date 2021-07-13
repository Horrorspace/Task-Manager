import {Pool, QueryResult} from 'pg'

interface user {
    name: string;
    email: string;
    password: string;
};

interface task {
    email: string;
    dateToDo: string;
    title: string;
    task: string;
}


export default class tasks {
    private static readonly pool: Pool = new Pool({
        user: "admin",
        password: "KQoEgwBi",
        host: "127.0.0.1",
        port: 5432,
        database: "task_manager"
    });
    public static async getAllData(): Promise<QueryResult> {
        const dbData: QueryResult = await tasks.pool.query('SELECT * FROM users;');
        return dbData;
    }
    public static async insertUser({name, email, password}: user): Promise<QueryResult> {
        const insert: QueryResult = await tasks.pool.query(`SELECT user_insert('${name}', '${email}', '${password}')`);
        return insert;
    };
    public static async insertTask({email, dateToDo, title, task}: task): Promise<QueryResult> {
        const insert: QueryResult = await tasks.pool.query(`SELECT task_insert('${email}', '${dateToDo}', '${title}', '${task}')`);
        return insert;
    };
    public static async deleteUser(email: string): Promise<QueryResult> {
        const insert: QueryResult = await tasks.pool.query(`SELECT user_del('${email}')`);
        return insert;
    };
}

const testUser: user = {
    name: 'admin',
    email: 'admin@hey.com',
    password: 'test'
}

async function testFunc(): Promise<void> {
    let result: QueryResult = await tasks.getAllData();
    console.log(result.rows);
    await tasks.insertUser(testUser);
    result = await tasks.getAllData();
    console.log(result.rows);
    await tasks.deleteUser('admin@hey.com');
    result = await tasks.getAllData();
    console.log(result.rows);
}

testFunc();

/*
tasks.getAllData().then(res => console.log(res.rows));
tasks.insertUser(testUser);
tasks.getAllData().then(res => console.log(res.rows));
tasks.deleteUser('admin@hey.com');
tasks.getAllData().then(res => console.log(res.rows));
*/