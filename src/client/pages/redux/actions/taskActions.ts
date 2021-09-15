import {TaskActTypes} from '@redux/types/TaskActTypes'
import {ITaskAction, ITaskState, IThunkAction} from '@interfaces/IStore'
import {INewTask, ITaskInstance, ITasksInstance} from '@interfaces/ITask'
import TaskAPI from '@core/classes/TaskAPI'
import {Dispatch} from 'redux'


export const setTasks = (tasks: ITasksInstance): ITaskAction => {
    return {
        type: TaskActTypes.setTasks,
        tasks
    }
};

export const setDefault  = (): ITaskAction => {
    return {
        type: TaskActTypes.setDefault
    }
};

export const setUpdatingStatus = (isDataUpdating: boolean): ITaskAction => {
    return {
        type: TaskActTypes.setUpdatingStatus,
        isDataUpdating
    }
};

export const setError = (error: string): ITaskAction => {
    return {
        type: TaskActTypes.setError,
        error
    }
};

export const setMessage = (message: string): ITaskAction => {
    return {
        type: TaskActTypes.setMessage,
        message
    }
};

export const clearError = (): ITaskAction => {
    return {
        type: TaskActTypes.clearError
    }
};

export const clearMessage = (): ITaskAction => {
    return {
        type: TaskActTypes.clearMessage
    }
};
