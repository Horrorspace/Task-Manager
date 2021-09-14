import {Reducer} from 'redux'
import {UserActTypes} from '@redux/types/UserActTypes'
import {IUserState, IUserAction} from '@interfaces/IStore'
import User from '@core/classes/User'


const defaultState: IUserState = {
    user: null,
    isDataUpdating: false,
};

export const userReducer: Reducer = (state: IUserState = defaultState, action: IUserAction): IUserState => {
    switch (action.type) {
        case UserActTypes.setUser:
            if(action.user) {
                return {
                    ...state,
                    user: action.user,
                    isDataUpdating: false
                }
            }
            else {
                return state
            }
        case UserActTypes.setDefault:
            return defaultState
        case UserActTypes.setUpdatingStatus:
            if(action.hasOwnProperty('isDataUpdating')) {
                return {
                        ...state,
                        isDataUpdating: action.isDataUpdating
                    }
            }
            else {
                return state
            }
        default:
            return state
    }
}
