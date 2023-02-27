import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom'
import * as apis from '../../services';
import logo from '../../assets/image/homestay.png';
import { ListBlog, Sidebar } from '../../components/Public';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions'

const DetailBlog = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const [detailBlog, setDetailBlog] = useState(null)
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
        <div className=''>
            <Helmet>
                <title>{title}</title>
                <link rel="icon" href={logo} />
            </Helmet>
            <div className='flex gap-5'>
                <div className='w-[70%] flex flex-col gap-5 mb-[50px]'>
                    <h1 className='text-[28px] font-bold'>{detailBlog?.title}</h1>
                    <div
                        dangerouslySetInnerHTML={{ __html: detailBlog?.descHTML }}
                        className='text-dangerous css'
                    >
                    </div>
                    <ListBlog
                        isRelease
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

export default DetailBlog