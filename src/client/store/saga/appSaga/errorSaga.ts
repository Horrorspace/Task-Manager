import {put, call} from 'redux-saga/effects'
import {removeLastError} from '@redux/actions/appActions'
import {store} from '@redux/store'


export default function* messageSaga()
{
    const state = store.getState();
    const errNum = state.app.errors.length;
    if(errNum > 0 && errNum <= 5) {
        const delay = time => new Promise(resolve => setTimeout(resolve, time));
        yield call(delay, 2000);
        yield put(removeLastError())
    }
    else if(errNum > 5) {
        yield put(removeLastError())
    }
}