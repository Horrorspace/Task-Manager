import React, {useState, useEffect, ChangeEvent, MouseEvent} from 'react'
import {AddTask} from '@react/components/AddTask'
import {Container, Row, Col, Button} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {addTask, editTask, deleteTask, toggleCancel, toggleComplete, togglePriority} from '@redux/actions/taskActions'
import {IRootState, IAppState} from '@interfaces/IStore'
import {IUserInstance} from '@interfaces/IUser'
import {ITaskInstance, ITasksInstance, INewTask} from '@interfaces/ITask'
import {getLocalDataString, getLocalFullDataString, getLocalTimeString, getDateOnly, dateStringify, dateParser} from '@core/functions/dateConverte'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import { faClipboardList, faUser, faBriefcase, faPlus, faFlag, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'


interface IMenuItem {
    ico: IconDefinition;
    link?: string;
    handler?: (event?: MouseEvent<HTMLElement>) => void;
    title: string;
    itemsNum: number;
    items: string;
}

export const Main: React.FC = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state: IRootState): IUserInstance => state.user.user!);
    const tasksData = useSelector((state: IRootState): ITasksInstance => state.task.tasks);
    const [addShow, setAddShow] = useState(false);
    const [title, setTitle] = useState('');
    const [task, setTask] = useState('');
    const [dateToDo, setDateToDo] = useState(new Date(Date.now()));
    const [calendarClasses, setCalendarClasses] = useState(['hidden', 'calendar-wrap']);
    const [timeClasses, setTimeClasses] = useState(['hidden']);

    useEffect(() => {
        const titleArea: HTMLTextAreaElement | null = document.querySelector('.add-task-title-area');
        const textArea: HTMLTextAreaElement | null = document.querySelector('.add-task-text-area');
                       
        if(titleArea && textArea) {
            titleArea.style.height = `auto`;
            textArea.style.height = `auto`;
            titleArea.style.height = `${titleArea.scrollHeight}px`;
            textArea.style.height = `${textArea.scrollHeight}px`;
        }
    });

    const setDefault = (): void => {
        setTitle('');
        setTask('');
        setDateToDo(new Date(Date.now()));
        setCalendarClasses(prev => {
            if(prev.indexOf('hidden') === -1) {
                return [...prev, 'hidden']
            }
            else{
                return prev
            }
        });
        setTimeClasses(prev => {
            if(prev.indexOf('hidden') === -1) {
                return [...prev, 'hidden']
            }
            else {
                return prev
            }
        })
    }

    const handleAddTask = ():void => {
        const taskToAdd: INewTask<string> = {
            title,
            task,
            email: userData.getUserEmail(),
            dateToDo: dateStringify(dateToDo)
        }
        dispatch(addTask(taskToAdd));
        setDefault();
        setAddShow(false);
    }

    const handleAddClose = (): void => {
        setDefault();
        setAddShow(false);
    }

    const handleTitleChange = (event?: ChangeEvent<HTMLElement>) => {
        if(event) {
            const target = event.target as HTMLTextAreaElement;
            const value = target.value;
            setTitle(value);
        }
    }

    const handleTaskChange = (event?: ChangeEvent<HTMLElement>) => {
        if(event) {
            const target = event.target as HTMLTextAreaElement;
            const value = target.value;
            setTask(value);
        }
    }

    const handleDate = (value?: Date): void => {
        if(value) {
            setDateToDo(prev => {
                const dateResult = new Date();
                dateResult.setFullYear(value.getFullYear());
                dateResult.setMonth(value.getMonth());
                dateResult.setDate(value.getDate());
                dateResult.setHours(prev.getHours());
                dateResult.setMinutes(prev.getMinutes());
                dateResult.setSeconds(prev.getSeconds());
                return dateResult
            })
        }
    }

    const handleHour = (event?: MouseEvent<HTMLElement>): void => {
        if(event) {
            setDateToDo(prev => {
                const target = event.target as HTMLLIElement;
                const value: number = parseInt(target.innerText, 10);
                const dateResult = new Date();
                dateResult.setFullYear(prev.getFullYear());
                dateResult.setMonth(prev.getMonth());
                dateResult.setDate(prev.getDate());
                dateResult.setHours(value);
                dateResult.setMinutes(prev.getMinutes());
                dateResult.setSeconds(prev.getSeconds());
                return dateResult
            })
        }
    }

    const handleMinutes = (event?: MouseEvent<HTMLElement>): void => {
        if(event) {
            setDateToDo(prev => {
                const target = event.target as HTMLLIElement;
                const value: number = parseInt(target.innerText, 10);
                const dateResult = new Date();
                dateResult.setFullYear(prev.getFullYear());
                dateResult.setMonth(prev.getMonth());
                dateResult.setDate(prev.getDate());
                dateResult.setHours(prev.getHours());
                dateResult.setMinutes(value);
                dateResult.setSeconds(prev.getSeconds());
                return dateResult
            })
        }
    }

    const handleAddOpen = (): void => {
        setAddShow(true)
    }

    const handleCalendarToggle = (): void => {
        setCalendarClasses(prev => {
            if(prev.indexOf('hidden') === -1) {
                return [...prev, 'hidden']
            }
            else {
                return prev.filter(className => className !== 'hidden')
            }
        })
    }

    const handleTimeToggle = (): void => {
        setTimeClasses(prev => {
            if(prev.indexOf('hidden') === -1) {
                return [...prev, 'hidden']
            }
            else {
                return prev.filter(className => className !== 'hidden')
            }
        })
    }
    
    const MenuData: IMenuItem[] = [
        {
            ico: faClipboardList,
            link: '/List',
            title: 'All Tasks',
            itemsNum: tasksData.getAllTasks().length,
            items: 'Items'
        },
        {
            ico: faFlag,
            link: '/Important',
            title: 'Important',
            itemsNum: tasksData.getPriorityTasks().length,
            items: 'Items'
        },
        {
            ico: faCalendarCheck,
            link: '/Today',
            title: 'Today',
            itemsNum: tasksData
                .getAllTasks()
                .filter(task => 
                    getLocalDataString(task.getDateToDo()) === getLocalDataString(new Date(Date.now()))
                )
                .length,
            items: 'Items'
        },
        {
            ico: faPlus,
            handler: handleAddOpen,
            title: 'Add Task',
            itemsNum: tasksData.getAllTasks().length,
            items: 'Items'
        }
    ];
    const [menuState, setMenu] = useState(MenuData);
    const [zeroState, setZero] = useState('No');

    const Menu: React.ReactElement[] = MenuData.map((menuItem: IMenuItem): React.ReactElement => {
        if(menuItem.link) {
            return (
                <Col as="li" className="menu-item d-flex justify-content-center" sm="5">
                    <NavLink to={menuItem.link} className="menu-link">
                        <FontAwesomeIcon className="menu-ico" icon={menuItem.ico} />
                        <h2 className="menu-title">{menuItem.title}</h2>
                        <p className="menu-description">{`${menuItem.itemsNum > 0 ? menuItem.itemsNum : zeroState} ${menuItem.items}`}</p>
                    </NavLink>
                </Col>
            )
        }
        else {
            return (
                <Col as="li" className="menu-item d-flex justify-content-center" sm="5">
                    <Container as="button" className="menu-link" onClick={menuItem.handler}>
                        <FontAwesomeIcon className="menu-ico" icon={menuItem.ico} />
                        <h2 className="menu-title">{menuItem.title}</h2>
                        <p className="menu-description">{`${menuItem.itemsNum > 0 ? menuItem.itemsNum : zeroState} ${menuItem.items}`}</p>
                    </Container>
                </Col>
            ) 
        }

    });
    
    return (
        <Container as="main" className="main" fluid>
            <Container as="section" className="main-menu d-flex justify-content-center align-items-center" fluid="xl">
                <Row as="ul" className="menu-list d-flex justify-content-center">
                    {Menu}
                </Row>
            </Container>
            <AddTask
                    onHide={handleAddClose}
                    onTitleChange={handleTitleChange}
                    onTaskChange={handleTaskChange}
                    onCalendarClick={handleCalendarToggle}
                    onTimeClick={handleTimeToggle}
                    onDateChange={handleDate}
                    onHourClick={handleHour}
                    onMinuteClick={handleMinutes}
                    onAddClick={handleAddTask}
                    onCloseClick={handleAddClose}
                    show={addShow}
                    title={title}
                    task={task}
                    dateToDo={dateToDo}
                    calendarClasses={calendarClasses}
                    timeClasses={timeClasses}
            />
        </Container>
    )
}
