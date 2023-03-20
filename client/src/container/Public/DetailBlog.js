import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom'
import * as apis from '../../services';
import logo from '../../assets/image/homestay.png';
import { ListBlog, NewPost, Sidebar } from '../../components/Public';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions'

const DetailBlog = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const [detailBlog, setDetailBlog] = useState(null)
    const { newPosts } = useSelector(state => state.post)
    const [title, setTile] = useState('')

    useEffect(() => {
        dispatch(actions.getNewPosts())
    }, [])

    useEffect(() => {
        const fetchDetailBlog = async (blogId) => {
            const res = await apis.apiGetBlogById(blogId)
            if (res?.data?.err === 0) {
                setDetailBlog(res?.data?.blog)
            }
        }

        fetchDetailBlog(params.blogId)
    }, [params])

    useEffect(() => {
        setTile(`${detailBlog?.title}`)
    }, [detailBlog])

    return (
        <div>
            <Helmet>
                <title>{title}</title>
                <link rel="icon" href={logo} />
            </Helmet>
            <div className='w-full flex phone:flex-col tablet:flex-col gap-5'>
                <div className='pc:w-[67%] laptop:w-[67%] flex flex-col gap-5 flex-auto mb-[50px] phone:w-full tablet:w-full tablet:px-4 phone:px-4'>
                    <h1 className='text-[28px] font-bold'>{detailBlog?.title}</h1>
                    <div
                        dangerouslySetInnerHTML={{ __html: detailBlog?.descHTML }}
                        className='text-dangerous css'
                    >
                    </div>
                </div>
                <div className='pc:hidden laptop:hidden phone:flex phone:flex-col phone:border-t-[5px] phone:border-t-[#f5f5f5]
                    tablet:border-t-[5px] tablet:border-t-[#f5f5f5] tablet:flex tablet:flex-col tablet:px-4 tablet:py-5'>
                    <ListBlog
                        isRelease
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

export default DetailBlog