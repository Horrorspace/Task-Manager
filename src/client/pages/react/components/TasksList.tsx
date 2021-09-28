import React, {ChangeEvent, MouseEvent, ReactElement, useState} from 'react'
import {Container, Row, Col, Button, Form, Modal, ButtonGroup, ToggleButton, Popover} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import Calendar from 'react-calendar'
import {addTask, editTask, deleteTask, toggleCancel, toggleComplete, togglePriority} from '@redux/actions/taskActions'
import Moment from 'react-moment'
import {IRootState} from '@interfaces/IStore'
import {ITaskInstance, ITasksInstance, INewTask, ITaskToEdit} from '@interfaces/ITask'
import {IUserInstance} from '@interfaces/IUser'
import {getLocalDataString, getLocalFullDataString, getLocalTimeString, getDateOnly, dateStringify, dateParser} from '@core/functions/dateConverte'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons'
import {faSquare} from '@fortawesome/free-regular-svg-icons'


type localDate = [number, number, number]


export const TasksList: React.FC = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state: IRootState): IUserInstance => state.user.user!);
    const tasksData = useSelector((state: IRootState): ITasksInstance => state.task.tasks);
    const [addShow, setAddShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [delShow, setDelShow] = useState(false);
    const [id, setId] = useState<number | null>(null);
    const [priority, setPriority] = useState(false);
    const [complite, setComplite] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [title, setTitle] = useState('');
    const [task, setTask] = useState('');
    const [dateToDo, setDateToDo] = useState(new Date(Date.now()));
    const [calendarClasses, setCalendarClasses] = useState(['hidden']);
    const [timeClasses, setTimeClasses] = useState(['hidden']);


    const tasksList = tasksData.getAllTasks();
    const dateArr: string[] = tasksList
        .map((task: ITaskInstance): localDate => [
            task.getDateToDo().getFullYear(),
            task.getDateToDo().getMonth()+1,
            task.getDateToDo().getDate()
        ])
        .sort((a, b) => {
            if(a[0] !== b[0]) {
                return a[0] - b[0]
            }
            else if(a[1] !== b[1]) {
                return a[1] - b[1]
            }
            else {
                return a[2] - b[2]
            }
        })
        .map(a => `${a[2]}.${a[1]}.${a[0]}`);
    const dateList: string[] = []; 

    dateArr.forEach(date => {
        if(dateList.indexOf(date) === -1) {
            dateList.push(date)
        }
    });

    const setDefault = ():void => {
        setId(null);
        setTitle('');
        setTask('');
        setDateToDo(new Date(Date.now()));
        setPriority(false);
        setComplite(false);
        setCancel(false);
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
        setEditShow(false);
    }

    const handleEditTask = (): void => {
        if(id) {
            const oldTask: ITaskInstance = tasksData.getTaskById(id);
            const taskToEdit: ITaskToEdit = {
                id,
                title,
                task,
                dateToDo: dateStringify(dateToDo)
            }
            dispatch(editTask(taskToEdit));
            if(oldTask.getPriority() !== priority {
                dispatch(togglePriority(id));
            }
            if(oldTask.getComplite() !== complite {
                dispatch(toggleComplite(id));
            }
            if(oldTask.getCancel() !== cancel {
                dispatch(toggleCancel(id));
            }
        }
        setDefault();
        setEditShow(false);
        setDelShow(false);
    }
    
    const handleDelTask = (): void => {
        if(id) {
            dispatch(deleteTask(id));
        }
        setDefault();
        setAddShow(false);
        setEditShow(false);
        setDelShow(false);
    }

    const handleAddClose = (): void => {
        setDefault();
        setEditShow(false);
    }

    const handleEditClose = (): void => {
        setDefault();
        setEditShow(false);
        setDelShow(false);
    }

    const handleTitleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const target = event.target as HTMLTextAreaElement;
        const value = target.value;
        setTitle(value);
    }

    const handleTaskChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const target = event.target as HTMLTextAreaElement;
        const value = target.value;
        setTask(value);
    }

    const handleDate = (value: Date): void => {
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

    const handleHour = (event: MouseEvent<HTMLLIElement>): void => {
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

    const handleMinutes = (event: MouseEvent<HTMLLIElement>): void => {
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

    const handleAddOpen = (): void => {
        setAddShow(true)
    }

    const handleEditOpen = (event: MouseEvent<HTMLLIElement>): void => {
        const target =  event.target as HTMLLIElement;
        const idStr: string = target.id;
        const id: number | null = idStr.length > 0 ? parseInt(idStr, 10) : null;
        setId(id);
        if(id) {
            const taskToEdit = tasksData.getTaskById(id);
            setTitle(taskToEdit.getTitle());
            setTask(taskToEdit.getTask());
            setDateToDo(taskToEdit.getDateToDo());
            setPriority(taskToEdit.getPriority());
            setComplite(taskToEdit.getComplete());
            setCancel(taskToEdit.getCancel());
            setEditShow(true)
        }
    }
    
    const handlePriorityToggle = (): void => {
        setPriority(prev => !prev)
    }
    const handleCompliteToggle = (): void => {
        setComplite(prev => !prev)
    }
    const handleCancelToggle = (): void => {
        setCancel(prev => !prev)
    }

    const handleCalandarToggle = (): void => {
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
    const hours: number[] = [];
    const minutes: number[] = [];
    for(let i = 0; i < 24; i++) {
        hours.push(i)
    }
    for(let i = 0; i < 60; i++) {
        minutes.push(i)
    }

    const hoursPicker: ReactElement = 
        <Col as="ul">
            {hours.map(hour => <li onClick={handleHour} key={hour}>{hour}</li>)}
        </Col>
    const minutesPicker: ReactElement = 
        <Col as="ul">
            {minutes.map(minute => <li onClick={handleMinutes} key={minute}>{minute}</li>)}
        </Col>

    const addWindow: ReactElement = 
    <Modal 
        show={editShow}
        backdrop="static"
        onHide={handleAddClose}
        size="sm"
        className="add-window"
        as="section"
    >
        <Modal.Header closeButton>
            Add new task
        </Modal.Header>
        <Modal.Body>
            <Form as="div">
                <Form.Group as="div">
                    <Form.Label as="h3">Title</Form.Label>
                    <Form.Control 
                        as="textarea"
                        placeholder="Enter the title"
                        onChange={handleTitleChange}
                        value={title}
                    />
                </Form.Group>
                <Form.Group as="div">
                    <Form.Label as="h3">Task description</Form.Label>
                    <Form.Control 
                        as="textarea"
                        placeholder="Enter the task description"
                        onChange={handleTaskChange}
                        value={task}
                    />
                </Form.Group>
                <Form.Group as="div">
                    <Form.Label as="h3">Date to do</Form.Label>
                    <Form.Control as="button" onClick={handleCalandarToggle}>
                        {getLocalDataString(dateToDo)}
                    </Form.Control>
                    <Calendar 
                        className={calendarClasses.join(' ')}
                        onChange={handleDate}
                        value={dateToDo}
                    />
                </Form.Group>
                <Form.Group as="div">
                    <Form.Label as="h3">Time to do</Form.Label>
                    <Form.Control as="button" onClick={handleTimeToggle}>
                        {getLocalTimeString(dateToDo)}
                    </Form.Control>
                    <Row className={timeClasses.join(' ')}>
                        {hoursPicker}
                        {minutesPicker}
                    </Row>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleAddTask}>
                Add
            </Button>
            <Button variant="danger" onClick={handleAddClose}>
                Cancel
            </Button>
        </Modal.Footer>
    </Modal>


    const editWindow: ReactElement = 
    <Modal 
        show={addShow}
        backdrop="static"
        onHide={handleEditClose}
        size="sm"
        className="add-window"
        as="section"
    >
        <Modal.Header closeButton>
            Add new task
        </Modal.Header>
        <Modal.Body>
            <Form as="div">
                <Form.Group as="div">
                    <Form.Label as="h3">Title</Form.Label>
                    <Form.Control 
                        as="textarea"
                        placeholder="Enter the title"
                        onChange={handleTitleChange}
                        value={title}
                    />
                </Form.Group>
                <Form.Group as="div">
                    <Form.Label as="h3">Task description</Form.Label>
                    <Form.Control 
                        as="textarea"
                        placeholder="Enter the task description"
                        onChange={handleTaskChange}
                        value={task}
                    />
                </Form.Group>
                <Form.Group as="div">
                    <Form.Label as="h3">Date to do</Form.Label>
                    <Form.Control as="button" onClick={handleCalandarToggle}>
                        {getLocalDataString(dateToDo)}
                    </Form.Control>
                    <Calendar 
                        className={calendarClasses.join(' ')}
                        onChange={handleDate}
                        value={dateToDo}
                    />
                </Form.Group>
                <Form.Group as="div">
                    <Form.Label as="h3">Time to do</Form.Label>
                    <Form.Control as="button" onClick={handleTimeToggle}>
                        {getLocalTimeString(dateToDo)}
                    </Form.Control>
                    <Row className={timeClasses.join(' ')}>
                        {hoursPicker}
                        {minutesPicker}
                    </Row>
                </Form.Group>
                <Form.Group>
                    <ButtonGroup>
                        <ToggleButton
                            checked={priority}
                            onChange={handlePriorityToggle}
                            value={1}
                            variant="warning"
                        >
                            Priority
                        </ToggleButton>
                        <ToggleButton
                            checked={complite}
                            onChange={handleCompliteToggle}
                            value={2}
                            variant="success"
                        >
                            Complite
                        </ToggleButton>
                        <ToggleButton
                            checked={cancel}
                            onChange={handleCancelToggle}
                            value={3}
                            variant="danger"
                        >
                            Cancel
                        </ToggleButton>
                        <OverlayTrigger trigger="click" placement="right" overlay={delWindow} onToggle={}>
                            <Button
                                variant="danger"
                            >
                                Delete task
                            </Button>
                        </OverlayTrigger>
                        
                    </ButtonGroup>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleAddTask}>
                Save
            </Button>
            <Button variant="secondary" onClick={handleEditClose}>
                Cancel
            </Button>
        </Modal.Footer>
    </Modal>
        
   const delWindow: ReactElement =  
       <Popover>
            <Popover.Header>Do you really want to delete this task?</Popover.Header>
            <Popover.Body>
                <Button variant="primary" onClick-{}>Yes</Button>
                <Button variant="danger">No</Button>
            </Popover.Body>
       </Popover>


    const tasks: ReactElement[] = dateList.map((date: string): ReactElement => {
        return (
            <Container as="ul" className="days-list">
                <Container as="li" className="day-item d-flex flex-column justify-content-center align-items-center">
                    <Container className="day-title-wrap">
                        <h2 className="day-title">{date.toString()}</h2>
                        <Button className="day-add-btn" type="button" onClick={handleAddOpen}>
                            <FontAwesomeIcon className="day-add-ico" icon={faPlusSquare} />
                        </Button>
                        <Container as="ul" className="tasks-list">
                            {tasksList
                                .filter(task => getLocalDataString(task.getDateToDo()) === date)
                                .map(task => {
                                    return (
                                            <Row as="li" 
                                                className="task-item d-flex align-items-center" 
                                                role="button" tabIndex={0} 
                                                id={`${task.getTaskId()}`}
                                                onClick={handleEditOpen}
                                                >
                                                <Col>
                                                    <Button className="task-complete-btn">
                                                        <FontAwesomeIcon className="day-add-ico" icon={faSquare} />
                                                    </Button>
                                                </Col>
                                                <Col className="task-title">{task.getTitle()}</Col>
                                                <Col className="task-time-wrap">
                                                    <p className="task-time">{getLocalFullDataString(task.getDateToDo())}</p>
                                                </Col>
                                            </Row>
                                    )
                                })
                            }
                        </Container>
                    </Container>
                </Container>
            </Container>
        )
    });
    
    
    return (
        <Container as="main" className="main" fluid>
            <Container as="section" className="task-list d-flex flex-column justify-content-center align-items-center" fluid="xl">
                {tasks}
                {addWindow}
                {editWindow}
            </Container>
        </Container>
    )
}
