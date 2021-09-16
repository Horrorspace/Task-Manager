import React, {useState} from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'


export const Auth: React.FC = () => {
    return (
        <Container as="main" className="main" fluid>
            <Container as="section" className="auth d-flex flex-column justify-content-center align-items-center" fluid="xl">
                <Container>  
                  <h2>Email:</h2>
                  <textarea></textarea>
                </Container>  
                <Container>  
                  <h2>Password:</h2>
                  <textarea></textarea>
                </Container> 
            </Container>
        </Container>
    )
}
