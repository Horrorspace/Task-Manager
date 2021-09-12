import {IAbstractTask} from '@interfaces/ITask'
import {dateParser, dateStringify} from '@core/functions/dateConverte'


export default abstract class AbstractTask {
    protected dateToDo: Date;
    protected title: string;
    protected task: string;

    constructor({dateToDo, title, task}: IAbstractTask) {
        this.title = title;
        this.task = task;
        this.dateToDo = typeof(dateToDo) === 'string' ? dateParser(dateToDo) : dateParser(dateStringify(dateToDo));
    }

    public getDateToDo(): Date {
        return this.dateToDo
    }
    public getTitle(): string {
        return this.title
    }
    public getTask(): string {
        return this.task
    }
    public setDateToDo(date: Date | string): void {
        this.dateToDo = typeof(date) === 'string' ? dateParser(date) : dateParser(dateStringify(date));
    }
    public setTitle(title: string): void {
        this.title = title
    }
    public setTask(task: string): void {
        this.task = task
    }
}