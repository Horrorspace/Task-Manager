import {combineReducers, Reducer} from 'redux'
import {appReducer} from '@redux/reducers/appReducer'
import {taskReducer} from '@redux/reducers/taskReducer'
import {userReducer} from '@redux/reducers/userReducer'


export const rootReducer: Reducer = combineReducers({
    app: appReducer,
    task: taskReducer,
    user: userReducer
})