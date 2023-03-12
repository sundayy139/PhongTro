import React, { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import icons from '../../utils/icons'
import { Button } from './index'
import moment from 'moment'
import 'moment/locale/vi';
import avatar from '../../assets/image/avatar-person.png'
import zalo from '../../assets/icon/zalo-icon.png';

const { BsStarFill, BsTelephone, BsMessenger, BsSuitHeart, BsSuitHeartFill } = icons

const ListPostItem = ({ images, price, acreage, description, id, address, user, title, createdAt }) => {
    const [isHoverHeart, setIsHoverHeart] = useState()
    return (
        <div className='w-full flex items-center px-5 py-[15px] pc:border-t pc:border-t-[#E13427] laptop:border-t laptop:border-t-[#E13427]
        phone:flex-col phone:gap-3 phone:bg-white phone:shadow-sm  tablet:flex-col tablet:gap-3 tablet:bg-white tablet:shadow-sm '>
            <Link
                to={`/chi-tiet/${id}`}
                className='pc:w-[240px] pc:h-[240px]  pc:flex-none laptop:w-[240px] laptop:h-[240px] laptop:flex-none relative cursor-pointer phone:w-full phone:h-[270px] tablet:w-full  tablet:h-[500px] '
            >
                <img
                    src={images && images[0]}
                    alt='image'
                    className='rounded-md w-full h-full object-cover'
                />
                <span className='absolute bottom-[6px] left-[6px] right-[10px] text-[12px] text-white flex items-center justify-between'>
                    <span className=' p-[3px] bg-[rgba(0,0,0,0.5)] rounded-[4px]'>
                        {`${images?.length} ảnh`}
                    </span>
                    <span
                        onMouseEnter={() => setIsHoverHeart(true)}
                        onMouseLeave={() => setIsHoverHeart(false)}
                    // onClick={() => setIsHoverHeart(true)}
                    >
                        {
                            isHoverHeart ? (
                                <BsSuitHeartFill size={22} color="#E13427" />

                            ) : (
                                <BsSuitHeart size={22} />
                            )
                        }
                    </span>
                </span>
            </Link>
            <div className='pc:flex-auto pc:max-w-[calc(100%-256px)] pc:h-[240px] pc:ml-4 laptop:flex-auto laptop:max-w-[calc(100%-256px)] laptop:h-[240px] laptop:ml-4 flex flex-col pc:justify-between laptop:justify-between phone:gap-4 phone:w-full tablet:gap-4 tablet:w-full  items-start'>
                <Link
                    to={`/chi-tiet/${id}`}
                    className='text-[#E13427] font-bold text-sm uppercase hover:underline cursor-pointer'
                >
                    {title}
                </Link>
                <div className='pc:flex pc:items-center pc:justify-between laptop:flex laptop:items-center laptop:justify-between'>
                    <div className='flex items-center gap-4 justify-between phone:flex-col tablet:flex-col'>
                        <div className='flex gap-4 items-center w-full'>
                            <span className='text-[17px] text-[#16c784] font-semibold whitespace-nowrap'>
                                {
                                    price < 1 ? `${String(price * Math.pow(10, 6)).replace(/(.)(?=(\d{3})+$)/g, '$1.')} đồng/tháng` : `${price} triệu/tháng`
                                }
                            </span>
                            <span className='text-sm phone:text-[#777777] tablet:text-[#777777]'>
                                {acreage}
                                <span>
                                    m<sup>2</sup>
                                </span>
                            </span>
                        </div>
                        <span className='text-sm phone:text-[#777777] phone:w-full tablet:text-[#777777] tablet:w-full'>
                            {`${address.split(',')[address.split(',').length - 2]}, ${address.split(',')[address.split(',').length - 1]}`}
                        </span>
                    </div>
                    <span className='min-w-[80px] text-right text-[12px] text-gray-400 phone:hidden tablet:hidden'>
                        {moment(createdAt).locale('vi').fromNow()}
                    </span>
                </div>
                <p className='text-[12px] w-full line-clamp-3 phone:hidden tablet:hidden' >
                    {description}
                </p>
                <div className='w-full flex items-center justify-between h-[30px]'>
                    <span className='flex items-center gap-2 text-sm text-gray-400 h-full phone:hidden tablet:hidden'>
                        <img src={avatar} className='w-[30px] h-full object-cover rounded-full' />
                        <span>
                            {user?.name}
                        </span>
                    </span>
                    <span className='flex gap-4 h-full'>
                        <span className='h-full'>
                            <Button
                                text={`${user?.phone}`}
                                icBefore={<BsTelephone size={15} />}
                                bgColor={"pc:bg-primary laptop:bg-primary phone:bg-[#3377cc] tablet:bg-[#3377cc]"}
                                textStyle={"pc:text-[#333333] laptop:text-[#333333] text-sm phone:text-white tablet:text-white"}
                                hover={'hover:bg-secondary1 hover:text-white'}
                                onClick={() => window.open(`tel:${user?.phone}`)}
                            />
                        </span>
                        <span className='h-full'>
                            <Button
                                text={"Nhắn Zalo"}
                                icBefore={<img src={zalo} className='w-4 h-4' />}
                                bgColor={"pc:bg-primary laptop:bg-primary phone:bg-white tablet:bg-white"}
                                textStyle={"pc:text-[#333333] laptop:text-[#333333] text-sm phone:text-[#3377cc] tablet:text-[#3377cc] phone:border phone:border-[#3377cc] tablet:border tablet:border-[#3377cc]"}
                                hover={'hover:bg-secondary1 hover:text-white'}
                                onClick={() => window.open(`https://zalo.me/${user?.phone}`)}
                            />
                        </span>
                    </span>
                </div>
                <div className='text-sm text-[#777777] pc:hidden laptop:hidden'>
                    <span>Cập nhật:</span>
                    <span className='ml-1'>
                        {moment(createdAt).locale('vi').fromNow()}
                    </span>
                </div>
            </div>
        </div >
    )
}

export default memo(ListPostItem)