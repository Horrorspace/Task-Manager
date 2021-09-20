import React from 'react'
import {BrowserRouter, useLocation} from 'react-router-dom'
import {useHeader} from '@react/hooks/useHeader'
import {MainHeader} from '@react/components/MainHeader'

export const Header: React.FC = () => {
    const routeName = useLocation().pathname;
    const currentHeader = useHeader(routeName);

    return (
        <>
            {currentHeader}
        </>
    )
}