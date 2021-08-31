import {QueryResult, QueryResultRow} from 'pg'
import {ITask, ITaskResult, ITaskDateToDo, ITaskTitle, ITaskText, ITaskResultRaw} from 'interfaces/task'
import PG from 'models/abstractPG'
import {IPostgreSQLConf} from 'interfaces/config'


export default class Task extends PG {
    constructor(config: IPostgreSQLConf) {
        super(config)
    }

    private converteResult(val: ITaskResultRaw): ITaskResult {
        return {
            id: val.id,
            userId: val.user_id,
            created: val.created,
            dateToDo: val.date_to_do,
            dateOfComplete: val.date_complete,
            dateOfCancel: val.date_cancel,
            dateOfDelete: val.date_delete,
            title: val.title,
            task: val.task,
            isPriority: val.is_priority,
            isComplete: val.is_complete,
            isCancel: val.is_cancel,
            isDelete: val.is_delete,
        }
    }

    public async getAllUserTasks(id: number): Promise<ITaskResult[]> {
        const dbData: QueryResult = await this.pool.query(`SELECT * FROM tasks WHERE user_id = ${id};`);
        const resultRows: QueryResultRow = dbData.rows;
        resultRows as ITaskResultRaw[];
        const result: ITaskResult[] = resultRows.map((val: ITaskResultRaw): ITaskResult => this.converteResult(val));
        return result;
    }
    public async getUserPriorityTasks(id: number): Promise<ITaskResult[]> {
        const dbData: QueryResult = await this.pool.query(`SELECT * FROM tasks WHERE user_id = ${id} AND is_priority = ${true};`);
        const resultRows: QueryResultRow = dbData.rows;
        resultRows as ITaskResultRaw[];
        const result: ITaskResult[] = resultRows.map((val: ITaskResultRaw): ITaskResult => this.converteResult(val));
        return result;
    }
    public async insertTask({email, dateToDo, title, task}: ITask): Promise<QueryResult> {
        const insert: QueryResult = await this.pool.query(`SELECT task_insert('${email}', '${dateToDo}', '${title}', '${task}');`);
        return insert;
    }
    public async togglePriority(id: number): Promise<QueryResult> {
        const insert: QueryResult = await this.pool.query(`SELECT toggle_priority(${id});`);
        return insert;
    }
    public async toggleComplete(id: number): Promise<QueryResult> {
        const insert: QueryResult = await this.pool.query(`SELECT toggle_complete(${id});`);
        return insert;
    }
    public async toggleCancel(id: number): Promise<QueryResult> {
        const insert: QueryResult = await this.pool.query(`SELECT toggle_cancel(${id});`);
        return insert;
    }
    public async toggleDelete(id: number): Promise<QueryResult> {
        const insert: QueryResult = await this.pool.query(`SELECT toggle_delete(${id});`);
        return insert;
    }
    public async taskDateToDoUp({id, dateToDo}: ITaskDateToDo): Promise<QueryResult> {
        const insert: QueryResult = await this.pool.query(`SELECT date_todo_up(${id}, '${dateToDo}');`);
        return insert;
    }
    public async taskTitleUp({id, title}: ITaskTitle): Promise<QueryResult> {
        const insert: QueryResult = await this.pool.query(`SELECT title_up(${id}, '${title}');`);
        return insert;
    }
    public async taskTextUp({id, task}: ITaskText): Promise<QueryResult> {
        const insert: QueryResult = await this.pool.query(`SELECT task_up(${id}, '${task}');`);
        return insert;
    }
    public async deleteTask(id: number): Promise<QueryResult> {
        const insert: QueryResult = await this.pool.query(`SELECT task_del(${id});`);
        return insert;
    }
}
