import {ITaskInstance, ITasksInstance} from '@interfaces/ITask'


export default class Tasks implements ITasksInstance {
    protected tasks: ITaskInstance[]

    constructor(tasks: ITaskInstance[] | void) {
        if(tasks) {
            this.tasks = tasks
        }
        else {
            this.tasks = []
        }
    }

    public checkId(id: number): boolean {
        return this.tasks.filter(task => task.getTaskId() === id).length > 0
    }
    public getAllTasks(): ITaskInstance[] {
        return this.tasks
    }
    public getTaskById(id: number): ITaskInstance {
        if(this.checkId(id)) {
            return this.tasks.filter(task => task.getTaskId() === id)[0]
        }
        else {
            throw 'Task with this id is not exist'
        }
    }
    public getPriorityTasks(): ITaskInstance[] {
        return this.tasks.filter(task => task.getPriority())
    }
    public getNonPriorityTasks(): ITaskInstance[] {
        return this.tasks.filter(task => !task.getPriority())
    }
    public getCompleteTasks(): ITaskInstance[] {
        return this.tasks.filter(task => task.getComplete())
    }
    public getNonCompleteTasks(): ITaskInstance[] {
        return this.tasks.filter(task => !task.getComplete())
    }
    public getCancelTasks(): ITaskInstance[] {
        return this.tasks.filter(task => task.getCancel())
    }
    public getNonCancelTasks(): ITaskInstance[] {
        return this.tasks.filter(task => !task.getCancel())
    }
    public addTask(task: ITaskInstance): void {
        if(!this.checkId(task.getTaskId())) {
            this.tasks = [...this.tasks, task]
        }
        else {
            throw 'Task id is not unique'
        }
    }
    public editTask(task: ITaskInstance): void {
        if(this.checkId(task.getTaskId())) {
            const i: number = this.tasks.indexOf(task);
            this.tasks = [...this.tasks.slice(0, i), task, ...this.tasks.slice(i + 1)]
        }
        else {
            throw 'Task with this id is not exist'
        }
    }
    public removeTask(task: ITaskInstance): void {
        if(this.checkId(task.getTaskId())) {
            const i: number = this.tasks.indexOf(task);
            this.tasks = [...this.tasks.slice(0, i), ...this.tasks.slice(i + 1)]
        }
        else {
            throw 'Task with this id is not exist'
        }
    }
    public setTasks(tasks: ITaskInstance[] | void): void {
        if(tasks) {
            this.tasks = tasks
        }
        else {
            this.tasks = []
        }
    }
    public getIdList(): number[] {
        return this.tasks.map(task => task.getTaskId())
    }
}