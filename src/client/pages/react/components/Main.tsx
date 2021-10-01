import React, {useState} from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {IRootState} from '@interfaces/IStore'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import { faClipboardList, faUser, faBriefcase, faPlus } from '@fortawesome/free-solid-svg-icons'


interface IMenuItem {
    ico: IconDefinition;
    link: string;
    title: string;
    itemsNum: number;
    items: string;
}

export const Main: React.FC = () => {
    const tasksData = useSelector((state: IRootState): ITasksInstance => state.task.tasks);
    
    const MenuDataDefault: IMenuItem[] = [
        {
            ico: faClipboardList,
            link: '/List',
            title: 'All Tasks',
            itemsNum: {tasksData.getAllTasks().length},
            items: 'Items'
        },
        {
            ico: faUser,
            link: '/List',
            title: 'Personal',
            itemsNum: 0,
            items: 'Items'
        },
        {
            ico: faBriefcase,
            link: '/List',
            title: 'Work',
            itemsNum: 0,
            items: 'Items'
        },
        {
            ico: faPlus,
            link: '/List',
            title: 'Add Task',
            itemsNum: {tasksData.getAllTasks().length},
            items: 'Items'
        }
    ];
    const [menuState, setMenu] = useState(MenuDataDefault);
    const [zeroState, setZero] = useState('No');

    const Menu: React.ReactElement[] = menuState.map((menuItem: IMenuItem): React.ReactElement => {
        return (
            <Col as="li" className="menu-item d-flex justify-content-center" sm="5">
                <NavLink to={menuItem.link} className="menu-link">
                    <FontAwesomeIcon className="menu-ico" icon={menuItem.ico} />
                    <h2 className="menu-title">{menuItem.title}</h2>
                    <p className="menu-description">{`${menuItem.itemsNum > 0 ? menuItem.itemsNum : zeroState} ${menuItem.items}`}</p>
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
