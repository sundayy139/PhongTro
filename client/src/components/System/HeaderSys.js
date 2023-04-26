import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatVietnameseToString, getNumberFromString } from '../../utils/fn'
import icons from '../../utils/icons'
import Button from './Button'
import * as actions from '../../store/actions'
import { io } from 'socket.io-client'

const { BsBell } = icons
const socket = io(process.env.REACT_APP_SERVER_URL)

const HeaderSys = () => {
    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.app)
    const { notifications } = useSelector(state => state.admin)
    const [noti, setNoti] = useState()
    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
        socket.on('newReport', (data) => {
            dispatch(actions.setNotification(`Có một báo cáo mới từ người dùng về bài viết #${getNumberFromString(data.postId)}, vui lòng kiểm tra và xử lý.`))
        })

        socket.on('newPost', (data) => {
            dispatch(actions.setNotification(`Có bài đăng mới được tạp từ người dùng, vui lòng kiểm tra và xử lý.`))
        })
    }, [])

    useEffect(() => {
        setNoti(notifications)
    }, [notifications])

    return (
        <div className='w-full bg-secondary1 px-4  shadow-md relative'>
            <div className='w-full h-full flex items-center text-white text-sm justify-between'>
                <div className=' flex items-center  gap-3'>
                    <Link
                        to={"/"}
                        className='w-[224px] text-lg font-bold pl-4'>
                        Phongtro123.com
                    </Link>
                    <Link
                        to={"/"}
                        className=" hover:bg-secondary2 px-2 py-4"
                    >
                        Trang chủ
                    </Link>
                    {
                        categories?.length > 0 && categories?.map((item, index) => (
                            <Link
                                key={index}
                                target='_blank'
                                to={`/${formatVietnameseToString(item.value)}`}
                                className="px-2 py-4 hover:bg-secondary2"
                            >
                                {item.value}
                            </Link>
                        ))
                    }
                </div>
                <span
                    className=" cursor-pointer px-2 relative"
                    onClick={() => setIsShow(!isShow)}
                >
                    <BsBell size={25} />
                    {
                        noti?.length > 0 && (
                            <span className='absolute top-[-10px] right-0 w-[18px] h-[18px] rounded-full text-xs p-[2px] bg-secondary2 text-center'>{noti?.length}</span>
                        )
                    }
                </span>
                {
                    isShow && (
                        <>
                            <div className='absolute top-[52px] right-0 bg-blue-200 p-4 rounded-[10px] z-[9999]'>
                                <div className='flex flex-col gap-2 w-[500px] max-h-[350px] overflow-auto'>
                                    {
                                        noti.length > 0 && noti?.map((item, index) => (
                                            <span
                                                className='text-black p-4 bg-white rounded-[5px]'
                                                key={index}
                                            >
                                                {item}
                                            </span>
                                        ))
                                    }
                                </div>
                                <div className='mt-4'>
                                    <Button
                                        text={"Đánh dấu đã xem"}
                                        textStyle={'text-white text-sm font-semibold py-[5px]'}
                                        hover={'hover:bg-secondary hover:text-white'}
                                        bgColor={"bg-secondary1"}
                                        onClick={() => {
                                            dispatch(actions.clearNotification())
                                            setIsShow(false)
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default HeaderSys