import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {setOnlyImportant, setOnlyToday} from '@redux/actions/appActions'
import {Calendar} from '@react/components/Calendar'
import {Main} from '@react/components/Main'
import {Settings} from '@react/components/Settings'
import {TasksList} from '@react/components/TasksList'
import {Auth} from '@react/components/Auth'


export const useRoutes = (isLogined: boolean): React.ReactElement => {
    const dispatch = useDispatch();

    if(isLogined) {
        return (
            <Switch>
                <Route component={Main} path="/" exact />
                <Route  
                    render={() => {
                        dispatch(setOnlyImportant(false));
                        dispatch(setOnlyToday(false))

                        return(
                            <TasksList />
                        )
                    }}  
                    path="/List"
                    exact 
                />
                <Route  
                    render={() => {
                        dispatch(setOnlyImportant(true));
                        dispatch(setOnlyToday(false))

                        return(
                            <TasksList />
                        )
                    }}  
                    path="/Important"
                    exact 
                />
                <Route 
                    render={() => {
                        dispatch(setOnlyImportant(false));
                        dispatch(setOnlyToday(true))

                        return(
                            <TasksList />
                        )
                    }}
                    path="/Today" 
                    exact 
                />
                <Route component={Settings} path="/Settings" exact />
                <Redirect to="/" />
            </Switch>
        )
    }
    else {
        return (
            <Switch>
                <Route component={Auth} path="/Auth" exact />
                <Redirect to="/Auth" />
            </Switch>
        )
    }
}