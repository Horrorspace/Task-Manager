import {put, call} from 'redux-saga/effects'
import {setValidPass} from '@redux/actions/userActions'
import {store} from '@redux/store'


export default function* validPassSaga()
{
    const state = store.getState();
    const isValidPass = state.user.isValidPass;
    if(!isValidPass) {
        const delay = time => new Promise(resolve => setTimeout(resolve, time));
        yield call(delay, 4000);
        yield put(setValidPass(true))
    }
}