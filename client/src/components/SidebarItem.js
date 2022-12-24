import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { formatVietnameseToString } from '../utils/fn'
import icons from '../utils/icons'

const { GrNext } = icons

const SidebarItem = ({ content, title, double }) => {
    return (
        <div className='p-5 border border-[#dedede] rounded-[10px] bg-white w-full text-[#333333]'>
            <h3 className='text-lg font-bold mb-2'>
                {title}
            </h3>
            {
                !double && (
                    <div className='flex flex-col gap-2'>
                        {
                            content?.map((item, index) => (
                                <Link
                                    to={`${formatVietnameseToString(item.value)}`}
                                    key={index}
                                    className=' p-[5px] flex items-center gap-2 border-b border-b-[#dedede] border-dashed hover:text-orange'
                                >
                                    <span className='mb-[2px]'>
                                        <GrNext size={8} color="#dedede" />
                                    </span>
                                    <span className='text-sm '>
                                        {item.value}
                                    </span>
                                </Link>
                            ))
                        }
                    </div>
                )
            }
            {
                double && (
                    <div className='flex gap-2 w-full flex-wrap'>
                        {
                            content?.map((item, index) => (
                                <Link
                                    to={'/'}
                                    key={index}
                                    className=' w-[calc((100%-8px)/2)] p-[5px] flex items-center gap-2 border-b border-b-[#dedede] border-dashed hover:text-orange'
                                >
                                    <span className='mb-[2px]'>
                                        <GrNext size={8} color="#dedede" />
                                    </span>
                                    <span className='text-sm '>
                                        {item.value}
                                    </span>
                                </Link>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default memo(SidebarItem)