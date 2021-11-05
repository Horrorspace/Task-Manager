import React, {MouseEvent, useState} from 'react'
import {Container, Row, Col, Button, Dropdown} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {setOnlyImportant, setOnlyToday, setShowCompleted, setShowCancel, setShowOverdue} from '@redux/actions/appActions'
import {IRootState, IAppState} from '@interfaces/IStore'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import { faBars, faTh, faFilter, faCheckSquare, faFlag, faHandPaper } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle, faCalendarCheck, faClock } from '@fortawesome/free-regular-svg-icons'


interface IFilter {
    ico: IconDefinition;
    filter: string;
    values: string[];
    value: boolean;
    handler: () => void;
    show: boolean;
}

interface MainHeaderProps {
    titleState?: string;
    hideOnlyImportant?: boolean;
    hideOnlyToday?: boolean;
}

const defProps: MainHeaderProps = {
    titleState: 'My List',
    hideOnlyImportant: true,
    hideOnlyToday: true,
}

export const MainHeader: React.FC<MainHeaderProps> = (
    {
        titleState,
        hideOnlyImportant,
        hideOnlyToday
    }: MainHeaderProps = defProps
) => {
    const dispatch = useDispatch();
    const appState = useSelector((state: IRootState): IAppState => state.app);
    
    const handleOnlyPriority = () => {
        dispatch(setOnlyImportant(!appState.onlyImportant))
    }
    const handleOnlyToday = () => {
        dispatch(setOnlyToday(!appState.onlyToday))
    }
    const handleShowCompleted = () => {
        dispatch(setShowCompleted(!appState.showCompleted))
    }
    const handleShowCancel = () => {
        dispatch(setShowCancel(!appState.showCancel))
    }
    const handleShowOverdue = () => {
        dispatch(setShowOverdue(!appState.showOverdue))
    }
    
    const FiltersData: IFilter[] = [
        {
            ico: faFilter,
            filter: 'Sort by',
            values: ['Time descending', 'Time ascending'],
            value: false,
            handler: () => {},
            show: true
        },
        {
            ico: faFlag,
            filter: 'Only important',
            values: ['No', 'Yes'],
            value: appState.onlyImportant,
            handler: handleOnlyPriority,
            show: !hideOnlyImportant!
        },
        {
            ico: faCalendarCheck,
            filter: 'Only today tasks',
            values: ['No', 'Yes']   ,
            value: appState.onlyToday,
            handler: handleOnlyToday,
            show: !hideOnlyToday!
        },
        {
            ico: faCheckSquare,
            filter: 'Show completed',
            values: ['No', 'Yes'],
            value: appState.showCompleted,
            handler: handleShowCompleted,
            show: true
        },
        {
            ico: faHandPaper,
            filter: 'Show cancel',
            values: ['No', 'Yes']   ,
            value: appState.showCancel,
            handler: handleShowCancel,
            show: true
        },
        {
            ico: faClock,
            filter: 'Show Overdue',
            values: ['No', 'Yes']   ,
            value: appState.showOverdue,
            handler: handleShowOverdue,
            show: true
        }
    ];

    const Filters: React.ReactElement[] = FiltersData.map((filter: IFilter): React.ReactElement => {
        return (
        <Dropdown.Item 
            as="button" 
            className={filter.show ? "filter-item" : "hidden"}
            onClick={filter.handler}
        >
            <Row 
                className="align-items-center"
                sm="12"
            >
                <Col xs="1">
                    <FontAwesomeIcon className="filter-ico" icon={filter.ico} />
                </Col>
                <Col as="h3" className="filter-setting" xs="6">
                    {`${filter.filter}:`}
                </Col>
                <Col as="p" className="filter-value" xs="3">
                    {filter.value ? filter.values[1] : filter.values[0]}
                </Col>
            </Row>
        </Dropdown.Item>
        )
    })

    return (
            <Container as="header" className="header mx-auto" fluid>
                <Row className="header-wrap mx-auto d-flex align-items-center">
                    <Col className="title-wrap" sm="9">
                        <h1 className="title">{titleState}</h1>
                    </Col>
                    <Col className="options-wrap" sm="3">
                        <Row as="ul" className="options-list">
                            <Col className="options-item d-flex justify-content-end" as="li" sm="6">
                                <Button className="options-btn hidden" variant="light" size="lg">
                                    <FontAwesomeIcon className="options-ico" icon={faTh} />
                                </Button>
                            </Col>
                            <Col as="li" className="options-item d-flex justify-content-end" sm="6">
                                <Dropdown>
                                    <Dropdown.Toggle className="options-btn" variant="light" size="lg">
                                        <FontAwesomeIcon className="options-ico" icon={faBars} />
                                        <FontAwesomeIcon className="options-ico hidden" icon={faTimesCircle} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu as="div" className="filters-list">
                                        {Filters}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
    )
}