import React, {useState} from 'react'
import {Container, Row, Col, Button, Dropdown} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons'


export const Footer: React.FC = () => {
    return (
        <Container as="footer" className="footer mx-auto" fluid>
            <Container as="nav" className="navigation d-flex justify-content-center align-items-center" fluid="lg">
                <Row as="ul" className="nav-list d-flex justify-content-center">
                    <Col className="nav-item" sm="4">
                        <NavLink to="/" className="nav-link">
                            <FontAwesomeIcon className="nav-ico" icon={faCheckSquare} />
                            <h2 className="nav-title">Tasks</h2>
                        </NavLink>
                    </Col>

                    <Col className="nav-item" sm="4">
                        <NavLink to="/" className="nav-link">
                            <FontAwesomeIcon className="nav-ico" icon={faCheckSquare} />
                            <h2 className="nav-title">Tasks</h2>
                        </NavLink>
                    </Col>

                    <Col className="nav-item" sm="4">
                        <NavLink to="/" className="nav-link">
                            <FontAwesomeIcon className="nav-ico" icon={faCheckSquare} />
                            <h2 className="nav-title">Tasks</h2>
                        </NavLink>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}