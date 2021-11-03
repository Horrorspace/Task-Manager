import React from 'react'
import {useFooter} from '@react/hooks/useFooter'


export const Footer: React.FC = () => {
    const currentFooter: React.ReactElement = useFooter();
    return (
        <>
            {currentFooter}
        </>
    )
}