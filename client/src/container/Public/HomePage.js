import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { List, Pagination, Province, Sidebar } from '../../components/index'
import { text } from '../../utils/constant'


const HomePage = () => {
    const [params] = useSearchParams()
    const page = params.get('page') || 1

    return (
        <div className='w-full flex flex-col gap-4'>
            <div>
                <h1 className='text-[28px] font-bold'>{text.HOME_TITLE}</h1>
                <p className='text-sm text-gray-700'>{text.HOME_DESCRIPTION}</p>
            </div>
            <Province />
            <div className=' w-full flex gap-5'>
                <div className='w-[70%] flex flex-col gap-5'>
                    <List page={page} />
                    <Pagination number={page} />
                </div>
                <div className='w-[30%] flex flex-col justify-start'>
                    <Sidebar />
                </div>
            </div>
        </div>
    )
}

export default HomePage