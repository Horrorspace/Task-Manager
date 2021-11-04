import {INewTask, INewTaskInstance} from '@interfaces/ITask'
import AbstractTask from '@core/classes/AbstractTask'
import {dateStringify} from '@utilities/functions/dateConverte'


export default class NewTask extends AbstractTask implements INewTaskInstance {
    protected email: string;
    
    constructor({dateToDo, title, task, email}: INewTask<Date | string>) {
        super({dateToDo, title, task});
        this.email = email;
    }

    public getEmail(): string {
        return this.email
    }
    public getTaskObject(): INewTask<Date> {
        return {
            email: this.email,
            title: this.title,
            task: this.task,
            dateToDo: this.dateToDo
        }
    }
    public getTaskRawObject(): INewTask<string> {
        return {
            ...this.getTaskObject(),
            dateToDo: dateStringify(this.dateToDo)
        }
    }
    public setEmail(email: string): void {
        this.email = email
    }
}