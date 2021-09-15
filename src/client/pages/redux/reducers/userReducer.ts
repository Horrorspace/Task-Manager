import {Reducer} from 'redux'
import {UserActTypes} from '@redux/types/UserActTypes'
import {IUserState, IUserAction} from '@interfaces/IStore'


const defaultState: IUserState = {
    user: null,
    isDataUpdating: false,
    isLogined: false,
    error: null,
    message: null
};

export const userReducer: Reducer = (state: IUserState = defaultState, action: IUserAction): IUserState => {
    switch (action.type) {
        case UserActTypes.setUser:
            if(action.user) {
                return {
                    ...state,
                    user: action.user,
                    isDataUpdating: false,
                    isLogined: true
                }
            }
            else {
                return state
            }
        case UserActTypes.setDefault:
            return defaultState
        case UserActTypes.setUpdatingStatus:
            if(action.hasOwnProperty('isDataUpdating') && typeof(action.isDataUpdating) === 'boolean') {
                return {
                        ...state,
                        isDataUpdating: action.isDataUpdating
                    }
            }
            else {
                return state
            }
        case UserActTypes.setError:
            if(action.error) {
                return {
                    ...state,
                    error: action.error
                }
            }
            else {
                return state
            }
        case UserActTypes.setMessage:
            if(action.message) {
                return {
                    ...state,
                    message: action.message
                }
            }
            else {
                return state
            }
        case UserActTypes.clearError:
            return {
                ...state,
                error: null
            }
        case UserActTypes.clearMessage:
            return {
                ...state,
                message: null
            }
        default:
            return state
    }
}
