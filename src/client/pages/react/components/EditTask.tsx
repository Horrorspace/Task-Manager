import React, {ChangeEvent, MouseEvent, ReactElement, useState} from 'react'
import {Container, Row, Col, Button, Form, Modal, Popover, OverlayTrigger} from 'react-bootstrap'
import Calendar from 'react-calendar'
import {getLocalDataString, getLocalTimeString} from '@core/functions/dateConverte'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheckSquare, faFlag as faFlagSolid, faHandPaper as faHandPaperSolid} from '@fortawesome/free-solid-svg-icons'


interface EditTaskProps {
    onHide?: () => void;
    onTitleChange?: (event?: ChangeEvent<HTMLElement>) => void;
    onTitleClick?: (event?: MouseEvent<HTMLElement>) => void;
    onTaskChange?: (event?: ChangeEvent<HTMLElement>) => void;
    onTaskClick?: (event?: MouseEvent<HTMLElement>) => void;
    onCalendarClick?: (event?: MouseEvent<HTMLElement>) => void;
    onTimeClick?: (event?: MouseEvent<HTMLElement>) => void;
    onDateChange?: (value?: Date) => void;
    onHourClick?: (event?: MouseEvent<HTMLElement>) => void;
    onMinuteClick?: (event?: MouseEvent<HTMLElement>) => void;
    onPriorityClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    onCompleteClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    onCancelClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    onSaveClick?: (event?: MouseEvent<HTMLElement>) => void;
    onCloseClick?: (event?: MouseEvent<HTMLElement>) => void;
    onDeleteClick?: (event?: MouseEvent<HTMLElement>) => void;
    onCloseDeleteClick?: () => void;
    onDeleteTask?: (event?: MouseEvent<HTMLElement>) => void;
    show?: boolean;
    isInvalidTitle?: boolean;
    isInvalidTask?: boolean;
    delWindowShow?: boolean;
    title?: string;
    task?: string;
    dateToDo?: Date;
    priority?: boolean;
    complite?: boolean;
    cancel?: boolean;
    calendarClasses?: string[];
    timeClasses?: string[];
}

const defaultProps: EditTaskProps = {
    onHide: () => {},
    onTitleChange: () => {},
    onTitleClick: () => {},
    onTaskChange: () => {},
    onTaskClick: () => {},
    onCalendarClick: () => {},
    onTimeClick: () => {},
    onDateChange: () => {},
    onHourClick: () => {},
    onMinuteClick: () => {},
    onPriorityClick: () => {},
    onCompleteClick: () => {},
    onCancelClick: () => {},
    onSaveClick: () => {},
    onCloseClick: () => {},
    onDeleteClick: () => {},
    onCloseDeleteClick: () => {},
    onDeleteTask: () => {},
    show: false,
    isInvalidTitle: false,
    isInvalidTask: false,
    delWindowShow: false,
    title: '',
    task: '',
    dateToDo: new Date(Date.now()),
    priority: false,
    complite: false,
    cancel: false,
    calendarClasses: ['hidden'],
    timeClasses: ['hidden']
}

export const EditTask: React.FC<EditTaskProps> = (
    {
        onHide,
        onTitleChange,
        onTitleClick,
        onTaskChange,
        onTaskClick,
        onCalendarClick,
        onTimeClick,
        onDateChange,
        onHourClick,
        onMinuteClick,
        onPriorityClick,
        onCompleteClick,
        onCancelClick,
        onSaveClick,
        onCloseClick,
        onDeleteClick,
        onCloseDeleteClick,
        onDeleteTask,
        show,
        isInvalidTitle,
        isInvalidTask,
        delWindowShow,
        title,
        task,
        dateToDo,
        priority,
        complite,
        cancel,
        calendarClasses,
        timeClasses
    }: EditTaskProps = defaultProps
) => {
    const titleDefClasses: string[] = [];
    const taskDefClasses: string[] = [];
    const titleClasses = isInvalidTitle ? [...titleDefClasses, "add-task-title-area__invalid"] : [...titleDefClasses, "add-task-title-area"];
    const taskClasses = isInvalidTask ? [...taskDefClasses, "add-task-text-area__invalid"] : [...taskDefClasses, "add-task-text-area"];
    const hoursList: number[] = [];
    const minutesList: number[] = [];
    for(let i = 0; i < 24; i++) {
        hoursList.push(i)
    }
    for(let i = 0; i < 60; i++) {
        minutesList.push(i)
    }

    const hoursPicker: ReactElement = 
        <Col as="ul">
            {hoursList.map(hour => <li onClick={onHourClick} key={hour}>{hour}</li>)}
        </Col>
    const minutesPicker: ReactElement = 
        <Col as="ul">
            {minutesList.map(minute => <li onClick={onMinuteClick} key={minute}>{minute}</li>)}
        </Col>

    const delWindow: ReactElement =  
        <Popover id="delWindow">
            <Container>
                Do you really want to delete this task?
            </Container>
            <Row>
                <Col>
                    <Button variant="primary" onClick={onDeleteTask}>Yes</Button>
                </Col>
                <Col>
                    <Button variant="danger" onClick={onDeleteClick}>No</Button>
                </Col>
            </Row>
        </Popover>


    return (
        <Modal 
            show={show}
            backdrop="static"
            onHide={onHide}
            size="xl"
            scrollable={true}
            dialogClassName="add-task-main"
            contentClassName="add-task-wrap"
            className="add-window"
            as="section"
        >
            <Modal.Header 
                className="add-task-header"
            >
                <h2 className="add-task-main-title">
                    Edit task
                </h2>
            </Modal.Header>
            <Modal.Body
                className="add-task-body"
            >
                <Form as="div">
                    <Form.Group as="div">
                        <Form.Label 
                            as="h3"
                            className="add-task-title"
                        >
                            Title
                        </Form.Label>
                        <Form.Control 
                            as="textarea"
                            placeholder="Enter the title"
                            onChange={onTitleChange}
                            onClick={onTitleClick}
                            className={titleClasses.join(' ')}
                            value={title}
                        />
                    </Form.Group>
                    <Form.Group as="div">
                        <Form.Label 
                            as="h3"
                            className="add-task-title"
                        >
                            Task description
                        </Form.Label>
                        <Form.Control 
                            as="textarea"
                            placeholder="Enter the task description"
                            onChange={onTaskChange}
                            onClick={onTaskClick}
                            className={taskClasses.join(' ')}
                            value={task}
                        />
                    </Form.Group>
                    <Form.Group as="div">
                        <Form.Label 
                            as="h3"
                            className="add-task-title"
                        >
                            Date to do
                        </Form.Label>
                        <Form.Control 
                            as="button" 
                            onClick={onCalendarClick}
                            className="add-task-date-btn"
                        >
                            {getLocalDataString(dateToDo!)}
                        </Form.Control>
                        <Calendar 
                            className={calendarClasses!.join(' ')}
                            onChange={onDateChange}
                            value={dateToDo}
                        />
                    </Form.Group>
                    <Form.Group as="div">
                        <Form.Label 
                            as="h3"
                            className="add-task-title"
                        >
                            Time to do
                        </Form.Label>
                        <Form.Control 
                            as="button" 
                            onClick={onTimeClick}
                            className="add-task-date-btn"
                        >
                            {getLocalTimeString(dateToDo!)}
                        </Form.Control>
                        <Row className={timeClasses!.join(' ')}>
                            {hoursPicker}
                            {minutesPicker}
                        </Row>
                    </Form.Group>
                    <Form.Group as="div">
                        <Form.Label
                            as="h3"
                            className="add-task-title"
                        >
                            Status
                        </Form.Label>
                        <Form.Control
                            as="button" 
                            onClick={onPriorityClick}
                            className="add-task-status-btn d-flex flex-row"
                        >
                            <FontAwesomeIcon className="status-priority-ico" icon={faFlagSolid} />
                            <h3 className="status-title">Priority</h3>
                            <p className="status-value">{priority ? 'Yes' : 'No'}</p>
                        </Form.Control>
                        <Form.Control
                            as="button" 
                            onClick={onCompleteClick}
                            className="add-task-status-btn d-flex flex-row"
                        >
                            <FontAwesomeIcon className="status-complete-ico" icon={faCheckSquare} />
                            <h3 className="status-title">Complete</h3>
                            <p className="status-value">{complite ? 'Yes' : 'No'}</p>
                        </Form.Control>
                        <Form.Control
                            as="button" 
                            onClick={onCancelClick}
                            className="add-task-status-btn d-flex flex-row"
                        >
                            <FontAwesomeIcon className="status-cancel-ico" icon={faHandPaperSolid} />
                            <h3 className="status-title">Cancel</h3>
                            <p className="status-value">{cancel ? 'Yes' : 'No'}</p>
                        </Form.Control>
                        <OverlayTrigger 
                            trigger="click" 
                            placement="right" 
                            overlay={delWindow} 
                            onToggle={onCloseDeleteClick} 
                            show={delWindowShow}
                        >
                                <Button
                                    variant="danger"
                                    className="add-task-status-btn d-flex flex-row"
                                >
                                    Delete task
                                </Button>
                            </OverlayTrigger>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer
                className="add-task-footer"
            >
                <Button variant="primary" onClick={onSaveClick}>
                    Save
                </Button>
                <Button variant="secondary" onClick={onCloseClick}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}