import {ITasksInstance} from '@interfaces/ITask'

export interface ITaskState {
    tasks: ITasksInstance;
    isDataUpdating: boolean;
    error: string;
}

export interface IAppState {
    isDataUpdating: boolean;
    error: string;
}