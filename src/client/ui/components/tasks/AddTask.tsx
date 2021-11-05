import React, {ChangeEvent, MouseEvent, ReactElement, useState} from 'react'
import {Row, Col, Button, Form, Modal, FormControl} from 'react-bootstrap'
import Calendar from 'react-calendar'
import {getLocalDataString, getLocalTimeString} from '@utilities/functions/dateConverte'


interface AddTaskProps {
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
    onAddClick?: (event?: MouseEvent<HTMLElement>) => void;
    onCloseClick?: (event?: MouseEvent<HTMLElement>) => void;
    show?: boolean;
    isInvalidTitle?: boolean;
    isInvalidTask?: boolean;
    title?: string;
    task?: string;
    dateToDo?: Date;
    calendarClasses?: string[];
    timeClasses?: string[];
}

const defaultProps: AddTaskProps = {
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
    onAddClick: () => {},
    onCloseClick: () => {},
    show: false,
    isInvalidTitle: false,
    isInvalidTask: false,
    title: '',
    task: '',
    dateToDo: new Date(Date.now()),
    calendarClasses: ['hidden'],
    timeClasses: ['hidden']
}

export const AddTask: React.FC<AddTaskProps> = (
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
        onAddClick,
        onCloseClick,
        show,
        isInvalidTitle,
        isInvalidTask,
        title,
        task,
        dateToDo,
        calendarClasses,
        timeClasses
    }: AddTaskProps = defaultProps
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
    
    
    return (
        <Modal 
            show={show}
            backdrop={true}
            onHide={onHide}
            className=""
            dialogClassName="add-task-main"
            contentClassName="add-task-wrap"
            scrollable={true}
            size="xl"
            as="section"
        >
            <Modal.Header 
                className="add-task-header"
            >
                <h2 className="add-task-main-title">
                    Create New Task
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
                            placeholder="Task name"
                            onClick={onTitleClick}
                            onChange={onTitleChange}
                            value={title}
                            className={titleClasses.join(' ')}
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
                            placeholder="Task Note"
                            onClick={onTaskClick}
                            onChange={onTaskChange}
                            value={task}
                            className={taskClasses.join(' ')}
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
                </Form>
            </Modal.Body>
            <Modal.Footer
                className="add-task-footer"
            >
                <Button variant="primary" onClick={onAddClick}>
                    Add
                </Button>
                <Button variant="danger" onClick={onCloseClick}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}