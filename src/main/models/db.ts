import {Pool} from 'pg'

export default class db {
    private static readonly pool: Pool = new Pool({
        user: "admin",
        password: "KQoEgwBi",
        host: "127.0.0.1",
        port: 5432,
        database: "task_manager"
    });
    public static async getData(): Promise<void> {
        db.pool.query('SELECT * FROM users;', (err, res) => {
            if(err) {
                throw err;
            }
            else {
                console.log(res);
            }
            db.pool.end;
        });
    }
    //public static async insertUser(name: string, email: string, password: string): Promise<void> {

    //}
}

db.getData();