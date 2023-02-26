import React from 'react'
import { useSelector } from 'react-redux'
import avatar from '../../assets/image/avatar-person.png'
import { getNumberFromString } from '../../utils/fn'

const User = () => {
    const { currentUserData } = useSelector(state => state.user)
    return (
        <div className='h-full w-full flex items-center gap-2 text-sm'>
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
                            <span className='flex items-center'>Xin chào,
                                <span className='font-semibold ml-[2px]'>
                                    {currentUserData?.name}
                                </span>
                            </span>
                            <span className='flex items-center'>Mã tài khoản:
                                <span className='font-semibold ml-[2px]'>
                                    {currentUserData?.id ? getNumberFromString(currentUserData?.id) : ''}
                                </span>
                            </span>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default User