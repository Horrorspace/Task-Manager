import React from 'react'
import {useHeader} from '@react/hooks/useHeader'
import {useSelector} from 'react-redux'
import {IRootState} from '@interfaces/IStore'


export const Header: React.FC = () => {
    const currentHeader: React.ReactElement = useHeader();
    const isUpdating = useSelector((state: IRootState): boolean => state.app.isDataUpdating);
    const app = document.getElementById('root');
    if(isUpdating) {
        app!.style.cursor = "wait"
    }
    else {
        app!.style.cursor = "default"
    }

    return (
        <>
            {currentHeader}
        </>
    )
}