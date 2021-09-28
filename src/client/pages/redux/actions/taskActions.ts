import {TaskActTypes} from '@redux/types/TaskActTypes'
import {ITaskAction, ITaskState, IThunkAction, IDoubleThunk, IThunkDispatch} from '@interfaces/IStore'
import {INewTask, ITask, ITaskInstance, ITasksInstance, ITaskToEdit} from '@interfaces/ITask'
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

export const addTask = (task: INewTask<string>): IThunkAction<ITaskState> | IDoubleThunk<IThunkAction<ITaskState>> => {
    return async (dispatch: Dispatch<ITaskAction>): Promise<void> => {
        try {
            const thunkDispatch = dispatch as IThunkDispatch<IThunkAction<ITaskState>>;
            await TaskAPI.addTask(task);
            dispatch(setUpdatingStatus(true));
            dispatch(setMessage(`Task "${task.title}" have been added`));
            thunkDispatch(downloadAllTasks());
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

export const togglePriority = (id: number): IThunkAction<ITaskState> | IDoubleThunk<IThunkAction<ITaskState>> => {
    return async (dispatch: Dispatch<ITaskAction>): Promise<void> => {
        try {
            const thunkDispatch = dispatch as IThunkDispatch<IThunkAction<ITaskState>>;
            await TaskAPI.togglePriority(id);
            dispatch(setUpdatingStatus(true));
            thunkDispatch(downloadAllTasks());
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

export const toggleComplete = (id: number): IThunkAction<ITaskState> | IDoubleThunk<IThunkAction<ITaskState>> => {
    return async (dispatch: Dispatch<ITaskAction>): Promise<void> => {
        try {
            const thunkDispatch = dispatch as IThunkDispatch<IThunkAction<ITaskState>>;
            await TaskAPI.toggleComplete(id);
            dispatch(setUpdatingStatus(true));
            thunkDispatch(downloadAllTasks());
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

export const toggleCancel = (id: number): IThunkAction<ITaskState> | IDoubleThunk<IThunkAction<ITaskState>> => {
    return async (dispatch: Dispatch<ITaskAction>): Promise<void> => {
        try {
            const thunkDispatch = dispatch as IThunkDispatch<IThunkAction<ITaskState>>;
            await TaskAPI.toggleCancel(id);
            dispatch(setUpdatingStatus(true));
            thunkDispatch(downloadAllTasks());
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

export const editTask = (task: ITaskToEdit): IThunkAction<ITaskState> | IDoubleThunk<IThunkAction<ITaskState>> => {
    return async (dispatch: Dispatch<ITaskAction>): Promise<void> => {
        try {
            const thunkDispatch = dispatch as IThunkDispatch<IThunkAction<ITaskState>>;
            await TaskAPI.editTask(task);
            dispatch(setUpdatingStatus(true));
            thunkDispatch(downloadAllTasks());
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

export const deleteTask = (id: number): IThunkAction<ITaskState> | IDoubleThunk<IThunkAction<ITaskState>> => {
    return async (dispatch: Dispatch<ITaskAction>): Promise<void> => {
        try {
            const thunkDispatch = dispatch as IThunkDispatch<IThunkAction<ITaskState>>;
            await TaskAPI.deleteTask(id);
            dispatch(setUpdatingStatus(true));
            thunkDispatch(downloadAllTasks());
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