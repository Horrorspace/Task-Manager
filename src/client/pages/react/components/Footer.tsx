import React from 'react'
import {BrowserRouter, useLocation} from 'react-router-dom'
import {useFooter} from '@react/hooks/useFooter'


export const Footer: React.FC = () => {
    const routeName = useLocation().pathname;
    const currentFooter = useFooter(routeName);

    return (
        <>
            {currentFooter}
        </>
    )
}