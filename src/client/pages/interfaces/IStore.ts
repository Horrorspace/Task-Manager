import {ITasksInstance} from '@interfaces/ITask'
import {IUserInstance} from '@interfaces/IUser'
import {ThunkAction} from 'redux-thunk'
import { AnyAction } from 'redux'


export interface ITaskState {
    tasks: ITasksInstance;
    isDataUpdating: boolean;
    error: string | null;
    message: string | null;
}

export interface IUserState {
    user: IUserInstance | null;
    isDataUpdating: boolean;
    isLogined: boolean;
    error: string | null;
    message: string | null;
}

export interface IAppState {
    isDataUpdating: boolean;
    messages: string[];
    errors: string[];
    notifications: boolean;
}

export interface IAction {
    type: string;
}

export interface ITaskAction extends IAction {
    tasks?: ITasksInstance;
    isDataUpdating?: boolean;
    error?: string;
    message?: string;
}

export interface IUserAction extends IAction {
    user?: IUserInstance;
    isDataUpdating?: boolean;
    error?: string;
    message?: string;
}

export interface IAppAction extends IAction {
    isDataUpdating?: boolean;
    message?: string;
    error?: string;
    notifications?: boolean;
}


export type IThunkAction<T extends IAppState | ITaskState | IUserState> = ThunkAction<void, T, unknown, AnyAction>;
export type IThunkState<T> = () => T;