import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { Header, Search, TopBar } from '../../components/index';
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux';
import *  as actions from '../../store/actions'

const title = 'Trang chủ - Phòng trọ';

const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getCategories());
        dispatch(actions.getAcreages());
        dispatch(actions.getPrices());
    }, [])

    return (
        <div className=' bg-primary'>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <TopBar />
            <Header />
            <div className='max-w-1100 mx-auto mt-[10px] flex flex-col gap-4'>
                <Search />
                <Outlet />
            </div>
        </div>
    )
}

export default Home