import React from 'react'
import {Alert} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import {IRootState} from '@interfaces/IStore'


export const Messages: React.FC = () => {
    const messagesList = useSelector((state: IRootState): string[] => state.app.messages);
    
    const messages = messagesList.map(message => {
        if(message) {
            return (
                <Alert variant="danger">
                    {message}
                </Alert>
            )
        }
        else {
            return (
                <>
                </>
            )
        }
    })

    return (
        <>
            {messages}
        </>
    )
}