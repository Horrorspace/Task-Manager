import {takeEvery} from 'redux-saga/effects'
import {UserActTypes} from '@redux/types/UserActTypes'
import errorSaga from '@redux/saga/userSaga/errorSaga'
import messageSaga from '@redux/saga/userSaga/messageSaga'
import validPassSaga from '@redux/saga/userSaga/validPassSaga'


export default function* sagaWatcher() {
    yield takeEvery(UserActTypes.setError, errorSaga);
    yield takeEvery(UserActTypes.setMessage, messageSaga);
    yield takeEvery(UserActTypes.setValidPass, validPassSaga);
}