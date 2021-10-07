import React, {useState, ReactElement, MouseEvent, ChangeEvent} from 'react'
import {Container, Row, Col, Button, Form, Modal} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {IRootState, IAppState} from '@interfaces/IStore'
import {ITaskInstance, ITasksInstance, INewTask, ITaskToEdit} from '@interfaces/ITask'
import {IUserInstance} from '@interfaces/IUser'
import {toLogout} from '@redux/actions/userActions'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import { faMobileAlt, faKey, faGlobeEurope, faVolumeUp, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope, faBell } from '@fortawesome/free-regular-svg-icons'
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons'


interface ISetting {
    ico: IconDefinition;
    title: string;
    value: string | boolean;
    group: string;
    handler: (event: MouseEvent<HTMLButtonElement>) => void;
}


export const Settings: React.FC = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state: IRootState): IUserInstance => state.user.user!);
    const groups: string[] = ['Account', 'Personal', 'Authorization'];
    const languageList: string[] = ['English', 'Russian'];
    const booleanList: string[] = ['Yes', 'No']

    const [emailShow, setEmailShow] = useState(false);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [telegram, setTelegram] = useState('');
    const [language, setLanguage] = useState(languageList[0]);
    const [notification, setNotification] = useState(true);
    const [sound, setSound] = useState(true);
    const [logoutShow, setLogoutShow] = useState(false);

    const setDefault = () => {
        
    }

    const handleEmailOpen = (event: MouseEvent<HTMLElement>): void => {

    }
    const handleEmailClose = (event: MouseEvent<HTMLElement>): void => {

    }
    const handleEmailChange = (event: ChangeEvent<HTMLElement>): void => {

    }
    const handlePasswordChange = (event: ChangeEvent<HTMLElement>): void => {

    }
    const handleEmailSave = (event: MouseEvent<HTMLElement>): void => {

    }

    const handlePhoneClick = (event: MouseEvent<HTMLButtonElement>): void => {

    }
    const handleNameClick = (event: MouseEvent<HTMLButtonElement>): void => {

    }
    const handleTelegramClick = (event: MouseEvent<HTMLButtonElement>): void => {

    }
    const handlePasswordClick = (event: MouseEvent<HTMLButtonElement>): void => {

    }
    const handleLogOutClick = (event: MouseEvent<HTMLButtonElement>): void => {
        setLogoutShow(true)
    }
    const handleCloseLogout = (event: MouseEvent<HTMLButtonElement>): void => {
        setLogoutShow(false)
    }
    const handleLogout = (event: MouseEvent<HTMLButtonElement>): void => {
        dispatch(toLogout())
    }
    const handleLanguageClick = (event: MouseEvent<HTMLButtonElement>): void => {
        setLanguage(prev => {
            const i = languageList.indexOf(prev);
            const l = languageList.length;
            if(i+1 === l) {
                return languageList[0]
            }
            else {
                return languageList[i+1]
            }
        })
    }
    const handleNotificationClick = (event: MouseEvent<HTMLButtonElement>): void => {
        setNotification(prev => !prev)
    }
    const handleSoundClick = (event: MouseEvent<HTMLButtonElement>): void => {
        setSound(prev => !prev)
    }
    

    const staticSettings: ISetting[] = [
        {
            ico: faEnvelope,
            title: 'Email',
            group: 'Account',
            value: userData.getUserEmail(),
            handler: handleEmailOpen
        },
        {
            ico: faMobileAlt,
            title: 'Phone',
            group: 'Account',
            value: phone,
            handler: handlePhoneClick
        },
        {
            ico: faUser,
            title: 'Name',
            group: 'Account',
            value: userData.getUserName(),
            handler: handleNameClick
        },
        {
            ico: faTelegramPlane,
            title: 'Telegram',
            group: 'Account',
            value: telegram,
            handler: handleTelegramClick
        },
        {
            ico: faKey,
            title: 'Password',
            group: 'Account',
            value: '*********',
            handler: handlePasswordClick
        },
        {
            ico: faGlobeEurope,
            title: 'Language',
            group: 'Personal',
            value: language,
            handler: handleLanguageClick
        },
        {
            ico: faVolumeUp,
            title: 'Sound',
            group: 'Personal',
            value: notification ? booleanList[0] : booleanList[1],
            handler: handleNotificationClick
        },
        {
            ico: faBell,
            title: 'Notifications',
            group: 'Personal',
            value: sound ? booleanList[0] : booleanList[1],
            handler: handleSoundClick
        },
        {
            ico: faSignOutAlt,
            title: 'Log out',
            group: 'Authorization',
            value: '',
            handler: handleLogOutClick
        }
    ];

    const emailUp: ReactElement =
        <Modal 
            show={emailShow}
            backdrop={true}
            onHide={handleEmailClose}
            className=""
            dialogClassName="add-task-main"
            contentClassName="add-task-wrap"
            scrollable={true}
            size="xl"
            as="div"
        >
            <Modal.Header 
                className="add-task-header"
            >
                <h2 className="add-task-main-title">
                    Change Email
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
                            new Email
                        </Form.Label>
                        <Form.Control 
                            as="textarea"
                            placeholder="Task name"
                            onChange={handleEmailChange}
                            value={email}
                            className="add-task-title-area"
                        />
                    </Form.Group>
                    <Form.Group as="div">
                        <Form.Label 
                            as="h3"
                            className="add-task-title"
                        >
                            Password
                        </Form.Label>
                        <Form.Control 
                            as="textarea"
                            placeholder="Task Note"
                            onChange={handlePasswordChange}
                            value={password}
                            className="add-task-text-area"
                            type="password"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer
                className="add-task-footer"
            >
                <Button variant="primary" onClick={handleEmailSave}>
                    Save
                </Button>
                <Button variant="danger" onClick={handleEmailClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>

    const logoutModal: ReactElement =
            <Modal show={logoutShow} onHide={handleCloseLogout}>
                <Modal.Header>
                    <Modal.Title>
                        Log out
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you want log out?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleLogout}>
                        Yes
                    </Button>
                    <Button variant="secondary" onClick={handleCloseLogout}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>


    const SettingsList: ReactElement[][] = groups.map((group: string): ReactElement[] => {
        return staticSettings
                .filter((setting: ISetting): boolean => setting.group === group)
                .map((setting: ISetting): ReactElement => {
                    return (
                        <Row as="li" className="setting-item">
                            <Col as="button" className="setting-btn d-flex align-items-center btn btn-light" sm="10" onClick={setting.handler}>
                                <FontAwesomeIcon className="setting-ico" icon={setting.ico} />
                                <h3 className="setting-title">{setting.title}</h3>
                                <p className="setting-value">{setting.value}</p>
                            </Col>
                        </Row>
                    )
                })
    });

    const Settings: ReactElement[] = SettingsList.map((List: ReactElement[], i: number): ReactElement => {
            return (
                <Container className="settings-group" fluid>
                    <h2 className="settings-title">{`${groups[i]}`}</h2>
                    <Container as="ul" className="settings-list d-flex flex-column justify-content-center" fluid>
                        {List}
                    </Container>
                </Container>
            )
    })


    return (
        <Container as="main" className="main" fluid>
            <Container as="section" className="settings d-flex flex-column justify-content-center align-items-center" fluid="xl">
                {Settings}
                {logoutModal}
            </Container>
        </Container>
    )
}
