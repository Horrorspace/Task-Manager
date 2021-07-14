export interface ITaskDateToDo {
    id: number;
    dateToDo: string;
}

export interface ITaskTitle {
    id: number;
    title: string;
}

export interface ITaskText {
    id: number;
    task: string;
}

export interface ITask {
    email: string;
    dateToDo: string;
    title: string;
    task: string;
}

export interface ITaskResult extends ITask {
    id: number;
    userId: number;
    createdDate: string;
    dateOfComplete: string;
    dateOfCancel: string;
    dateOfDelete: string;
    isPriority: boolean;
    isComplete: boolean;
    isCancel: boolean;
    isDelete: boolean;
}