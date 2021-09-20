import React from 'react'
import {Container, Row, Col, Button, Dropdown} from 'react-bootstrap'
import {MainFooter} from '@react/components/MainFooter'


export const useFooter = (routeName: string): React.ReactElement => {
    switch(routeName) {
        case '/Auth':
            return (
                <Container as="footer" className="footer mx-auto fixed-bottom" fluid />
            )
        default:
            return (
                <MainFooter />
            )
    }
}