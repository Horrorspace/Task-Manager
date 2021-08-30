import React, {useState, ReactElement, MouseEvent} from 'react'
import {Container, Row, Col, Button, Dropdown} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import { faMobileAlt, faKey, faGlobeEurope, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope, faBell } from '@fortawesome/free-regular-svg-icons'
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons'

interface ISetting {
    ico: IconDefinition;
    title: string;
    value: string;
    values: string[];
    group: string;
}

export const Settings: React.FC = () => {
    const groups: string[] = ['Account', 'Personal'];
    const settingsDataDefault: ISetting[] = [
        {
            ico: faEnvelope,
            title: 'Email',
            value: 'admin@test.test',
            values: ['admin@test.test'],
            group: 'Account'
        },
        {
            ico: faMobileAlt,
            title: 'Phone',
            value: '+79999999999',
            values: ['+79999999999'],
            group: 'Account'
        },
        {
            ico: faTelegramPlane,
            title: 'Telegram',
            value: 'Black Jesus',
            values: ['Black Jesus'],
            group: 'Account'
        },
        {
            ico: faKey,
            title: 'Password',
            value: '******',
            values: ['******'],
            group: 'Account'
        },
        {
            ico: faGlobeEurope,
            title: 'Language',
            value: 'English',
            values: ['English', 'Russian'],
            group: 'Personal'
        },
        {
            ico: faVolumeUp,
            title: 'Sound',
            value: 'No',
            values: ['No', 'Yes'],
            group: 'Personal'
        },
        {
            ico: faBell,
            title: 'Notifications',
            value: 'No',
            values: ['No','Yes'],
            group: 'Personal'
        },
    ];
    const [settingsState, setSettings] = useState(settingsDataDefault);

    const handleSettingClick = (event: MouseEvent<HTMLButtonElement>): void => {
        setSettings (prevSet => {
            const target = event.target as HTMLButtonElement;
            const titleEl = target.children[1] as HTMLTitleElement;
            const valueEl = target.children[2] as HTMLParagraphElement;
            const setting: ISetting = prevSet.filter(element => element.title === titleEl.innerText)[0];
            const values: string[] = setting.values;
            const valLen: number = setting.values.length;
            
            if(valLen > 1) {
                const ind: number = values.indexOf(valueEl.innerText);
                const newVal: string = ind !== valLen + 1 ? values[ind + 1] : values[0];
                const newSetting: ISetting = {...setting, value: newVal};
                const setInd: number = prevSet.indexOf(setting);
                const newState: ISetting[] = [...prevSet.slice(0, setInd), newSetting, ...prevSet.slice(setInd + 1)];
                return newState;
            }
            else {
                return prevSet;
            }
        })
    };

    const SettingsList: ReactElement[][] = groups.map((group: string): ReactElement[] => {
        return settingsState
                .filter((setting: ISetting): boolean => setting.group === group)
                .map((setting: ISetting): ReactElement => {
                    return (
                        <Row as="li" className="setting-item">
                            <Col as="button" className="setting-btn d-flex align-items-center btn btn-light" sm="10" onClick={handleSettingClick}>
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
            </Container>
        </Container>
    )
}
