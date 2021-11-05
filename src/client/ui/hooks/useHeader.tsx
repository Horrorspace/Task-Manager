import React from 'react'
import {useLocation} from 'react-router-dom'
import {Container, Row, Col, Button, Dropdown} from 'react-bootstrap'
import {MainHeader} from '@react/components/header/MainHeader'
import {SimpleHeader} from '@react/components/header/SimpleHeader'



export const useHeader = (): React.ReactElement => {
    const routeName = useLocation().pathname;
    switch(routeName) {
        case '/Auth':
            return (
                <Container as="header" className="header mx-auto" fluid />
            )
        case '/List':
            return (
                <MainHeader 
                    titleState="All Tasks"
                />
            )
        case '/':
            return (
                <MainHeader 
                    titleState="My Tasks"
                />
            )
        case '/Important':
            return (
                <MainHeader 
                    titleState="Important Tasks"
                    hideOnlyImportant={true}
                />
            )
        case '/Today':
            return (
                <MainHeader 
                    titleState="Today Tasks"
                    hideOnlyToday={true}
                />
            )
        case '/Calendar':
            return (
                <MainHeader 
                    titleState="Calendar"
                />
            )
        case '/Settings':
            return (
                <SimpleHeader 
                    titleState="Settings"
                />
            )
        default:
            return (
                <Container as="header" className="header mx-auto" fluid />
            )
    }
}