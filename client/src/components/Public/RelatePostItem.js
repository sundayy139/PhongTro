import React, { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import icons from '../../utils/icons'
import { Button } from './index'
import moment from 'moment'
import 'moment/locale/vi';
import avatar from '../../assets/image/avatar-person.png'
import zalo from '../../assets/icon/zalo-icon.png';

const { BsStarFill, BsTelephone, BsMessenger, BsSuitHeart, BsSuitHeartFill } = icons

const RelatePostItem = ({ images, price, acreage, description, id, address, user, title, createdAt }) => {
    const [isHoverHeart, setIsHoverHeart] = useState()
    return (
        <div className='flex items-center pc:px-5 pc:py-[15px] laptop:px-5 laptop:py-[15px] pc:border-t pc:border-t-[#055699] laptop:border-t laptop:border-t-[#055699]
        phone:flex-col phone:gap-3 phone:bg-white phone:py-[10px] tablet:flex-col tablet:gap-3 tablet:bg-white tablet:py-[10px]'>
            <Link
                to={`/chi-tiet/${id}`}
                className='pc:w-[170px] pc:h-[170px] laptop:w-[170px] laptop:h-[170px] flex-none cursor-pointer phone:w-[150px] phone:h-[120px] tablet:w-[150px] tablet:h-[120px] relative'
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
                        onClick={() => setIsHoverHeart(true)}
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
            <div className='pc:flex-auto pc:h-[170px] pc:ml-4 laptop:flex-auto laptop:h-[170px] laptop:ml-4 flex flex-col pc:justify-between laptop:justify-between phone:gap-[5px] phone:max-w-[150px] tablet:gap-[5px] tablet:max-w-[150px] items-start'>
                <Link
                    to={`/chi-tiet/${id}`}
                    className='text-[#055699] font-bold text-sm pc:uppercase laptop:uppercase  hover:underline cursor-pointer line-clamp-3'
                >
                    {title}
                </Link>
                <div className='w-full pc:flex pc:items-center pc:justify-between laptop:flex laptop:items-center laptop:justify-between'>
                    <div className='flex items-center pc:gap-4 laptop:gap-4 justify-between phone:flex-col phone:gap-[5px] tablet:flex-col tablet:gap-[5px]'>
                        <div className='flex gap-4 items-center w-full'>
                            <span className='pc:text-[17px] laptop:text-[17px] phone:text-sm tablet:text-sm text-[#16c784] font-semibold whitespace-nowrap'>
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
                        <span className='pc:text-sm laptop:text-sm phone:text-xs tablet:text-xs phone:text-[#777777] phone:w-full tablet:text-[#777777] tablet:w-full whitespace-nowrap'>
                            {address}
                        </span>
                    </div>
                    <span className='min-w-[80px] text-right text-[12px] text-gray-400 phone:hidden tablet:hidden'>
                        {moment(createdAt).locale('vi').fromNow()}
                    </span>
                </div>
                <p className='text-[12px] w-full line-clamp-3 phone:hidden tablet:hidden' >
                    {description}
                </p>
                <div className='w-full flex items-center justify-between h-[30px] phone:hidden tablet:hidden'>
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
            </div>
        </div >
    )
}

export default memo(RelatePostItem)