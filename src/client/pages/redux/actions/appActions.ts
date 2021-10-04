import {AppActTypes} from '@redux/types/AppActTypes'
import {IAppAction} from '@interfaces/IStore'



export const addError = (error: string): IAppAction => {
    return {
        type: AppActTypes.addError,
        error
    }
};

export const addMessage = (message: string): IAppAction => {
    return {
        type: AppActTypes.addMessage,
        message
    }
};

export const clearErrors = (): IAppAction => {
    return {
        type: AppActTypes.clearErrors,
    }
};

export const clearMessages = (): IAppAction => {
    return {
        type: AppActTypes.clearMessages,
    }
};

export const removeLastError = (): IAppAction => {
    return {
        type: AppActTypes.removeLastError,
    }
};

export const removeLastMessage = (): IAppAction => {
    return {
        type: AppActTypes.removeLastMessage,
    }
};

export const setNotifications = (notifications: boolean): IAppAction => {
    return {
        type: AppActTypes.setNotifications,
        notifications
    }
};

export const setUpdatingStatus = (isDataUpdating: boolean): IAppAction => {
    return {
        type: AppActTypes.setUpdatingStatus,
        isDataUpdating
    }
};

export const setOnlyImportant = (onlyImportant: boolean): IAppAction => {
    return {
        type: AppActTypes.setOnlyImportant,
        onlyImportant
    }
};

export const setOnlyToday = (onlyToday: boolean): IAppAction => {
    return {
        type: AppActTypes.setOnlyToday,
        onlyToday
    }
};

export const setShowCompleted = (showCompleted: boolean): IAppAction => {
    return {
        type: AppActTypes.setShowCompleted,
        showCompleted
    }
};

export const setShowCancel = (showCancel: boolean): IAppAction => {
    return {
        type: AppActTypes.setShowCancel,
        showCancel
    }
};

export const setShowOverdue = (showOverdue: boolean): IAppAction => {
    return {
        type: AppActTypes.setShowOverdue,
        showOverdue
    }
};

export const setDefault = (): IAppAction => {
    return {
        type: AppActTypes.setDefault,
    }
};