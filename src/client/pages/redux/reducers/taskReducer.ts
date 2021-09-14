import {Reducer} from 'redux'
import {TaskActTypes} from '@redux/types/TaskActTypes'
import {ITaskState} from '@interfaces/IStore'
import Task from '@core/classes/Task'
import Tasks from '@core/classes/Tasks'


const defaultState: ITaskState = {
    tasks: new Tasks(),
    isDataUpdating: false,
    error: null
};

export const postReducer: Reducer = (state: ITaskState = defaultState, action: IreduxAction): IreduxState => {
    switch (action.type) {
        case PostActTypes.updatePosts:
            console.log(action.posts);
            if(action.posts) {
                return {
                    ...state,
                    posts: action.posts,
                    isDataUpdating: false
                }
            }
            else {
                return state
            }
        case PostActTypes.setDefault:
            return defaultState
        case PostActTypes.setUpdating:
                return {
                    ...state,
                    isDataUpdating: true
                }
        default:
            return state
    }
}
