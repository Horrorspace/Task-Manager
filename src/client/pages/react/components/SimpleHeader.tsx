import React, {MouseEvent, useState} from 'react'
import {Container, Row, Col, Button, Dropdown} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {setOnlyImportant, setOnlyToday, setShowCompleted, setShowCancel, setShowOverdue} from '@redux/actions/appActions'
import {IRootState, IAppState} from '@interfaces/IStore'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import { faBars, faTh, faFilter, faCheckSquare, faFlag, faHandPaper } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle, faCalendarCheck, faClock } from '@fortawesome/free-regular-svg-icons'


interface SimpleHeaderProps {
    titleState?: string;
}

const defProps: SimpleHeaderProps = {
    titleState: 'My List'
}

export const SimpleHeader: React.FC<SimpleHeaderProps> = ({titleState}: SimpleHeaderProps = defProps) => {
    return (
            <Container as="header" className="header mx-auto" fluid>
                <Row className="header-wrap mx-auto d-flex align-items-center">
                    <Col className="title-wrap" sm="9">
                        <h1 className="title">{titleState}</h1>
                    </Col>
                </Row>
            </Container>
    )
}