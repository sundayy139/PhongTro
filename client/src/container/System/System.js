import React from 'react'
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom'
import { Header, Sidebar } from '../../components/System/index'
import { Contact } from '../../components/System/index'

const System = () => {
    const title = 'Quản lý - Phòng trọ';

    return (
        <div className='w-screen h-screen bg-primary overflow-hidden relative '>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Header />
            <div className='w-full h-full flex'>
                <div className='w-[256px] h-full flex-none'>
                    <Sidebar />
                </div>
                <div className='flex-auto bg-white h-[calc(100%-56px)] overflow-y-auto'>
                    <Outlet />
                    <div className='w-full px-8 mb-[50px] mt-[100px]'>
                        <Contact />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default System