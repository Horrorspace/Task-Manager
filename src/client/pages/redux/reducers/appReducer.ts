import {Reducer} from 'redux'
import {AppActTypes} from '@redux/types/AppActTypes'
import {IAppState, IAppAction} from '@interfaces/IStore'


const defaultState: IAppState = {
    isDataUpdating: false,
    messages: [],
    errors: [],
    notifications: true,
    onlyImportant: false,
    onlyToday: false,
    showCompleted: true,
    showCancel: true,
    showOverdue: true
}


export const appReducer: Reducer<IAppState, IAppAction> = (state: IAppState = defaultState, action: IAppAction): IAppState => {
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
        case AppActTypes.setOnlyImportant:
            if(action.hasOwnProperty('onlyImportant') && typeof(action.onlyImportant) === 'boolean') {
                return {
                        ...state,
                        onlyImportant: action.onlyImportant
                    }
            }
            else {
                return state
            }
        case AppActTypes.setOnlyToday:
            if(action.hasOwnProperty('onlyToday') && typeof(action.onlyToday) === 'boolean') {
                return {
                        ...state,
                        onlyToday: action.onlyToday
                    }
            }
            else {
                return state
            }
        case AppActTypes.setShowCompleted:
            if(action.hasOwnProperty('showCompleted') && typeof(action.showCompleted) === 'boolean') {
                return {
                        ...state,
                        showCompleted: action.showCompleted
                    }
            }
            else {
                return state
            }
        case AppActTypes.setShowCancel:
            if(action.hasOwnProperty('showCancel') && typeof(action.showCancel) === 'boolean') {
                return {
                        ...state,
                        showCancel: action.showCancel
                    }
            }
            else {
                return state
            }
        case AppActTypes.setShowOverdue:
            if(action.hasOwnProperty('showOverdue') && typeof(action.showOverdue) === 'boolean') {
                return {
                        ...state,
                        showOverdue: action.showOverdue
                    }
            }
            else {
                return state
            }
        case AppActTypes.setDefault:
            return defaultState
        default:
            return state
    }
}