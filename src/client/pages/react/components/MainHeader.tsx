import React, {useState} from 'react'
import {Container, Row, Col, Button, Dropdown} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import { faBars, faTh, faFilter, faCheckSquare, faFlag } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle, faCalendarCheck } from '@fortawesome/free-regular-svg-icons'

interface IFilter {
    ico: IconDefinition;
    filter: string;
    values: string[];
    valueNum: number;
}

export const MainHeader: React.FC = () => {
    const FiltersDataDefault: IFilter[] = [
        {
            ico: faFilter,
            filter: 'Sort by',
            values: ['Time descending', 'Time ascending'],
            valueNum: 0
        },
        {
            ico: faCheckSquare,
            filter: 'Show completed',
            values: ['Yes', 'No'],
            valueNum: 0
        },
        {
            ico: faFlag,
            filter: 'Only important',
            values: ['No', 'Yes'],
            valueNum: 0
        },
        {
            ico: faCalendarCheck,
            filter: 'Only today tasks',
            values: ['No', 'Yes'],
            valueNum: 0
        }
    ];
    const [filterState, setFilter] = useState(FiltersDataDefault);
    const [titleState, setTitle] = useState('My List');

    const Filters: React.ReactElement[] = filterState.map((filter: IFilter): React.ReactElement => {
        return (
        <Dropdown.Item as="button" className="filter-item">
            <Row className="align-items-center" sm="12">
                <Col xs="1">
                    <FontAwesomeIcon className="filter-ico" icon={filter.ico} />
                </Col>
                <Col as="h3" className="filter-setting" xs="6">{`${filter.filter}:`}</Col>
                <Col as="p" className="filter-value" xs="3">{filter.values[filter.valueNum]}</Col>
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