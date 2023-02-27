import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ListPost, Pagination, Province, Sidebar } from '../../components/Public/index'
import { text } from '../../utils/constant'
import * as actions from '../../store/actions'


const HomePage = () => {
    const dispatch = useDispatch();
    const { count, posts } = useSelector(state => state.post)

    useEffect(() => {
        dispatch(actions.getNewPosts())
    }, [])
    return (
        <div className='w-full flex flex-col gap-4'>
            <div>
                <h1 className='text-[28px] font-bold'>{text.HOME_TITLE}</h1>
                <p className='text-sm text-gray-700'>{text.HOME_DESCRIPTION}</p>
            </div>
            <Province />
            <div className=' w-full flex gap-5'>
                <div className='w-[70%] flex flex-col gap-5 mb-[50px]'>
                    <ListPost />
                    <Pagination
                        count={count}
                        data={posts}
                    />
                </div>
                <div className='w-[30%] flex flex-col justify-start'>
                    <Sidebar />
                </div>
            </div>
        </div>
    )
}

export default HomePage