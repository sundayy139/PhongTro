import React, { memo } from 'react'
import moment from 'moment'
import 'moment/locale/vi';
import { Link } from 'react-router-dom';

const ReleasePostItem = ({ img, title, createdAt, price, id, address }) => {
    return (
        <div className='flex py-[10px] pc:gap-3 pc:border-b pc:border-b-[#eee] laptop:gap-3 laptop:border-b laptop:border-b-[#eee] phone:flex-col phone:gap-3 tablet:flex-col tablet:gap-3'>
            <Link
                to={`/chi-tiet/${id}`}
                className='pc:w-[65px] pc:h-[65px] laptop:w-[65px] laptop:h-[65px] flex-none cursor-pointer phone:w-[200px] phone:h-[200px] tablet:w-[200px] tablet:h-[200px]'
            >
                <img src={img}
                    className='w-full h-full object-cover rounded-[5px]'
                />
            </Link>
            <div className='flex flex-col flex-auto gap-[5px]'>
                <Link
                    to={`/chi-tiet/${id}`}
                    className='text-sm text-[#055699] line-clamp-2 cursor-pointer hover:underline'
                >
                    {title}
                </Link>
                <div className='flex pc:items-end pc:justify-between laptop:items-end laptop:justify-between phone:flex-col phone:gap-[5px] tablet:flex-col tablet:gap-[5px]'>
                    <span className='text-sm text-[#16c784] font-semibold whitespace-nowrap'>
                        {
                            price < 1 ? `${String(price * Math.pow(10, 6)).replace(/(.)(?=(\d{3})+$)/g, '$1.')} đồng/tháng` : `${price} triệu/tháng`
                        }
                    </span>
                    <span className='text-xs text-[#aaaaaa] min-w-[75px] text-right phone:hidden tablet:hidden'>
                        {moment(createdAt).locale('vi').fromNow()}
                    </span>
                    <span className='text-xs phone:text-[#777777] tablet:text-[#777777] pc:hidden laptop:hidden'>
                        {`${address.split(',')[address.split(',').length - 2]}, ${address.split(',')[address.split(',').length - 1]}`}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default memo(ReleasePostItem)