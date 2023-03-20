import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { ListPost, Pagination, Province, NewPost, Sidebar } from '../../components/Public/index'
import { formatVietnameseToString } from '../../utils/fn'
import * as actions from '../../store/actions'
import logo from '../../assets/image/homestay.png';
import { Helmet } from 'react-helmet'

const LeasePage = () => {
    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.app)
    const { count, posts, newPosts } = useSelector(state => state.post)
    const location = useLocation()
    const [categoryCode, setCategoryCode] = useState('')
    const [categoryInfo, setCategoryInfo] = useState(null)
    const [title, setTitle] = useState('')

    useEffect(() => {
        const category = categories?.find(item => `/${formatVietnameseToString(item.value)}` === location?.pathname)
        if (category) {
            setCategoryCode(category.code)
            setCategoryInfo(category)
            dispatch(actions.setCurCategoryCode(category.code))
        }
    }, [location, categories])

    useEffect(() => {
        setTitle(`${categoryInfo?.value} - Phòng trọ`)
    }, [categoryInfo])

    useEffect(() => {
        dispatch(actions.getNewPosts())
    }, [])

    return (
        <div className='w-full flex flex-col gap-4'>
            <Helmet>
                <title>{title}</title>
                <link rel="icon" href={logo} />
            </Helmet>
            <div className='tablet:px-4 phone:px-4'>
                <h1 className='pc:text-[28px] laptop:text-[28px] phone:text-xl tablet:text-xl font-bold mb-2'>{categoryInfo?.title}</h1>
                <p className='text-sm phone:text-[#777777] tablet:text-[#777777]'>{categoryInfo?.subtitle}</p>
            </div>
            <div className='phone:hidden tablet:hidden'>
                <Province />
            </div>
            <div className='w-full flex phone:flex-col tablet:flex-col gap-5 '>
                <div className='pc:hidden laptop:hidden phone:flex phone:flex-col phone:px-4 phone:py-5 phone:border-t-[5px] phone:border-t-[#f5f5f5] phone:border-b-[5px] phone:border-b-[#f5f5f5]
                    tablet:border-t-[5px] tablet:border-t-[#f5f5f5] tablet:border-b-[5px] tablet:border-b-[#f5f5f5] tablet:flex tablet:flex-col tablet:px-4 tablet:py-5'>
                    <h3 className='text-lg font-bold mb-2'>
                        Khu vực nổi bật
                    </h3>
                    <Province />
                </div>
                <div className='pc:w-[67%] laptop:w-[67%] flex flex-col gap-5  mb-[50px] phone:w-full tablet:w-full'>
                    <ListPost categoryCode={categoryCode} />
                    <Pagination
                        count={count}
                        data={posts}
                    />
                </div>
                <div className='w-[33%] flex flex-col justify-start phone:hidden tablet:hidden'>
                    <Sidebar />
                </div>
                <div className='pc:hidden laptop:hidden phone:flex phone:flex-col phone:px-4 phone:py-5 phone:border-t-[5px] phone:border-t-[#f5f5f5]
                    tablet:border-t-[5px] tablet:border-t-[#f5f5f5] tablet:flex tablet:flex-col tablet:px-4 tablet:py-5'>
                    <NewPost
                        title={'Tin mới đăng'}
                        data={newPosts}
                    />
                </div>
            </div>
        </div>
    )
}

export default LeasePage