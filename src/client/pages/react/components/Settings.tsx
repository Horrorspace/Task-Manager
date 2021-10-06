import React, {useState, ReactElement, MouseEvent} from 'react'
import {Container, Row, Col, Button, Dropdown, Modal} from 'react-bootstrap'
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

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [telegram, setTelegram] = useState('');
    const [language, setLanguage] = useState(languageList[0]);
    const [notification, setNotification] = useState(true);
    const [sound, setSound] = useState(true);
    const [logoutShow, setLogoutShow] = useState(false);

    const handleEmailClick = (event: MouseEvent<HTMLButtonElement>): void => {
        
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
            handler: handleEmailClick
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
