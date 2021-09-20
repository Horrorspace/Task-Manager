import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {Calendar} from '@react/components/Calendar'
import {Main} from '@react/components/Main'
import {Settings} from '@react/components/Settings'
import {TasksList} from '@react/components/TasksList'
import {Auth} from '@react/components/Auth'


export const useRoutes = (isLogined: boolean): React.ReactElement => {
    if(isLogined) {
        return (
            <Switch>
                <Route component={Main} path="/" exact />
                <Route component={TasksList} path="/List" />
                <Route component={Calendar} path="/Calendar" />
                <Route component={Settings} path="/Settings" />
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