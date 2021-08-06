import React, {useState} from 'react'
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
    group: string;
}

export const Settings: React.FC = () => {
    const groups: string[] = ['Account', 'Personal'];
    const settingsDataDefault: ISetting[] = [
        {
            ico: faEnvelope,
            title: 'Email',
            value: 'admin@test.test',
            group: 'Account'
        },
        {
            ico: faMobileAlt,
            title: 'Phone',
            value: '+79999999999',
            group: 'Account'
        },
        {
            ico: faTelegramPlane,
            title: 'Telegram',
            value: 'Black Jesus',
            group: 'Account'
        },
        {
            ico: faKey,
            title: 'Password',
            value: '******',
            group: 'Account'
        },
        {
            ico: faGlobeEurope,
            title: 'Language',
            value: 'English',
            group: 'Personal'
        },
        {
            ico: faVolumeUp,
            title: 'Sound',
            value: 'No',
            group: 'Personal'
        },
        {
            ico: faBell,
            title: 'Notifications',
            value: 'No',
            group: 'Personal'
        },
    ];
    const [settingsState, setSettings] = useState(settingsDataDefault);

    const SettingsList: React.ReactElement[][] = groups.map((group: string): React.ReactElement[] => {
        return settingsState
                .filter((setting: ISetting): boolean => setting.group === group)
                .map((setting: ISetting): React.ReactElement => {
                    return (
                        <Row as="li" className="setting-item">
                            <Col as="button" className="setting-btn d-flex align-items-center btn btn-light" sm="10">
                                <FontAwesomeIcon className="setting-ico" icon={setting.ico} />
                                <h3 className="setting-title">{setting.title}</h3>
                                <p className="setting-value">{setting.value}</p>
                            </Col>
                        </Row>
                    )
                })
    });

    const Settings: React.ReactElement[] = SettingsList.map((List: React.ReactElement[], i: number): React.ReactElement => {
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
