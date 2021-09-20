import React from 'react'
import {Container, Row, Col, Button, Dropdown} from 'react-bootstrap'
import {MainHeader} from '@react/components/MainHeader'


export const useHeader = (routeName: string): React.ReactElement => {
    switch(routeName) {
        case '/Auth':
            return (
                <Container as="header" className="header mx-auto" fluid />
            )
        default:
            return (
                <MainHeader />
            )
    }
}