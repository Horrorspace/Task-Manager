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

export interface ITaskResult {
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