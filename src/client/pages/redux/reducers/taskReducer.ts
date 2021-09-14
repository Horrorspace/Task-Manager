import {Reducer} from 'redux'
import {TaskActTypes} from '@redux/types/TaskActTypes'
import {ITaskState, ITaskAction} from '@interfaces/IStore'
import Task from '@core/classes/Task'
import Tasks from '@core/classes/Tasks'


const defaultState: ITaskState = {
    tasks: new Tasks(),
    isDataUpdating: false,
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
            if(action.hasOwnProperty('isDataUpdating')) {
                return {
                        ...state,
                        isDataUpdating: action.isDataUpdating
                    }
            }
            else {
                return state
            }
        default:
            return state
    }
}
