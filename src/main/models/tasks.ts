import {Pool, QueryResult, QueryResultRow} from 'pg'
import {IUser, IUserResult, IUserName, IUserEmail, IUserPass} from 'src/main/interfaces/user'
import {ITask, ITaskResult, ITaskDateToDo, ITaskTitle, ITaskText} from 'src/main/interfaces/task'


export default class tasks {
    private static readonly pool: Pool = new Pool({
        user: "admin",
        password: "KQoEgwBi",
        host: "127.0.0.1",
        port: 5432,
        database: "task_manager"
    });
    public static async getUser(email: string): Promise<IUserResult[]> {
        const dbData: QueryResult = await tasks.pool.query(`SELECT * FROM users WHERE email = '${email}';`);
        const resultRows: QueryResultRow = dbData.rows;
        return resultRows as IUserResult[];
    };
    public static async getUserTasks(id: number): Promise<ITaskResult[]> {
        const dbData: QueryResult = await tasks.pool.query(`SELECT * FROM tasks WHERE user_id = ${id};`);
        const resultRows: QueryResultRow = dbData.rows;
        return resultRows as ITaskResult[];
    };
    public static async insertUser({name, email, password}: IUser): Promise<QueryResult> {
        const insert: QueryResult = await tasks.pool.query(`SELECT user_insert('${name}', '${email}', '${password}');`);
        return insert;
    };
    public static async insertTask({email, dateToDo, title, task}: ITask): Promise<QueryResult> {
        const insert: QueryResult = await tasks.pool.query(`SELECT task_insert('${email}', '${dateToDo}', '${title}', '${task}');`);
        return insert;
    };
    public static async togglePriority(id: number): Promise<QueryResult> {
        const insert: QueryResult = await tasks.pool.query(`SELECT toggle_priority(${id});`);
        return insert;
    };
    public static async toggleComplete(id: number): Promise<QueryResult> {
        const insert: QueryResult = await tasks.pool.query(`SELECT toggle_complete(${id});`);
        return insert;
    };
    public static async toggleCancel(id: number): Promise<QueryResult> {
        const insert: QueryResult = await tasks.pool.query(`SELECT toggle_cancel(${id});`);
        return insert;
    };
    public static async toggleDelete(id: number): Promise<QueryResult> {
        const insert: QueryResult = await tasks.pool.query(`SELECT toggle_delete(${id});`);
        return insert;
    };
    public static async userNameUp({id, name}: IUserName): Promise<QueryResult> {
        const insert: QueryResult = await tasks.pool.query(`SELECT name_up(${id}, '${name}');`);
        return insert;
    };
    public static async userEmailUp({id, email}: IUserEmail): Promise<QueryResult> {
        const insert: QueryResult = await tasks.pool.query(`SELECT email_up(${id}, '${email}');`);
        return insert;
    };
    public static async userPassUp({id, pass}: IUserPass): Promise<QueryResult> {
        const insert: QueryResult = await tasks.pool.query(`SELECT pass_up(${id}, '${pass}');`);
        return insert;
    };
    public static async taskDateToDoUp({id, dateToDo}: ITaskDateToDo): Promise<QueryResult> {
        const insert: QueryResult = await tasks.pool.query(`SELECT date_todo_up(${id}, '${dateToDo}');`);
        return insert;
    };
    public static async taskTitleUp({id, title}: ITaskTitle): Promise<QueryResult> {
        const insert: QueryResult = await tasks.pool.query(`SELECT title_up(${id}, '${title}');`);
        return insert;
    };
    public static async taskTextUp({id, task}: ITaskText): Promise<QueryResult> {
        const insert: QueryResult = await tasks.pool.query(`SELECT task_up(${id}, '${task}');`);
        return insert;
    };
    public static async deleteUser(email: string): Promise<QueryResult> {
        const insert: QueryResult = await tasks.pool.query(`SELECT user_del('${email}');`);
        return insert;
    };
    public static async deleteTask(id: number): Promise<QueryResult> {
        const insert: QueryResult = await tasks.pool.query(`SELECT task_del(${id});`);
        return insert;
    };
}



/*
const testUser: IUser = {
    name: 'admin',
    email: 'admin@test.com',
    password: 'test'
}


async function testFunc1(): Promise<void> {
    let result: IUserResult[] = await tasks.getUser('admin@test.com');
    console.log(result);
    await tasks.insertUser(testUser);
    result = await tasks.getUser('admin@hey.com');
    console.log(result);
    await tasks.deleteUser('admin@hey.com');
    result = await tasks.getUser('admin@hey.com');
    console.log(result);
}


testFunc1();
*/