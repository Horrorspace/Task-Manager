import React, {useState} from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import { faClipboardList, faUser, faBriefcase, faPlus } from '@fortawesome/free-solid-svg-icons'


interface IMenuItem {
    ico: IconDefinition;
    title: string;
    itemsNum: number;
}


export const Main: React.FC = () => {
    const MenuDataDefault: IMenuItem[] = [
        {
            ico: faClipboardList,
            title: 'All Tasks',
            itemsNum: 5,
        },
        {
            ico: faUser,
            title: 'Personal',
            itemsNum: 5,
        },
        {
            ico: faBriefcase,
            title: 'Work',
            itemsNum: 0,
        },
        {
            ico: faPlus,
            title: 'Add Task',
            itemsNum: 5,
        }
    ];
    const [menuState, setMenu] = useState(MenuDataDefault);

    const Menu: React.ReactElement[] = menuState.map((menuItem: IMenuItem): React.ReactElement => {
        return (
            <Col as="li" className="menu-item d-flex justify-content-center" sm="5">
                <NavLink to="/" className="menu-link">
                    <FontAwesomeIcon className="menu-ico" icon={menuItem.ico} />
                    <h2 className="menu-title">{menuItem.title}</h2>
                    <p className="menu-description">{`${menuItem.itemsNum > 0 ? menuItem.itemsNum : 'No'} Items`}</p>
                </NavLink>
            </Col>
        )
    });
    
    return (
        <Container as="main" className="main" fluid>
            <Container as="section" className="main-menu d-flex justify-content-center align-items-center" fluid="xl">
                <Row as="ul" className="menu-list d-flex justify-content-center">
                    {Menu}
                </Row>
            </Container>
        </Container>
    )
}