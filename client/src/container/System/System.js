import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { Header, Sidebar } from '../../components/System/index'
import *  as actions from '../../store/actions'

const System = () => {
    const title = 'Quản lý - Phòng trọ';

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getCategories());
        dispatch(actions.getAcreages());
        dispatch(actions.getPrices());
        dispatch(actions.getProvinces());
    }, [])


    return (
        <div className=' bg-primary min-h-screen'>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Header />
            <div className='w-full flex'>
                <div className='w-[256px] h-screen flex-none'>
                    <Sidebar />
                </div>
                <div className='flex-auto bg-white'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default System