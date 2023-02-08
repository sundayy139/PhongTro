import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { Contact, Header, Intro, Search, TopBar } from '../../components/Public/index';
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux';
import *  as actions from '../../store/actions'

const title = 'Trang chủ - Phòng trọ';

const Home = () => {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(actions.getCategories());
        dispatch(actions.getAcreages());
        dispatch(actions.getPrices());
        dispatch(actions.getProvinces());
    }, [])

    useEffect(() => {
        setTimeout(() => {
            isLoggedIn && dispatch(actions.getCurrentUser())
        }, [1000])
    }, [isLoggedIn])


    return (
        <div className=' bg-primary'>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <TopBar />
            <Header />
            <div className='max-w-1100 mx-auto mt-[10px] flex flex-col gap-5'>
                <Search />
                <Outlet />
            </div>
            <div className='max-w-1100 mx-auto mt-[10px] flex flex-col gap-5'>
                <Intro />
                <Contact />
            </div>
        </div>
    )
}

export default Home