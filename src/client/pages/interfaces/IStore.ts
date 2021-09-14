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

export interface IAction {
    type: string;
}

export interface ITaskAction extends IAction {
    tasks?: ITasksInstance;
    isDataUpdating?: boolean;
}

export interface IUserAction extends IAction {
    user?: IUserInstance;
    isDataUpdating?: boolean;
}

export interface IAppAction extends IAction {
    isDataUpdating?: boolean;
    message?: string;
    error?: string;
}
