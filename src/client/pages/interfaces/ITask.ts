export interface ITaskMainData {
    title: string;
    task: string;
}

export interface IEmail {
    email: string;
}

export interface ITaskId {
    id: number;
}

export interface IAbstractTask extends ITaskMainData {
    dateToDo: string | Date;
}

export interface INewTask<T extends Date | string> extends ITaskMainData, IEmail {
    dateToDo: T;
}

export interface ITaskSecondaryData {
    userId: number;
    isPriority: boolean;
    isComplete: boolean;
    isCancel: boolean;
    isDelete: boolean;
}

export interface ITask<T extends Date | string> extends ITaskMainData, ITaskSecondaryData, ITaskId {
    created: T;
    dateToDo: T;
    dateOfComplete: T;
    dateOfCancel: T;
    dateOfDelete: T;
}

export interface ITaskToEdit extends ITaskId, ITaskMainData {
    dateToDo: string
}

export interface INewTaskInstance {
    getEmail(): string;
    getDateToDo(): Date;
    getTitle(): string;
    getTask(): string;
    getTaskRawObject(): INewTask<string>;
    getTaskObject(): INewTask<Date>;
    setEmail(email: string): void;
    setDateToDo(date: Date | string): void;
    setTitle(title: string): void;
    setTask(task: string): void;
}

export interface ITaskInstance {
    getTaskId(): number;
    getUserId(): number;
    getDateToDo(): Date;
    getTitle(): string;
    getTask(): string;
    getDateCreated(): Date;
    getDateOfComplete(): Date;
    getDateOfCancel(): Date;
    getDateOfDelete(): Date;
    getPriority(): boolean;
    getComplete(): boolean;
    getCancel(): boolean;
    getDelete(): boolean;
    getTaskRawObject(): ITask<string>;
    getTaskToEdit(): ITaskToEdit;
    getTaskObject(): ITask<Date>;
    setTaskId(id: number): void;
    setUserId(id: number): void;
    setDateToDo(date: Date): void;
    setTitle(title: string): void;
    setTask(task: string): void;
    setDateCreated(date: Date | string): void;
    setDateOfComplete(date: Date | string): void;
    setDateOfCancel(date: Date | string): void;
    setDateOfDelete(date: Date | string): void;
    setPriority(isPriority: boolean): void;
    setComplete(isComplete: boolean): void;
    setCancel(isCancel: boolean): void;
    setDelete(isDelete: boolean): void;
}

export interface ITasksInstance {
    checkId(id: number): boolean;
    getAllTasks(): ITaskInstance[];
    getTaskById(id: number): ITaskInstance;
    getPriorityTasks(): ITaskInstance[];
    getNonPriorityTasks(): ITaskInstance[];
    getCompleteTasks(): ITaskInstance[];
    getNonCompleteTasks(): ITaskInstance[];
    getCancelTasks(): ITaskInstance[];
    getNonCancelTasks(): ITaskInstance[];
    getIdList(): number[];
    addTask(task: ITaskInstance): void;
    editTask(task: ITaskInstance): void;
    removeTask(task: ITaskInstance): void;
    setTasks(tasks: ITaskInstance[] | void): void;
}