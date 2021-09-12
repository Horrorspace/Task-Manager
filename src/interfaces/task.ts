import {QueryResult, QueryResultRow} from 'pg'


export interface ITaskId {
    id: number;
}


export interface ITaskDateToDo extends ITaskId {
    dateToDo: string;
}

export interface ITaskTitle extends ITaskId {
    title: string;
}

export interface ITaskText extends ITaskId {
    task: string;
}


export interface ITask {
    email: string;
    dateToDo: string;
    title: string;
    task: string;
}

export interface ITaskEdit extends ITaskDateToDo, ITaskTitle, ITaskText {}

export interface ITaskResult {
    id: number;
    userId: number;
    created: string;
    dateToDo: Date;
    dateOfComplete: string;
    dateOfCancel: string;
    dateOfDelete: string;
    title: string;
    task: string;
    isPriority: boolean;
    isComplete: boolean;
    isCancel: boolean;
    isDelete: boolean;
}

export interface ITaskResultToSend {
    id: number;
    userId: number;
    created: string;
    dateToDo: string;
    dateOfComplete: string;
    dateOfCancel: string;
    dateOfDelete: string;
    title: string;
    task: string;
    isPriority: boolean;
    isComplete: boolean;
    isCancel: boolean;
    isDelete: boolean;
}

export interface ITaskResultRaw {
    id: number;
    user_id: number;
    created: string;
    date_to_do: string;
    date_complete: string;
    date_cancel: string;
    date_delete: string;
    title: string;
    task: string;
    is_priority: boolean;
    is_complete: boolean;
    is_cancel: boolean;
    is_delete: boolean;
}

export interface ITaskInstance {
    getAllUserTasks(id: number): Promise<ITaskResult[]>;
    getTaskById(id: number): Promise<ITaskResult[]>;
    getUserPriorityTasks(id: number): Promise<ITaskResult[]>;
    getUserNonPriorityTasks(id: number): Promise<ITaskResult[]>;
    getUserCompleteTasks(id: number): Promise<ITaskResult[]>;
    getUserNonCompleteTasks(id: number): Promise<ITaskResult[]>;
    getUserCancelTasks(id: number): Promise<ITaskResult[]>;
    getUserNonCancelTasks(id: number): Promise<ITaskResult[]>;
    getUserDeleteTasks(id: number): Promise<ITaskResult[]>;
    getUserNonDeleteTasks(id: number): Promise<ITaskResult[]>;
    insertTask({email, dateToDo, title, task}: ITask): Promise<QueryResult>;
    togglePriority(id: number): Promise<QueryResult>;
    toggleComplete(id: number): Promise<QueryResult>;
    toggleCancel(id: number): Promise<QueryResult>;
    toggleDelete(id: number): Promise<QueryResult>;
    taskDateToDoUp({id, dateToDo}: ITaskDateToDo): Promise<QueryResult>;
    taskTitleUp({id, title}: ITaskTitle): Promise<QueryResult>;
    taskTextUp({id, task}: ITaskText): Promise<QueryResult>;
    deleteTask(id: number): Promise<QueryResult>;
}
