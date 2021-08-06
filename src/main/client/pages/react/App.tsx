import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Calendar} from './components/Calendar'
import {Footer} from './components/Footer'
import {Header} from './components/Header'
import {Main} from './components/Main'
import {Settings} from './components/Settings'
import {TasksList} from './components/TasksList'

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route component={Main} path="/" exact />
                <Route component={TasksList} path="/List" />
                <Route component={Calendar} path="/Calendar" />
                <Route component={Settings} path="/Settings" />
            </Switch>
            <Settings />
            <Footer />
        </BrowserRouter>
    )
}