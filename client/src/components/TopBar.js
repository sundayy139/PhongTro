import React, { useCallback } from 'react';
import logo from '../assets/image/logo-phongtro.svg'
import { Button } from './index';
import icons from '../utils/icons';
import { Link, useNavigate } from 'react-router-dom';
import { path } from '../utils/path';

const { BsPlusCircle } = icons

const TopBar = () => {
    const navigate = useNavigate();
    const goLogin = useCallback(() => {
        navigate(path.LOGIN)
    })

    const goRegister = useCallback(() => {
        navigate(path.REGISTER)
    })

    return (
        <div className='w-1100 mx-auto flex items-center justify-between'>
            <Link
                to={'/'}
                className='w-[240px] h-[70px]'
            >
                <img
                    src={logo}
                    alt="logo"
                    className='w-full h-full object-contain'
                />
            </Link>
            <div className='flex items-center gap-2'>
                <Button
                    text='Đăng nhập'
                    textColor='text-white'
                    bgColor='bg-secondary1'
                    onClick={goLogin}
                />
                <Button
                    text='Đăng ký'
                    textColor='text-white'
                    bgColor='bg-secondary1'
                    onClick={goRegister}
                />
                <Button
                    text='Đăng tin mới'
                    textColor='text-white'
                    bgColor='bg-secondary2'
                    icAfter={<BsPlusCircle />}
                />
            </div>
        </div>
    )
}

export default TopBar