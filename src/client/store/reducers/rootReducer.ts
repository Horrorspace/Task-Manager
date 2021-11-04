import {combineReducers, Reducer} from 'redux'
import {appReducer} from '@redux/reducers/appReducer'
import {taskReducer} from '@redux/reducers/taskReducer'
import {userReducer} from '@redux/reducers/userReducer'
import {IRootState, IAnyAction} from '@interfaces/IStore'


export const rootReducer: Reducer<IRootState, IAnyAction> = combineReducers({
    app: appReducer,
    task: taskReducer,
    user: userReducer
})