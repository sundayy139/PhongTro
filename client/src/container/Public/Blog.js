import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BottomBar, ListBlog, NewPost, Pagination, Sidebar } from '../../components/Public'
import * as actions from '../../store/actions'
import logo from '../../assets/image/homestay.png';
import { Helmet } from 'react-helmet'


const title = 'Blog - Phòng trọ';

const Blog = () => {
    const { newPosts } = useSelector(state => state.post)
    const { blogs, count } = useSelector(state => state.blog)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actions.getBlogs())
    }, [])

    return (
        <div className='relative'>
            <BottomBar />
            <h1 className='text-[28px] font-bold pb-4 phone:px-4 phone:border-b-[5px] phone:border-b-[#f5f5f5] tablet:px-4 tablet:border-b-[5px] tablet:border-b-[#f5f5f5]'>Blog</h1>
            <Helmet>
                <title>{title}</title>
                <link rel="icon" href={logo} />
            </Helmet>
            <div className='w-full flex phone:flex-col tablet:flex-col gap-5'>
                <div className='pc:w-[67%] laptop:w-[67%] flex flex-col gap-5 mb-[50px] phone:w-full tablet:w-full'>
                    <ListBlog />
                    <Pagination
                        count={count}
                        data={blogs}
                    />
                </div>
                <div className='pc:hidden laptop:hidden phone:flex phone:flex-col phone:px-4 phone:py-5 phone:border-t-[5px] phone:border-t-[#f5f5f5]
                    tablet:border-t-[5px] tablet:border-t-[#f5f5f5] tablet:flex tablet:flex-col tablet:px-4 tablet:py-5'>
                    <NewPost
                        title={'Tin mới đăng'}
                        data={newPosts}
                    />
                </div>
                <div className='w-[33%] flex flex-col justify-start phone:hidden tablet:hidden'>
                    <Sidebar
                        isHidePrice
                        isHideAcreage
                    />
                </div>
            </div>
        </div>
    )
}

export default Blog