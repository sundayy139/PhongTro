import React from 'react'
import { Outlet } from 'react-router-dom';
import { Header, TopBar } from '../../components/index';

const Home = () => {
    return (
        <div className='w-full border border-red-300 mx-auto bg-primary h-screen'>
            <TopBar />
            <Header />
            <div className='w-1100 mx-auto flex flex-col items-center justify-center'>
                <Outlet />
            </div>
        </div>
    )
}

export default Home