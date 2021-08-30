import {Pool, QueryResult, QueryResultRow} from 'pg'
import pg from 'pg'
import {IUser, IUserResult, IUserName, IUserEmail, IUserPass} from 'interfaces/user'
import PG from 'models/abstractPG'
import {IPostgreSQLConf} from 'interfaces/config'


export default class Users extends PG {
    constructor(config: IPostgreSQLConf) {
        super(config)
    }

    public async getAllUsers(): Promise<IUserResult[]> {
        const dbData: QueryResult = await this.pool.query(`SELECT * FROM users;`);
        const resultRows: QueryResultRow = dbData.rows;
        return resultRows as IUserResult[];
    }
    public async getUserByEmail(email: string): Promise<IUserResult[]> {
        const dbData: QueryResult = await this.pool.query(`SELECT * FROM users WHERE email = '${email}';`);
        const resultRows: QueryResultRow = dbData.rows;
        return resultRows as IUserResult[];
    }
    public async insertUser({name, email, password}: IUser): Promise<QueryResult> {
        const insert: QueryResult = await this.pool.query(`SELECT user_insert('${name}', '${email}', '${password}');`);
        return insert;
    }
    public async userNameUp({id, name}: IUserName): Promise<QueryResult> {
        const insert: QueryResult = await this.pool.query(`SELECT name_up(${id}, '${name}');`);
        return insert;
    }
    public async userEmailUp({id, email}: IUserEmail): Promise<QueryResult> {
        const insert: QueryResult = await this.pool.query(`SELECT email_up(${id}, '${email}');`);
        return insert;
    }
    public async userPassUp({id, pass}: IUserPass): Promise<QueryResult> {
        const insert: QueryResult = await this.pool.query(`SELECT pass_up(${id}, '${pass}');`);
        return insert;
    }
}