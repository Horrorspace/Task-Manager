import {fork} from 'redux-saga/effects'
import appSaga from '@redux/saga/appSaga/sagaWatcher'
import taskSaga from '@redux/saga/taskSaga/sagaWatcher'
import userSaga from '@redux/saga/userSaga/sagaWatcher'


export default function* rootSaga() {
    yield fork(appSaga)
    yield fork(taskSaga)
    yield fork(userSaga)
}