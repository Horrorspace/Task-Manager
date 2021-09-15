import {Reducer} from 'redux'
import {AppActTypes} from '@redux/types/AppActTypes'
import {IAppState, IAppAction} from '@interfaces/IStore'


const defaultState: IAppState = {
    isDataUpdating: false,
    messages: [],
    errors: [],
    notifications: true
}


export const appReducer: Reducer = (state: IAppState = defaultState, action: IAppAction): IAppState => {
    switch (action.type) {
        case AppActTypes.addError:
            if(action.error) {
                return {
                    ...state,
                    errors: [...state.errors, action.error],
                }
            }
            else {
                return state
            }
        case AppActTypes.addMessage:
            if(action.message) {
                return {
                    ...state,
                    messages: [...state.messages, action.message],
                }
            }
            else {
                return state
            }
        case AppActTypes.removeLastError:
            return {
                ...state,
                errors: state.errors.slice(1)
            }
        case AppActTypes.removeLastMessage:
            return {
                ...state,
                messages: state.messages.slice(1)
            }
        case AppActTypes.clearErrors:
            return {
                ...state,
                errors: []
            }
        case AppActTypes.clearMessages:
            return {
                ...state,
                messages: []
            }
        case AppActTypes.setUpdatingStatus:
            if(action.hasOwnProperty('isDataUpdating') && typeof(action.isDataUpdating) === 'boolean') {
                return {
                        ...state,
                        isDataUpdating: action.isDataUpdating
                    }
            }
            else {
                return state
            }
        case AppActTypes.setNotifications:
            if(action.hasOwnProperty('notifications') && typeof(action.notifications) === 'boolean') {
                return {
                        ...state,
                        notifications: action.notifications
                    }
            }
            else {
                return state
            }
        default:
            return state
    }
}