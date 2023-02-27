import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ListBlog, Pagination, Sidebar } from '../../components/Public'
import * as actions from '../../store/actions'
import logo from '../../assets/image/homestay.png';
import { Helmet } from 'react-helmet'


const title = 'Blog - Phòng trọ';

const Blog = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actions.getBlogs())
    }, [])

    const { blogs, count } = useSelector(state => state.blog)
    return (
        <div>
            <h1 className='text-[28px] font-bold mb-4'>Blog</h1>
            <Helmet>
                <title>{title}</title>
                <link rel="icon" href={logo} />
            </Helmet>
            <div className='flex gap-5'>
                <div className='w-[70%] flex flex-col gap-5 mb-[50px]'>
                    <ListBlog />
                    <Pagination
                        count={count}
                        data={blogs}
                    />
                </div>
                <div className='w-[30%]'>
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