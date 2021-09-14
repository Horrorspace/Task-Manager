import {ITasksInstance} from '@interfaces/ITask'
import {IUserInstance} from '@interfaces/IUser'


export interface ITaskState {
    tasks: ITasksInstance;
    isDataUpdating: boolean;
}

export interface IUserState {
    user: IUserInstance;
    isDataUpdating: boolean;
}

export interface IAppState {
    isDataUpdating: boolean;
    messages: string[];
    errors: string[];
}
