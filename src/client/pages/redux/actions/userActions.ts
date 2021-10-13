import {UserActTypes} from '@redux/types/UserActTypes'
import {IUserAction, IUserState, IThunkAction, IThunkDispatch} from '@interfaces/IStore'
import {INewUser, IUserInstance, ILogin, IEmailUp, INameUp} from '@interfaces/IUser'
import UserAPI from '@core/classes/UserAPI'
import {Dispatch} from 'redux'


export const setUser = (user: IUserInstance): IUserAction => {
    return {
        type: UserActTypes.setUser,
        user
    }
};

export const setDefault = (): IUserAction => {
    return {
        type: UserActTypes.setDefault
    }
};

export const setUpdatingStatus = (isDataUpdating: boolean): IUserAction => {
    return {
        type: UserActTypes.setUpdatingStatus,
        isDataUpdating
    }
};

export const setValidPass = (isValidPass: boolean): IUserAction => {
    return {
        type: UserActTypes.setValidPass,
        isValidPass
    }
};

export const setError = (error: string): IUserAction => {
    return {
        type: UserActTypes.setError,
        error
    }
};

export const setMessage = (message: string): IUserAction => {
    return {
        type: UserActTypes.setMessage,
        message
    }
};

export const clearError = (): IUserAction => {
    return {
        type: UserActTypes.clearError
    }
};

export const clearMessage = (): IUserAction => {
    return {
        type: UserActTypes.clearMessage
    }
};

export const getCurrentUser = (): IThunkAction<IUserState> => {
    return async (dispatch: Dispatch<IUserAction>): Promise<void> => {
        try {
            dispatch(setUpdatingStatus(true));
            const user = await UserAPI.getCurrentUser();
            dispatch(setUser(user));
        }
        catch(e) {
            dispatch(setUpdatingStatus(false));
            if(typeof(e) === 'string') {
                dispatch(setError(e));
            }
            else {
                dispatch(setError('Authorization error'));
            }
        }
    }
}

export const toLogin = (login: ILogin): IThunkAction<IUserState> => {
    return async (dispatch: Dispatch<IUserAction>): Promise<void> => {
        try {
            dispatch(setUpdatingStatus(true));
            const user = await UserAPI.toLogin(login);
            dispatch(setUser(user));
            dispatch(setMessage('You have been authorized'));
        }
        catch(e) {
            dispatch(setUpdatingStatus(false));
            if(typeof(e) === 'string') {
                dispatch(setError(e));
            }
            else {
                dispatch(setError('Authorization error'));
            }
        }
    }
}

export const toRegister = (newUser: INewUser): IThunkAction<IUserState> => {
    return async (dispatch: Dispatch<IUserAction>): Promise<void> => {
        try {
            dispatch(setUpdatingStatus(true));
            await UserAPI.toRegister(newUser);
            const login: ILogin = {
                email: newUser.email,
                password: newUser.password
            }
            dispatch(setMessage(`User with email ${newUser.email} has been registered`));
            const user = await UserAPI.toLogin(login);
            dispatch(setUser(user));
        }
        catch(e) {
            dispatch(setUpdatingStatus(false));
            if(typeof(e) === 'string') {
                dispatch(setError(e));
            }
            else {
                dispatch(setError('Authorization error'));
            }
        }
    }
}

export const toLogout = (): IThunkAction<IUserState> => {
    return async (dispatch: Dispatch<IUserAction>): Promise<void> => {
        try {
            dispatch(setUpdatingStatus(true));
            await UserAPI.toLogout();
            dispatch(setDefault());
            dispatch(setMessage('You have been unauthorized'));
        }
        catch(e) {
            dispatch(setUpdatingStatus(false));
            if(typeof(e) === 'string') {
                dispatch(setError(e));
            }
            else {
                dispatch(setError('Authorization error'));
            }
        }
    }
}

export const toUpdateEmail = (data: IEmailUp): IThunkAction<IUserState> => {
    return async (dispatch: Dispatch<IUserAction>): Promise<void> => {
        try {
            const thunkDispatch = dispatch as IThunkDispatch<IThunkAction<IUserState>>;
            dispatch(setUpdatingStatus(true));
            const oldEmail = data.email;
            const newEmail = data.newEmail;
            const isMatch = await UserAPI.toUpdateEmail(data);
            if(isMatch) {
                dispatch(setMessage(`Email have been changed from ${oldEmail} to ${newEmail}`));
                thunkDispatch(getCurrentUser());
            }
            else {
                dispatch(setValidPass(false));
                dispatch(setUpdatingStatus(false));
            }

        }
        catch(e) {
            dispatch(setUpdatingStatus(false));
            if(typeof(e) === 'string') {
                dispatch(setError(e));
            }
            else {
                dispatch(setError('Authorization error'));
            }
        }
    }
}

export const toUpdateName = (data: INameUp): IThunkAction<IUserState> => {
    return async (dispatch: Dispatch<IUserAction>): Promise<void> => {
        try {
            const thunkDispatch = dispatch as IThunkDispatch<IThunkAction<IUserState>>;
            dispatch(setUpdatingStatus(true));
            const oldName = data.name;
            const newName = data.newName;
            await UserAPI.toUpdateName(data);
            dispatch(setMessage(`Name have been changed from ${oldName} to ${newName}`));
            thunkDispatch(getCurrentUser());
        }
        catch(e) {
            dispatch(setUpdatingStatus(false));
            if(typeof(e) === 'string') {
                dispatch(setError(e));
            }
            else {
                dispatch(setError('Authorization error'));
            }
        }
    }
}