import {put} from 'redux-saga/effects'
import {addError} from '@redux/actions/appActions'
import {clearError} from '@redux/actions/taskActions'
import {store} from '@redux/store'


export default function* errorSaga()
{
    const state = store.getState();
    const error = state.task.error;
    if(error) {
        yield put(addError(error))
    }
    yield put(clearError())
}