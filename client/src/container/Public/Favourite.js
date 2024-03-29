import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ListPost, Pagination, Province, NewPost, Sidebar, BottomBar } from '../../components/Public/index'
import * as actions from '../../store/actions'
import logo from '../../assets/image/homestay.png';
import { Helmet } from 'react-helmet'

const title = 'Tin đã lưu - Phòng trọ';

const Favourite = () => {
    const dispatch = useDispatch()
    const { count, posts, newPosts, favouritePost } = useSelector(state => state.post)

    useEffect(() => {
        dispatch(actions.getNewPosts())
    }, [])

    return (
        <div className='w-full flex flex-col gap-4 relative'>
            <BottomBar />
            <Helmet>
                <title>{title}</title>
                <link rel="icon" href={logo} />
            </Helmet>
            <div className='tablet:px-4 phone:px-4 phone:border-b-[5px] phone:border-b-[#f5f5f5] tablet:border-b-[5px] tablet:border-b-[#f5f5f5]'>
                <h1 className='pc:text-[28px] laptop:text-[28px] phone:text-xl tablet:text-xl font-bold mb-2'>Tin đã lưu</h1>
            </div>
            <div className='w-full flex phone:flex-col tablet:flex-col gap-5 '>
                <div className='pc:w-[67%] laptop:w-[67%] flex flex-col gap-5  mb-[50px] phone:w-full tablet:w-full'>
                    <ListPost isHideSort favouritePost={favouritePost} />
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

export default Favourite