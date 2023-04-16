import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import { Contact, Header, Intro, ScrollToTop, Search, TopBar } from '../../components/Public/index';
import { Helmet } from 'react-helmet'
import { path } from '../../utils/path'

const title = 'Trang chủ - Phòng trọ';

const Home = () => {
    const location = useLocation()

    return (
        <div className=' bg-primary relative overflow-y-auto' >
            <ScrollToTop />
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <TopBar />
            <Header />
            <div className='pc:max-w-1100 laptop:max-w-1100 mx-auto pc:mt-[10px] laptop:mt-[10px] flex flex-col gap-5 phone:mt-[50px] tablet:mt-[50px] phone:bg-white tablet:bg-white'>
                {
                    location?.pathname !== `/${path.LIEN_HE}` && location?.pathname !== `/${path.BLOG}` && `/${location?.pathname.split('/')[1]}/${location?.pathname.split('/')[2]}` !== '/blog/chi-tiet' && `/${location?.pathname.split('/')[1]}` !== '/chi-tiet' && location?.pathname !== `/${path.LOGIN}` && location?.pathname !== `/${path.REGISTER}` && location?.pathname !== `/${path.FORGOT_PASSWORD}` && `/${location?.pathname.split('/')[1]}` !== '/reset-password' && (
                        <Search />
                    )
                }
                <Outlet />
            </div>
            <div className='max-w-1100 mx-auto pc:mt-[10px] laptop:mt-[10px] phone:mt-[5px] tablet:mt-[5px] flex flex-col gap-5 pb-10'>
                <Intro />
                <Contact />
            </div>
        </div>
    )
}

export default Home