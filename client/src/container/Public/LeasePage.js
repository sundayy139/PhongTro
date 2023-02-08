import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { ListPost, Pagination, Province, Sidebar } from '../../components/Public/index'
import { formatVietnameseToString } from '../../utils/fn'
import * as actions from '../../store/actions'


const LeasePage = () => {
    const dispatch = useDispatch()
    const { categories, curCategoryCode } = useSelector(state => state.app)
    const location = useLocation()
    const [categoryCode, setCategoryCode] = useState('')
    const [categoryInfo, setCategoryInfo] = useState(null)

    useEffect(() => {
        const category = categories?.find(item => `/${formatVietnameseToString(item.value)}` === location?.pathname)
        if (category) {
            setCategoryCode(category.code)
            setCategoryInfo(category)
            dispatch(actions.setCurCategoryCode(category.code))
        }
    }, [location])

    useEffect(() => {
        dispatch(actions.getNewPosts({ categoryCode: curCategoryCode }))
    }, [curCategoryCode])

    return (
        <div className='w-full flex flex-col gap-4'>
            <div>
                <h1 className='text-[28px] font-bold'>{categoryInfo?.title}</h1>
                <p className='text-sm text-gray-700'>{categoryInfo?.subtitle}</p>
            </div>
            <Province />
            <div className=' w-full flex gap-5'>
                <div className='w-[70%] flex flex-col gap-5 mb-[50px]'>
                    <ListPost categoryCode={categoryCode} />
                    <Pagination />
                </div>
                <div className='w-[30%] flex flex-col justify-start'>
                    <Sidebar />
                </div>
            </div>
        </div>
    )
}

export default LeasePage