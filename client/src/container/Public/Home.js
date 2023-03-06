import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import { Contact, Header, Intro, ScrollToTop, Search, TopBar } from '../../components/Public/index';
import { Helmet } from 'react-helmet'
import { path } from '../../utils/path'

const title = 'Trang chủ - Phòng trọ';

const Home = () => {
    const location = useLocation()

    return (
        <div className=' bg-primary'>
            <ScrollToTop />
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <TopBar />
            <Header />
            <div className='max-w-1100 mx-auto mt-[10px] flex flex-col gap-5'>
                {
                    location?.pathname !== `/${path.LIEN_HE}` && location?.pathname !== `/${path.BLOG}` && `/${location?.pathname.split('/')[1]}/${location?.pathname.split('/')[2]}` !== '/blog/chi-tiet' && (
                        <Search />
                    )
                }
                <Outlet />
            </div>
            <div className='max-w-1100 mx-auto mt-[10px] flex flex-col gap-5 pb-10'>
                <Intro />
                <Contact />
            </div>
        </div>
    )
}

export default Home