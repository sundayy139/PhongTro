import React from 'react'
import { useSelector } from 'react-redux'
import avatar from '../../assets/image/avatar-person.png'
import { formatMoney, getNumberFromString } from '../../utils/fn'
import { useNavigate } from 'react-router-dom'

const User = () => {
    const navigate = useNavigate()
    const { currentUserData } = useSelector(state => state.user)

    return (
        <div
            className='h-full w-full flex items-center justify-between gap-2 cursor-pointer'
            onClick={() => navigate(`/he-thong/`)}
        >
            {
                currentUserData && Object.keys(currentUserData).length > 0 && (
                    <>
                        <div className='h-full'>
                            <img
                                src={currentUserData?.avatar || avatar}
                                alt='avatar'
                                className='w-full h-full rounded-full object-cover'
                            />
                        </div>
                        <div className='flex flex-col justify-between h-full'>
                            <span className='flex items-center text-[16px]'>Xin chào,
                                <span className='font-semibold ml-[2px]'>
                                    {currentUserData?.name}
                                </span>
                            </span>
                            <div className='flex items-center gap-2 text-xs'>
                                <span className='flex items-center'>Mã TK:
                                    <span className='font-semibold ml-[2px]'>
                                        {getNumberFromString(currentUserData?.id)}
                                    </span>
                                </span>
                                <span className='flex items-center'>Số dư:
                                    <span className='font-semibold ml-[2px]'>
                                        {`${formatMoney(currentUserData?.balance + '')} VNĐ`}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default User