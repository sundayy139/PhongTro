import React, { memo } from 'react'
import icons from '../../utils/icons'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { formatVietnameseToString } from '../../utils/fn'

const { GrNext } = icons

const SidebarItem = ({ content, title, double, type }) => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleFilter = (code) => {
        navigate({
            pathname: location?.pathname,
            search: createSearchParams({
                [type]: code,
            }).toString()
        })
    }

    const handleNavigate = (value) => {
        navigate(`/${formatVietnameseToString(value)}`)
    }

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
                                <div
                                    key={index}
                                    onClick={() => {
                                        type === 'categoryCode' ? handleNavigate(item.value) : handleFilter(item.code)
                                    }}
                                    className=' p-[5px] flex items-center gap-2 border-b border-b-[#dedede] border-dashed hover:text-orange cursor-pointer'
                                >
                                    <span className='mb-[2px]'>
                                        <GrNext size={8} color="#dedede" />
                                    </span>
                                    <span className='text-sm '>
                                        {item.value}
                                    </span>
                                </div>
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
                                <div
                                    key={index}
                                    onClick={() => handleFilter(item.code)}
                                    className=' w-[calc((100%-8px)/2)] p-[5px] flex items-center gap-2 border-b border-b-[#dedede] border-dashed hover:text-orange cursor-pointer'
                                >
                                    <span className='mb-[2px]'>
                                        <GrNext size={8} color="#dedede" />
                                    </span>
                                    <span className='text-sm '>
                                        {item.value}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default memo(SidebarItem)