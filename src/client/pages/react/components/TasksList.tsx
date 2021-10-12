import React, {ChangeEvent, MouseEvent, ReactElement, useState, useEffect} from 'react'
import {AddTask} from '@react/components/AddTask'
import {EditTask} from '@react/components/EditTask'
import {Container, Row, Col, Button, ButtonGroup} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {addTask, editTask, deleteTask, toggleCancel, toggleComplete, togglePriority} from '@redux/actions/taskActions'
import {IRootState, IAppState} from '@interfaces/IStore'
import {ITaskInstance, ITasksInstance, INewTask, ITaskToEdit} from '@interfaces/ITask'
import {IUserInstance} from '@interfaces/IUser'
import {getLocalDataString, getLocalTimeString, dateStringify} from '@core/functions/dateConverte'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlusSquare, faCheckSquare, faFlag as faFlagSolid, faHandPaper as faHandPaperSolid} from '@fortawesome/free-solid-svg-icons'
import {faSquare, faFlag, faHandPaper} from '@fortawesome/free-regular-svg-icons'



type localDate = [number, number, number]


export const TasksList: React.FC = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state: IRootState): IUserInstance => state.user.user!);
    const tasksData = useSelector((state: IRootState): ITasksInstance => state.task.tasks);
    const appState = useSelector((state: IRootState): IAppState => state.app);
    const [addShow, setAddShow] = useState(false);
    const [isInvalidTitle, setInvalidTitle] = useState(false);
    const [isInvalidTask, setInvalidTask] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [delShow, setDelShow] = useState(false);
    const [id, setId] = useState<number | null>(null);
    const [priority, setPriority] = useState(false);
    const [complite, setComplite] = useState(false);
    const [cancel, setCancel] = useState(false);
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


    const tasksList = tasksData.getAllTasks();
    const dateArr: string[] = tasksList
        .filter(task => {
            if(appState.onlyImportant) {
                return task.getPriority() === appState.onlyImportant
            }
            else {
                return true
            }
        })
        .filter(task => {
            if(appState.onlyToday) {
                return getLocalDataString(task.getDateToDo()) === getLocalDataString(new Date(Date.now()))
            }
            else {
                return true
            }
        })
        .filter(task => {
            if(appState.showCompleted) {
                return true
            }
            else {
                return !task.getComplete()
            }
        })
        .filter(task => {
            if(appState.showCancel) {
                return true
            }
            else {
                return !task.getCancel()
            }
        })
        .filter(task => {
            if(appState.showOverdue) {
                return true
            }
            else {
                const nowTime = new Date(Date.now())
                return task.getDateToDo().getTime() > nowTime.getTime()
            }
        })
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
        setInvalidTitle(false);
        setInvalidTask(false);
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

    const takeId = (target: HTMLLIElement): string | null => {
        let idStr: string | null = null;
        if(target.tagName === "LI") {
            idStr = target.id;
        }
        else {
            let newTarget: any = target;
            for(let i = 0; i < 5; i++) {
                newTarget = newTarget.parentElement
                if(newTarget && newTarget.tagName === "LI") {
                    idStr = newTarget.id
                    break;
                }
            }
        }

        return idStr
    }

    const handleAddTask = ():void => {
        if(title && task) {
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
        if(!title) {
            setInvalidTitle(true);
            setTimeout(() => {setInvalidTitle(false)}, 4000)
        }
        if(!task) {
            setInvalidTask(true);
            setTimeout(() => {setInvalidTask(false)}, 4000)
        }
    }

    const handleEditTask = (): void => {
        if(title && task) {
            if(id) {
                const oldTask: ITaskInstance = tasksData.getTaskById(id);
                const taskToEdit: ITaskToEdit = {
                    id,
                    title,
                    task,
                    dateToDo: dateStringify(dateToDo)
                }
                dispatch(editTask(taskToEdit));
                console.log(oldTask.getPriority(), priority)
                if(oldTask.getPriority() !== priority) {
                    dispatch(togglePriority(id));
                }
                if(oldTask.getComplete() !== complite) {
                    dispatch(toggleComplete(id));
                }
                if(oldTask.getCancel() !== cancel) {
                    dispatch(toggleCancel(id));
                }
            }
            setDefault();
            setEditShow(false);
            setDelShow(false);
        }
        if(!title) {
            setInvalidTitle(true);
            setTimeout(() => {setInvalidTitle(false)}, 4000)
        }
        if(!task) {
            setInvalidTask(true);
            setTimeout(() => {setInvalidTask(false)}, 4000)
        }
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
        setAddShow(false);
    }

    const handleEditClose = (): void => {
        setDefault();
        setEditShow(false);
        setDelShow(false);
    }

    const handleDelToggle = (): void => {
        setDelShow(prev => !prev);
    }

    const handleTitleChange = (event?: ChangeEvent<HTMLElement>) => {
        if(event) {
            setInvalidTitle(false);
            const target = event.target as HTMLTextAreaElement;
            const value = target.value;
            setTitle(value);
        }
    }

    const handleTitleClick = () => {
        setInvalidTitle(false);
    }

    const handleTaskChange = (event?: ChangeEvent<HTMLElement>) => {
        if(event) {
            const target = event.target as HTMLTextAreaElement;
            const value = target.value;
            setTask(value);
        }
    }

    const handleTaskClick = () => {
        setInvalidTask(false);
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

    const handleAddOpen = (event: MouseEvent<HTMLButtonElement>): void => {
        setAddShow(true)
    }

    const handleEditOpen = (event: MouseEvent<HTMLLIElement>): void => {
        const target =  event.target as HTMLLIElement;
        const idStr: string | null = takeId(target);

        if(idStr) {
            const id: number | null = idStr.length > 0 ? parseInt(idStr, 10) : null;
            if(id) {
                setId(id);
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
    }

    const handlePriorityChange = (event: MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation();
        const target =  event.target as HTMLLIElement;
        const idStr: string | null = takeId(target);

        if(idStr) {
            const id: number | null = idStr.length > 0 ? parseInt(idStr, 10) : null;
            if(id) {
                dispatch(togglePriority(id));
            }
        }

        setPriority(prev => !prev)
    }

    const handleCompleteChange = (event: MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation();
        const target =  event.target as HTMLLIElement;
        const idStr: string | null = takeId(target);

        if(idStr) {
            const id: number | null = idStr.length > 0 ? parseInt(idStr, 10) : null;
            if(id) {
                dispatch(toggleComplete(id));
            }
        }

        setPriority(prev => !prev)
    }

    const handleCancelChange = (event: MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation();
        const target =  event.target as HTMLLIElement;
        const idStr: string | null = takeId(target);

        if(idStr) {
            const id: number | null = idStr.length > 0 ? parseInt(idStr, 10) : null;
            if(id) {
                dispatch(toggleCancel(id));
            }
        }

        setPriority(prev => !prev)
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
                                .filter(task => {
                                    if(appState.onlyImportant) {
                                        return task.getPriority() === appState.onlyImportant
                                    }
                                    else {
                                        return true
                                    }
                                })
                                .filter(task => {
                                    if(appState.onlyToday) {
                                        return getLocalDataString(task.getDateToDo()) === getLocalDataString(new Date(Date.now()))
                                    }
                                    else {
                                        return true
                                    }
                                })
                                .filter(task => {
                                    if(appState.showCompleted) {
                                        return true
                                    }
                                    else {
                                        return !task.getComplete()
                                    }
                                })
                                .filter(task => {
                                    if(appState.showCancel) {
                                        return true
                                    }
                                    else {
                                        return !task.getCancel()
                                    }
                                })
                                .filter(task => {
                                    if(appState.showOverdue) {
                                        return true
                                    }
                                    else {
                                        const nowTime = new Date(Date.now())
                                        return task.getDateToDo().getTime() > nowTime.getTime()
                                    }
                                })
                                .filter(task => getLocalDataString(task.getDateToDo()) === date)
                                .sort((task1, task2) => {
                                    if(task1.getDateToDo().getTime() !== task2.getDateToDo().getTime()) {
                                        return task1.getDateToDo().getTime() - task2.getDateToDo().getTime()
                                    }
                                    else {
                                        return task1.getDateCreated().getTime() - task2.getDateCreated().getTime()
                                    }
                                })
                                .map(task => {
                                    return (
                                            <Row as="li" 
                                                className="task-item d-flex align-items-center" 
                                                role="button" tabIndex={0} 
                                                id={`${task.getTaskId()}`}
                                                onClick={handleEditOpen}
                                                >
                                                <Col
                                                    xs={4} 
                                                    className="task-complete-btn-wrap"
                                                >
                                                    <ButtonGroup>
                                                        <Button 
                                                            className="task-priority-btn" 
                                                            variant="warning"
                                                            onClick={handlePriorityChange}                                                    
                                                        >
                                                            <FontAwesomeIcon 
                                                                className="task-priority-ico" 
                                                                icon={task.getPriority() ? faFlagSolid : faFlag} 
                                                            />
                                                        </Button>
                                                        <Button 
                                                            className="task-complete-btn" 
                                                            variant="success"
                                                            onClick={handleCompleteChange}                                                    
                                                        >
                                                            <FontAwesomeIcon 
                                                                className="task-complete-ico" 
                                                                icon={task.getComplete() ? faCheckSquare : faSquare} 
                                                            />
                                                        </Button>
                                                        <Button 
                                                            className="task-cancel-btn" 
                                                            variant="light"
                                                            onClick={handleCancelChange}                                                    
                                                        >
                                                            <FontAwesomeIcon 
                                                                className="task-cancel-ico" 
                                                                icon={task.getCancel() ? faHandPaperSolid : faHandPaper} 
                                                            />
                                                        </Button>
                                                    </ButtonGroup>
                                                </Col>
                                                <Col as="h4" className="task-title text-center">{task.getTitle()}</Col>
                                                <Col 
                                                    xs={4}
                                                    className="task-time-wrap"
                                                >
                                                    <p className="task-time">{getLocalTimeString(task.getDateToDo())}</p>
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
            <AddTask
                onHide={handleAddClose}
                onTitleChange={handleTitleChange}
                onTitleClick={handleTitleClick}
                onTaskChange={handleTaskChange}
                onTaskClick={handleTaskClick}
                onCalendarClick={handleCalendarToggle}
                onTimeClick={handleTimeToggle}
                onDateChange={handleDate}
                onHourClick={handleHour}
                onMinuteClick={handleMinutes}
                onAddClick={handleAddTask}
                onCloseClick={handleAddClose}
                show={addShow}
                isInvalidTitle={isInvalidTitle}
                isInvalidTask={isInvalidTask}
                title={title}
                task={task}
                dateToDo={dateToDo}
                calendarClasses={calendarClasses}
                timeClasses={timeClasses}
            />
            <EditTask
                onHide={handleEditClose}
                onTitleChange={handleTitleChange}
                onTitleClick={handleTitleClick}
                onTaskChange={handleTaskChange}
                onTaskClick={handleTaskClick}
                onCalendarClick={handleCalendarToggle}
                onTimeClick={handleTimeToggle}
                onDateChange={handleDate}
                onHourClick={handleHour}
                onMinuteClick={handleMinutes}
                onPriorityClick={handlePriorityToggle}
                onCompleteClick={handleCompliteToggle}
                onCancelClick={handleCancelToggle}
                onSaveClick={handleEditTask}
                onCloseClick={handleEditClose}
                onDeleteClick={handleDelToggle}
                onCloseDeleteClick={handleDelToggle}
                onDeleteTask={handleDelTask}
                show={editShow}
                isInvalidTitle={isInvalidTitle}
                isInvalidTask={isInvalidTask}
                delWindowShow={delShow}
                title={title}
                task={task}
                dateToDo={dateToDo}
                priority={priority}
                complite={complite}
                cancel={cancel}
                calendarClasses={calendarClasses}
                timeClasses={timeClasses}
            />
        </Container>
    )
}
