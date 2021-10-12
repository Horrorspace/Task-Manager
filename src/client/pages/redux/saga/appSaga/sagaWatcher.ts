import {takeEvery} from 'redux-saga/effects'
import {AppActTypes} from '@redux/types/AppActTypes'
import {TaskActTypes} from '@redux/types/TaskActTypes'
import {UserActTypes} from '@redux/types/UserActTypes'
import appUpSaga from '@redux/saga/appSaga/appUpSaga'
import errorSaga from '@redux/saga/appSaga/errorSaga'
import messageSaga from '@redux/saga/appSaga/messageSaga'



export default function* sagaWatcher() {
    yield takeEvery([
        TaskActTypes.setUpdatingStatus,
        TaskActTypes.setTasks,
        TaskActTypes.setDefault,
        UserActTypes.setUpdatingStatus,
        UserActTypes.setUser,
        UserActTypes.setDefault,
    ], appUpSaga);
    yield takeEvery(AppActTypes.addMessage, messageSaga);
    yield takeEvery(AppActTypes.addError, errorSaga);
}