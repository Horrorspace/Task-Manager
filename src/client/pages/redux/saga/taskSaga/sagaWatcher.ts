import {takeEvery} from 'redux-saga/effects'
import {TaskActTypes} from '@redux/types/TaskActTypes'
import errorSaga from '@redux/saga/taskSaga/errorSaga'
import messageSaga from '@redux/saga/taskSaga/messageSaga'


export default function* sagaWatcher() {
    yield takeEvery(TaskActTypes.setError, errorSaga);
    yield takeEvery(TaskActTypes.setMessage, messageSaga);
}