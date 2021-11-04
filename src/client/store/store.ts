import {createStore, applyMiddleware, compose, Store, Middleware, Reducer} from 'redux'
import {saga} from '@redux/saga/saga'
import thunk from 'redux-thunk'
import {rootReducer} from '@redux/reducers/rootReducer'
import rootSaga from '@redux/saga/rootSaga'
import {IRootState} from '@interfaces/IStore'


const middleware = [saga, thunk];
const Middleware = applyMiddleware(...middleware);


export const store: Store<IRootState, any> = createStore(rootReducer, compose(Middleware));