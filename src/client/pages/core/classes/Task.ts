import {ITask, ITaskToEdit, ITaskInstance} from '@interfaces/ITask'
import AbstractTask from '@core/classes/AbstractTask'
import {dateStringify, dateParser} from '@core/functions/dateConverte'


export default class Task extends AbstractTask implements ITaskInstance {
    protected id: number;
    protected userId: number;
    protected isPriority: boolean;
    protected isComplete: boolean;
    protected isCancel: boolean;
    protected isDelete: boolean;
    protected created: Date;
    protected dateOfComplete: Date;
    protected dateOfCancel: Date;
    protected dateOfDelete: Date;
    
    constructor({
        dateToDo,
        title,
        task,
        id,
        userId,
        isPriority,
        isComplete,
        isCancel,
        isDelete,
        created,
        dateOfComplete,
        dateOfCancel,
        dateOfDelete
    }: ITask<Date | string>) {
        super({dateToDo, title, task});
        this.id = id;
        this.userId = userId;
        this.isPriority = isPriority;
        this.isComplete = isComplete;
        this.isCancel = isCancel;
        this.isDelete = isDelete;
        this.created = typeof(created) === 'string' ? dateParser(created) : dateParser(dateStringify(created));
        this.dateOfComplete = typeof(dateOfComplete) === 'string' ? dateParser(dateOfComplete) : dateParser(dateStringify(dateOfComplete));
        this.dateOfCancel = typeof(dateOfCancel) === 'string' ? dateParser(dateOfCancel) : dateParser(dateStringify(dateOfCancel));
        this.dateOfDelete = typeof(dateOfDelete) === 'string' ? dateParser(dateOfDelete) : dateParser(dateStringify(dateOfDelete));
    }

    public getTaskId(): number {
        return this.id
    }
    public getUserId(): number {
        return this.userId
    }
    public getDateCreated(): Date {
        return this.created
    }
    public getDateOfComplete(): Date {
        return this.dateOfComplete
    }
    public getDateOfCancel(): Date {
        return this.dateOfCancel
    }
    public getDateOfDelete(): Date {
        return this.dateOfDelete
    }
    public getPriority(): boolean {
        return this.isPriority
    }
    public getComplete(): boolean {
        return this.isComplete
    }
    public getCancel(): boolean {
        return this.isCancel
    }
    public getDelete(): boolean {
        return this.isDelete
    }
    public getTaskToEdit(): ITaskToEdit {
        return {
            id: this.id,
            title: this.title,
            task: this.task,
            dateToDo: dateStringify(this.dateToDo),
        }
    }
    public getTaskObject(): ITask<Date> {
        return {
            ...this.getTaskToEdit(),
            userId: this.userId,
            dateToDo: this.dateToDo,
            isPriority: this.isPriority,
            isComplete: this.isComplete,
            isCancel: this.isCancel,
            isDelete: this.isDelete,
            created: this.created,
            dateOfComplete: this.dateOfComplete,
            dateOfCancel: this.dateOfCancel,
            dateOfDelete: this.dateOfDelete
        }
    }
    public getTaskRawObject(): ITask<string> {
        
        return {
            ...this.getTaskObject(),
            dateToDo: dateStringify(this.dateToDo),
            created: dateStringify(this.created),
            dateOfComplete: dateStringify(this.dateOfComplete),
            dateOfCancel: dateStringify(this.dateOfCancel),
            dateOfDelete: dateStringify(this.dateOfDelete)
        }
    }
    public setTaskId(id: number): void {
        this.id = id
    }
    public setUserId(id: number): void {
        this.userId = id
    }
    public setDateCreated(date: Date | string): void {
        this.created = typeof(date) === 'string' ? dateParser(date) : dateParser(dateStringify(date))
    }
    public setDateOfComplete(date: Date | string): void {
        this.dateOfComplete = typeof(date) === 'string' ? dateParser(date) : dateParser(dateStringify(date))
    }
    public setDateOfCancel(date: Date | string): void {
        this.dateOfCancel = typeof(date) === 'string' ? dateParser(date) : dateParser(dateStringify(date))
    }
    public setDateOfDelete(date: Date | string): void {
        this.dateOfDelete = typeof(date) === 'string' ? dateParser(date) : dateParser(dateStringify(date))
    }
    public setPriority(isPriority: boolean): void {
        this.isPriority = isPriority
    }
    public setComplete(isComplete: boolean): void {
        this.isComplete = isComplete
    }
    public setCancel(isCancel: boolean): void {
        this.isCancel = isCancel
    }
    public setDelete(isDelete: boolean): void {
        this.isDelete = isDelete
    }
}