import React from 'react'
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom'
import { HeaderSys, Sidebar } from '../../components/System/index'
import { TopBar } from '../../components/Public/index'
import { Contact } from '../../components/System/index'

const System = () => {
    const title = 'Quản lý - Phòng trọ';

    return (
        <div className='w-screen h-screen bg-primary overflow-hidden relative '>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div className='phone:block tablet:block pc:hidden laptop:hidden'>
                <TopBar />
            </div>
            <div className='pc:block laptop:block phone:hidden tablet:hidden'>
                <HeaderSys />
            </div>
            <div className='w-full h-full flex phone:mt-[50px] tablet:mt-[50px]'>
                <div className='w-[256px] h-full flex-none phone:hidden tablet:hidden'>
                    <Sidebar />
                </div>
                <div className='flex-auto pc:bg-white laptop:bg-white phone:bg-[#f1f1f1] tablet:bg-[#f1f1f1] h-[calc(100%-56px)] overflow-y-auto'>
                    <Outlet />
                    <div className='w-full pc:px-8 mb-[50px] mt-[100px] laptop:px-8 '>
                        <Contact />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default System