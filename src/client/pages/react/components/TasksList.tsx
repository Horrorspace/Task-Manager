import React, {ChangeEvent, MouseEvent, ReactElement, useState} from 'react'
import {Container, Row, Col, Button, Form} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {IRootState} from '@interfaces/IStore'
import {ITaskInstance, ITasksInstance} from '@interfaces/ITask'
import {downloadAllTasks} from '@redux/actions/taskActions'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons'
import {faSquare} from '@fortawesome/free-regular-svg-icons'
import { StringifyOptions } from 'querystring'



export const TasksList: React.FC = () => {
    const dispatch = useDispatch();
    const tasksData = useSelector((state: IRootState): ITasksInstance => state.task.tasks);
    const tasksList = tasksData.getAllTasks();
    const dateArr = tasksList.map(task => task.getDateToDo())
    const dateRawList: Date[] = []

    dateArr.forEach(date => {
        if(dateRawList.indexOf(date) === -1) {
            dateRawList.push(date)
        }
    })

    const dateList = dateRawList
        .sort((a, b) => a.getTime() - b.getTime())
        .map(date => date.toDateString());

    console.log(dateArr, dateRawList, dateList);


    const tasks: ReactElement[] = dateList.map((date: string): ReactElement => {
        return (
            <Container as="ul" className="days-list">
                <Container as="li" className="day-item">
                    <Container className="day-title-wrap">
                        <h2 className="day-title">{date.toString()}</h2>
                        <Button className="day-add-btn" type="button">
                            <FontAwesomeIcon className="day-add-ico" icon={faPlusSquare} />
                        </Button>
                        <Container as="ul" className="tasks-list">
                        {tasksList
                            .filter(task => task.getDateToDo().toDateString() === date)
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
                                                <p className="task-time">{task.getDateToDo().toLocaleTimeString()}</p>
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
            </Container>
        </Container>
    )
}