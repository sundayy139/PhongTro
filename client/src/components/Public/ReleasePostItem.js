import React, { memo } from 'react'
import moment from 'moment'
import 'moment/locale/vi';

const ReleasePostItem = ({ img, title, createdAt, price }) => {
    return (
        <div className='flex py-[10px] gap-3 border-b border-b-[#eee]'>
            <div className='w-[65px] h-[65px] flex-none cursor-pointer'>
                <img src={img}
                    className='w-full h-full object-cover rounded-[5px]'
                />
            </div>
            <div className='flex flex-col flex-auto gap-[5px]'>
                <h4 className='text-sm text-[#055699] line-clamp-2 cursor-pointer hover:underline'>
                    {title}
                </h4>
                <div className='flex items-end justify-between '>
                    <span className='text-sm font-bold text-[#16c784] line-clamp-1'>
                        {price}
                    </span>
                    <span className='text-xs text-[#aaaaaa] min-w-[75px] text-right'>
                        {moment(createdAt).locale('vi').fromNow()}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default memo(ReleasePostItem)