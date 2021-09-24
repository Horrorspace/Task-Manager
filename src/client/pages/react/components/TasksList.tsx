import React, {ChangeEvent, MouseEvent, ReactElement, useState} from 'react'
import {Container, Row, Col, Button, Form, Modal} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {IRootState} from '@interfaces/IStore'
import {ITaskInstance, ITasksInstance} from '@interfaces/ITask'
import {getLocalDataString, getLocalFullDataString} from '@core/functions/dateConverte'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons'
import {faSquare} from '@fortawesome/free-regular-svg-icons'


type localDate = [number, number, number]


export const TasksList: React.FC = () => {
    const dispatch = useDispatch();
    const tasksData = useSelector((state: IRootState): ITasksInstance => state.task.tasks);
    const [addShow, setAddShow] = useState(false);
    const [title, setTitle] = useState('');
    const [task, setTask] = useState('');
    const [dateToDo, setDateToDo] = useState(new Date);

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

    const handleAddClose = ():void => {
        setAddShow(false)
    }

    const handleAddOpen = (): void => {
        setAddShow(true)
    }


    const addWindow: ReactElement = 
    <Modal 
        show={addShow}
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
                    <Form.Label as="p">Title</Form.Label>
                    <Form.Control 
                        as="textarea"
                        placeholder="Enter the title"
                    />
                </Form.Group>
                <Form.Group as="div">
                    <Form.Label as="p">Task description</Form.Label>
                    <Form.Control 
                        as="textarea"
                        placeholder="Enter the task description"
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary">
                Add
            </Button>
            <Button variant="danger">
                Cancel
            </Button>
        </Modal.Footer>
    </Modal>


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
                            .map(task => {
                                console.log(getLocalDataString(task.getDateToDo()));
                                console.log(date);
                                return task
                            })
                            .filter(task => getLocalDataString(task.getDateToDo()) === date)
                            .map(task => {
                                return (
                                        <Row as="li" className="task-item d-flex align-items-center" role="button" tabIndex={0}>
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
            </Container>
        </Container>
    )
}