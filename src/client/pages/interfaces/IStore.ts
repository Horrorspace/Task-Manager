import {ITasksInstance} from '@interfaces/ITask'

export interface ITaskState {
    tasks: ITasksInstance;
    isDataUpdating: boolean;
    error: string | null;
}

export interface IAppState {
    isDataUpdating: boolean;
    error: string | null;
}