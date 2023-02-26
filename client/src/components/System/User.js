import React from 'react'
import { useSelector } from 'react-redux'
import avatar from '../../assets/image/avatar-person.png'
import { getNumberFromString } from '../../utils/fn'

const User = () => {
    const { currentUserData } = useSelector(state => state.user)
    return (
        <div className='text-[16px] flex flex-col gap-2'>
            <div className='h-[50px] w-full flex items-center gap-4'>
                <div className='h-full w-[50px] rounded-full border-[3px] border-white'>
                    <img
                        src={currentUserData?.avatar || avatar}
                        alt='avatar'
                        className='w-full h-full rounded-full object-cover'
                    />
                </div>
                <div className='flex flex-col justify-center h-full gap-1'>
                    <span className='font-semibold'>
                        {currentUserData?.name}
                    </span>
                    <span className='text-sm'>
                        {currentUserData?.phone}
                    </span>
                </div>
            </div>
            <span className='flex items-center text-sm'>Mã tài khoản:
                <span className='font-semibold ml-[3px] w-[124px] inline-block overflow-hidden whitespace-nowrap text-ellipsis'>
                    {currentUserData?.id ? getNumberFromString(currentUserData?.id) : ''}
                </span>
            </span>
        </div>
    )
}

export default User