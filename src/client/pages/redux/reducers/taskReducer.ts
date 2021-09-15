import {Reducer} from 'redux'
import {TaskActTypes} from '@redux/types/TaskActTypes'
import {ITaskState, ITaskAction} from '@interfaces/IStore'
import Tasks from '@core/classes/Tasks'


const defaultState: ITaskState = {
    tasks: new Tasks(),
    isDataUpdating: false,
    error: null,
    message: null
};

export const taskReducer: Reducer = (state: ITaskState = defaultState, action: ITaskAction): ITaskState => {
    switch (action.type) {
        case TaskActTypes.setTasks:
            if(action.tasks) {
                return {
                    ...state,
                    tasks: action.tasks,
                    isDataUpdating: false
                }
            }
            else {
                return state
            }
        case TaskActTypes.setDefault:
            return defaultState
        case TaskActTypes.setUpdatingStatus:
            if(action.hasOwnProperty('isDataUpdating') && typeof(action.isDataUpdating) === 'boolean') {
                return {
                        ...state,
                        isDataUpdating: action.isDataUpdating
                    }
            }
            else {
                return state
            }
        case TaskActTypes.setError:
            if(action.error) {
                return {
                    ...state,
                    error: action.error
                }
            }
            else {
                return state
            }
        case TaskActTypes.setMessage:
            if(action.message) {
                return {
                    ...state,
                    message: action.message
                }
            }
            else {
                return state
            }
        case TaskActTypes.clearError:
            return {
                ...state,
                error: null
            }
        case TaskActTypes.clearMessage:
            return {
                ...state,
                message: null
            }
        default:
            return state
    }
}
