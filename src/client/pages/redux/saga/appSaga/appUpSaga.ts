import {put} from 'redux-saga/effects'
import {setUpdatingStatus} from '@redux/actions/appActions'
import {store} from '@redux/store'


export default function* appSaga()
{
    const state = store.getState();
    const taskStatus = state.task.isDataUpdating;
    const userStatus = state.user.isDataUpdating;
    if(taskStatus || userStatus) {
        yield put(setUpdatingStatus(true))
    }
    else {
        yield put(setUpdatingStatus(false))
    }
}