import {put} from 'redux-saga/effects'
import {addMessage} from '@redux/actions/appActions'
import {clearMessage} from '@redux/actions/userActions'
import {store} from '@redux/store'


export default function* messageSaga()
{
    const state = store.getState();
    const message = state.user.message;
    if(message) {
        yield put(addMessage(message))
    }
    yield put(clearMessage())
}