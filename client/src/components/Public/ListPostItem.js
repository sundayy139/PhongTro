import React, { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import icons from '../../utils/icons'
import { Button } from './index'
import moment from 'moment'
import 'moment/locale/vi';
import avatar from '../../assets/image/avatar-person.png'


const { BsStarFill, BsTelephone, BsMessenger, BsSuitHeart, BsSuitHeartFill } = icons

const ListPostItem = ({ images, price, acreage, description, id, address, user, title, createdAt }) => {
    const [isHoverHeart, setIsHoverHeart] = useState()
    return (
        <div className='w-full flex  items-center px-5 py-[15px] border-t border-t-[#E13427]'>
            <Link
                to={`/chi-tiet/${id}`}
                className='w-[240px] h-[240px] flex-none relative cursor-pointer'
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
            <div className='flex-auto max-w-[calc(100%-256px)] h-[240px] ml-4 flex flex-col justify-between'>
                <Link
                    to={`/chi-tiet/${id}`}
                    className='text-[#E13427] font-bold text-sm uppercase hover:underline cursor-pointer'
                >
                    {title}
                </Link>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4 justify-between'>
                        <span className='text-[17px] text-[#16c784] font-semibold whitespace-nowrap'>
                            {
                                price < 1 ? `${String(price * Math.pow(10, 6)).replace(/(.)(?=(\d{3})+$)/g, '$1.')} đồng/tháng` : `${price} triệu/tháng`
                            }
                        </span>
                        <span className='text-sm'>
                            {acreage}
                            <span>
                                m<sup>2</sup>
                            </span>
                        </span>
                        <span className='text-sm'>
                            {`${address.split(',')[address.split(',').length - 2]}, ${address.split(',')[address.split(',').length - 1]}`}
                        </span>
                    </div>
                    <span className='min-w-[80px] text-right text-[12px] text-gray-400'>
                        {moment(createdAt).locale('vi').fromNow()}
                    </span>
                </div>
                <p className='text-[12px] w-full line-clamp-3' >
                    {description}
                </p>
                <div className='flex items-center justify-between  h-[30px]'>
                    <span className='flex items-center gap-2 text-sm text-gray-400 h-full'>
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
                                bgColor={"bg-primary"}
                                textStyle={"text-[#333333] text-sm"}
                                hover={'hover:bg-secondary1 hover:text-white'}
                                onClick={() => window.open(`tel:${user?.phone}`)}
                            />
                        </span>
                        <span className='h-full'>
                            <Button
                                text={"Zalo"}
                                icBefore={<BsMessenger size={15} />}
                                bgColor={"bg-primary"}
                                textStyle={"text-[#333333] text-sm"}
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

export default memo(ListPostItem)