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
    };
    public static async getUser(email: string): Promise<QueryResult> {
        const dbData: QueryResult = await tasks.pool.query(`SELECT * FROM users WHERE email = '${email}';`);
        return dbData;
    };
    public static async getUserTasks(id: number): Promise<QueryResult> {
        const dbData: QueryResult = await tasks.pool.query(`SELECT * FROM tasks WHERE id = '${id}';`);
        return dbData;
    };
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
    public static async deleteTask(id: number): Promise<QueryResult> {
        const insert: QueryResult = await tasks.pool.query(`SELECT task_del('${id}')`);
        return insert;
    };
}



/*
const testUser: user = {
    name: 'admin',
    email: 'admin@hey.com',
    password: 'test'
}


async function testFunc(): Promise<void> {
    let result: QueryResult = await tasks.getAllData();
    console.log(result.rows);
    await tasks.insertUser(testUser);
    result = await tasks.getUser('admin@hey.com');
    console.log(result.rows);
    result = await tasks.getAllData();
    console.log(result.rows);
    await tasks.deleteUser('admin@hey.com');
    result = await tasks.getAllData();
    console.log(result.rows);
}
*/

async function testFunc1(): Promise<void> {
    let result: QueryResult = await tasks.getUser('admin@hey.com');
    console.log(result.rows);
}


testFunc1();

/*
tasks.getAllData().then(res => console.log(res.rows));
tasks.insertUser(testUser);
tasks.getAllData().then(res => console.log(res.rows));
tasks.deleteUser('admin@hey.com');
tasks.getAllData().then(res => console.log(res.rows));
*/