import React, {useState} from 'react'
import {Container, Row, Col, Button, Dropdown} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
import { faCheckSquare, faCalendarCheck } from '@fortawesome/free-regular-svg-icons'

interface ILink {
    ico: IconDefinition;
    link: string;
    title: string;
}

export const MainFooter: React.FC = () => {
    const linkDataDefault: ILink[] = [
        {
            ico: faCheckSquare,
            link: '/',
            title: 'Tasks'
        },
        {
            ico: faCalendarCheck,
            link: '/Calendar',
            title: 'Calendar'
        },
        {
            ico: faSlidersH,
            link: '/Settings',
            title: 'Settings'
        }
    ];
    const [linksState, setLinks] = useState(linkDataDefault);
    
    
    const Links: React.ReactElement[] = linksState.map((link: ILink): React.ReactElement => {
    return (
            <Col className="nav-item d-flex justify-content-center" xs="4">
                <NavLink to={link.link} className="nav-link d-flex flex-column align-items-center">
                    <FontAwesomeIcon className="nav-ico" icon={link.ico} />
                    <h2 className="nav-title">{link.title}</h2>
                </NavLink>
            </Col>
        )
    })
    
    return (
        <Container as="footer" className="footer mx-auto fixed-bottom" fluid>
            <Container as="nav" className="navigation d-flex justify-content-center align-items-center" fluid="lg">
                <Row as="ul" className="nav-list d-flex justify-content-between">
                    {Links}
                </Row>
            </Container>
        </Container>
    )
}
