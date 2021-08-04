import React, {useState} from 'react'
import {Container, Row, Col, Button, Dropdown} from 'react-bootstrap'

export const Settings: React.FC = () => {
    return (
        <Container as="main" className="main" fluid>
            <Container as="section" className="settings d-flex justify-content-center align-items-center" fluid="xl">
                <h2 className="settings-title">Account</h2>
                <Row as="ul" className="menu-list d-flex justify-content-center">
                    
                </Row>
            </Container>
        </Container>
    )
}
