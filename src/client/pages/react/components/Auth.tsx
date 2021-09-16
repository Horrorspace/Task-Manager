import React, {useState} from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'


export const Auth: React.FC = () => {
    return (
        <Container as="main" className="main" fluid>
            <Container as="section" className="auth d-flex flex-column justify-content-center align-items-center" fluid="xl">
                <Container className="auth-field-wrap">  
                  <h2 className="auth-title">Email:</h2>
                  <textarea className="auth-text"></textarea>
                </Container>  
                <Container className="auth-field-wrap">  
                  <h2 className="auth-title">Password:</h2>
                  <textarea className="auth-text"></textarea>
                </Container>
            </Container>
        </Container>
    )
}
