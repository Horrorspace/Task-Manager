import React from 'react'
import {BrowserRouter, useLocation} from 'react-router-dom'
import {useHeader} from '@react/hooks/useHeader'
import {useSelector} from 'react-redux'
import {IRootState} from '@interfaces/IStore'
import {MainHeader} from '@react/components/MainHeader'

export const Header: React.FC = () => {
    const routeName = useLocation().pathname;
    const currentHeader = useHeader(routeName);

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