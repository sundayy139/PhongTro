import React from 'react'
import { useLocation } from 'react-router-dom'
import { ListPost, Pagination, Sidebar } from '../../components/Public/index'
import logo from '../../assets/image/homestay.png';
import { Helmet } from 'react-helmet'

const title = 'Tìm kiếm - Phòng trọ';

const SearchDetail = () => {
    const location = useLocation()
    return (
        <div className='w-full flex flex-col gap-4'>
            <Helmet>
                <title>{title}</title>
                <link rel="icon" href={logo} />
            </Helmet>
            <div className='mb-10'>
                <h1 className='text-[28px] font-bold'>{`Kết quả tìm kiếm: ${location.state?.titleSearch}`} </h1>
                <p className='text-sm text-gray-700'>Cho thuê phòng trọ - Kênh thông tin số 1 về phòng trọ giá rẻ, phòng trọ sinh viên, phòng trọ cao cấp mới nhất năm 2023. Tất cả nhà trọ cho thuê giá tốt nhất tại Việt Nam.</p>
            </div>
            <div className=' w-full flex gap-5'>
                <div className='w-[70%] flex flex-col gap-5 mb-[50px]'>
                    <ListPost />
                    <Pagination />
                </div>
                <div className='w-[30%] flex flex-col justify-start'>
                    <Sidebar />
                </div>
            </div>
        </div>
    )
}

export default SearchDetail