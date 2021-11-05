import React from 'react'
import {Alert} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import {IRootState} from '@interfaces/IStore'


export const Errors: React.FC = () => {
    const errorsList = useSelector((state: IRootState): string[] => state.app.errors);
    
    const errors = errorsList.map(error => {
        if(error) {
            return (
                <Alert variant="danger">
                    {error}
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
            {errors}
        </>
    )
}