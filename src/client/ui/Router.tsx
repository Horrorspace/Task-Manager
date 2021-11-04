import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {useRoutes} from '@react/hooks/useRoutes'
import {IRootState} from '@interfaces/IStore'
import {useSelector, useDispatch} from 'react-redux'
import {Footer} from '@react/components/Footer'
import {Header} from '@react/components/Header'
import {getCurrentUser} from '@redux/actions/userActions'
import {downloadAllTasks} from '@redux/actions/taskActions'



export const Router: React.FC = () => {
    const dispatch = useDispatch();
    // dispatch(getCurrentUser());
    const isLogined = useSelector((state: IRootState): boolean => state.user.isLogined);
    const routes: React.ReactElement = useRoutes(isLogined);
    if(isLogined) {
        dispatch(downloadAllTasks());
    }


    return (
        <BrowserRouter>
            <Header />
            {routes}
            <Footer />
        </BrowserRouter>
    )
}