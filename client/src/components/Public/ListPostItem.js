import React, { memo, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import icons from '../../utils/icons'
import { Button } from './index'
import moment from 'moment'
import 'moment/locale/vi';
import avatar from '../../assets/image/avatar-person.png'
import zalo from '../../assets/icon/zalo-icon.png';
import { useDispatch, useSelector } from 'react-redux'
import * as apis from '../../services'
import * as actions from '../../store/actions'
import { path } from '../../utils/path'

const { BsTelephone, BsSuitHeart, BsSuitHeartFill } = icons

const ListPostItem = ({ images, price, acreage, description, id, address, user, title, createdAt, order }) => {
    const [isHoverHeart, setIsHoverHeart] = useState(false)
    const { favouritePost } = useSelector(state => state.post)
    const { isLoggedIn } = useSelector(state => state.auth)
    const { flag } = useSelector(state => state.app)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClickHeart = async () => {
        if (!isLoggedIn) {
            navigate(`/${path.LOGIN}`)
        } else {
            if (isHoverHeart === false) {
                const res = await apis.apiSetFavouritePost({ postId: id })
                if (res?.data?.err === 0) {
                    setIsHoverHeart(true)
                    dispatch(actions.setFlag(!flag))
                }
            } else {
                const res = await apis.apiRemoveFavouritePost({ postId: id })
                if (res?.data?.err === 0) {
                    setIsHoverHeart(false)
                    dispatch(actions.setFlag(!flag))
                }
            }
        }
    }

    useEffect(() => {
        if (favouritePost && favouritePost.includes(id)) {
            setIsHoverHeart(true)
        }

    }, [favouritePost])

    const handleClickImage = () => {
        navigate(`/chi-tiet/${id}`)
    }

    return (
        <div className={` ${order === 3
            ? `pc:border-t pc:border-t-[#E13427] w-full laptop:border-t laptop:border-t-[#E13427] bg-[#fff9f3]
                phone:flex-col phone:gap-3 phone:shadow-sm tablet:flex-col tablet:gap-3 tablet:shadow-sm`
            : order === 2
                ? `pc:border-t pc:border-t-[#ea2e9d] w-full laptop:border-t laptop:border-t-[#ea2e9d]
                phone:flex-col phone:gap-3 phone:bg-white phone:shadow-sm  tablet:flex-col tablet:gap-3 tablet:bg-white tablet:shadow-sm`
                : `pc:border-t pc:border-t-[#3763e0] w-full laptop:border-t laptop:border-t-[#3763e0]
                    phone:gap-3 phone:bg-white phone:shadow-sm tablet:gap-3 tablet:bg-white tablet:shadow-sm`} 
                    w-full flex items-center px-5 py-[15px]`} >
            <div
                className={`${order === 3
                    ? `pc:w-[240px] pc:h-[240px] pc:flex-none laptop:w-[240px] laptop:h-[240px] laptop:flex-none relative cursor-pointer phone:w-full phone:h-[300px] tablet:w-full tablet:h-[300px]`
                    : `pc:w-[170px] pc:h-[170px] flex-none laptop:w-[170px] laptop:h-[160px] relative cursor-pointer phone:w-[150px] phone:h-[150px] tablet:w-[150px] tablet:h-[150px]`
                    }`}>
                <img
                    src={images && images[0]}
                    alt='image'
                    className='rounded-md w-full h-full object-cover'
                    onClick={handleClickImage}
                />
                <span className='absolute bottom-[6px] left-[6px] right-[10px] text-[12px] text-white flex items-center justify-between'>
                    <span className=' p-[3px] bg-[rgba(0,0,0,0.5)] rounded-[4px]'>
                        {`${images?.length} ảnh`}
                    </span>
                    <span
                        onClick={handleClickHeart}
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
            </div>
            <div className={`${order === 3
                ? `pc:flex-auto pc:h-[240px] pc:ml-4 pc:max-w-[calc(100%-256px)] w-full laptop:flex-auto laptop:h-[240px] laptop:max-w-[calc(100%-256px)] laptop:ml-4 flex flex-col pc:justify-between laptop:justify-between phone:gap-4 phone:w-full tablet:gap-4 tablet:w-full items-start`
                : `flex-auto pc:max-w-[calc(100%-186px)] pc:h-[170px] pc:ml-4 laptop:max-w-[calc(100%-186px)] laptop:h-[170px] laptop:ml-4 flex flex-col justify-between phone:w-full phone:h-[150px] tablet:w-full items-start`
                }`}>
                <Link
                    to={`/chi-tiet/${id}`}
                    className={`${order === 3 ? 'text-[#E13427]' : order === 2 ? 'text-[#ea2e9d]' : 'text-[#3763e0]'} font-bold line-clamp-3 text-sm uppercase hover:underline cursor-pointer`}
                >
                    {title}
                </Link>
                <div className='w-full pc:flex pc:items-center pc:justify-between laptop:flex laptop:items-center laptop:justify-between '>
                    <div className='flex pc:gap-4 pc:items-center laptop:items-center laptop:gap-4 justify-between phone:flex-col tablet:flex-col phone:items-start tablet:items-start'>
                        <div className='flex gap-4 items-center'>
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
                        <span className='text-sm phone:text-[#777777] phone:w-full tablet:text-[#777777] tablet:w-full whitespace-nowrap'>
                            {address}
                        </span>
                    </div>
                    <span className='min-w-[80px] text-right text-[12px] text-gray-400 phone:hidden tablet:hidden'>
                        {moment(createdAt).locale('vi').fromNow()}
                    </span>
                </div>
                <p className={`${order === 3 ? `line-clamp-3 ` : `line-clamp-2`} text-[12px] w-full phone:hidden tablet:hidden`} >
                    {description}
                </p>
                <div className={`${order !== 3 && 'phone:hidden tablet:hidden'} w-full flex items-center justify-between h-[30px]`}>
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