import {put, call} from 'redux-saga/effects'
import {removeLastMessage} from '@redux/actions/appActions'
import {store} from '@redux/store'


export default function* messageSaga()
{
    const state = store.getState();
    const msgNum = state.app.messages.length;
    if(msgNum > 0 && msgNum <= 5) {
        const delay = time => new Promise(resolve => setTimeout(resolve, time));
        yield call(delay, 2000);
        yield put(removeLastMessage())
    }
    else if(msgNum > 5) {
        yield put(removeLastMessage())
    }
}