import React from 'react'
import {useLocation} from 'react-router-dom'
import {Container, Row, Col, Button, Dropdown} from 'react-bootstrap'
import {MainFooter} from '@react/components/footer/MainFooter'


export const useFooter = (): React.ReactElement => {
    const routeName = useLocation().pathname;
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