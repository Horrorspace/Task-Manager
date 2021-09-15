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

export const downloadAllTasks = (): IThunkAction<ITaskState> => {
    return async (dispatch: Dispatch<ITaskAction>): Promise<void> => {
        try {
            dispatch(setUpdatingStatus(true));
            const tasks = await TaskAPI.downloadAllTasks();
            dispatch(setTasks(tasks));
        }
        catch(e) {
            dispatch(setUpdatingStatus(false));
            if(typeof(e) === 'string') {
                dispatch(setError(e));
            }
            else {
                dispatch(setError('Connection error'));
            }
        }
    }
}

export const addTask = (task: INewTask): IThunkAction<ITaskState> | IThunkAction<IThunkAction<ITaskState>> => {
    return async (dispatch: Dispatch<ITaskAction>): Promise<void> => {
        try {
            await TaskAPI.addTask(task);
            dispatch(setUpdatingStatus(true));
            dispatch(setMessage(`Task "${task.name}" have been added`));
            dispatch(downloadAllTasks());
        }
        catch(e) {
            dispatch(setUpdatingStatus(false));
            if(typeof(e) === 'string') {
                dispatch(setError(e));
            }
            else {
                dispatch(setError('Connection error'));
            }
        }
    }
}
