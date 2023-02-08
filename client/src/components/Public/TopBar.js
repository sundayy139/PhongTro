import React, { useCallback, useEffect, useRef, useState } from 'react';
import logo from '../../assets/image/logo-phongtro.svg'
import { Button, User } from './index';
import icons from '../../utils/icons';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { path } from '../../utils/path';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions'
import { menuAdmin, menuManage } from '../../utils/constant';

const { BsPlusCircle, MdLogout, MdOutlineKeyboardArrowDown } = icons

const TopBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    let page = searchParams.get('page')
    const { isLoggedIn } = useSelector(state => state.auth)
    const { currentUserData } = useSelector(state => state.user)
    const [isShow, setIsShow] = useState(false)
    const ref = useRef()
    const goLogin = useCallback(() => {
        navigate(path.LOGIN)
    })

    const goRegister = useCallback(() => {
        navigate(path.REGISTER)
    })

    const logout = useCallback(() => {
        setIsShow(false)
        dispatch(actions.logout())
        navigate(path.LOGIN)
    })

    useEffect(() => {
        ref.current.scrollIntoView({
            behavior: 'smooth',
            block: "start"
        })
    }, [page])

    return (
        <div ref={ref} className='max-w-1100 mx-auto flex items-center justify-between'>
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
            <div className='flex items-center gap-2 h-[40px]'>
                {
                    !isLoggedIn ? (
                        <>
                            <Button
                                text={'Đăng nhập'}
                                textStyle={'text-white text-sm font-semibold'}
                                bgColor={'bg-secondary1'}
                                onClick={goLogin}
                                hover={'hover:shadow-md'}
                            />
                            <Button
                                text={'Đăng ký'}
                                textStyle={'text-white text-sm font-semibold'}
                                bgColor={'bg-secondary1'}
                                onClick={goRegister}
                                hover={'hover:shadow-md'}
                            />
                        </>
                    ) : (
                        <div className='flex gap-4 items-center'>
                            <div className='h-[40px]'>
                                <User />
                            </div>
                            <div className='relative'>
                                <Button
                                    text={'Quản lý tài khoản'}
                                    textStyle={'text-white text-sm font-semibold'}
                                    bgColor={'bg-secondary1'}
                                    onClick={() => setIsShow(!isShow)}
                                    hover={'hover:shadow-md'}
                                    icAfter={<MdOutlineKeyboardArrowDown />}
                                />
                                {
                                    isShow && currentUserData?.role === 'user'
                                        ? (
                                            <div className='absolute left-0 top-full bg-white text-sm shadow-md rounded-md px-4 flex flex-col py-2'>
                                                {menuManage?.map(item => (
                                                    <Link
                                                        key={item.id}
                                                        to={item?.path}
                                                        className='py-[10px] text-primary flex gap-[10px] items-center border-b border-b-gray-200 whitespace-nowrap hover:text-orange '
                                                    >
                                                        {item?.icons}
                                                        {item?.text}
                                                    </Link>
                                                ))}
                                                <span
                                                    className='py-[10px] text-primary flex gap-[10px] items-center cursor-pointer hover:text-orange '
                                                    onClick={logout}
                                                >
                                                    <MdLogout size={16}></MdLogout>
                                                    Đăng xuất
                                                </span>
                                            </div>
                                        ) : isShow && currentUserData?.role === 'admin'
                                            ? (
                                                <div className='absolute left-0 top-full bg-white text-sm shadow-md rounded-md px-4 flex flex-col py-2'>
                                                    {menuAdmin?.map(item => (
                                                        <Link
                                                            key={item.id}
                                                            to={item?.path}
                                                            className='py-[10px] text-primary flex gap-[10px] items-center border-b border-b-gray-200 whitespace-nowrap hover:text-orange '
                                                        >
                                                            {item?.icons}
                                                            {item?.text}
                                                        </Link>
                                                    ))}
                                                    <span
                                                        className='py-[10px] text-primary flex gap-[10px] items-center cursor-pointer hover:text-orange '
                                                        onClick={logout}
                                                    >
                                                        <MdLogout size={16}></MdLogout>
                                                        Đăng xuất
                                                    </span>
                                                </div>
                                            )
                                            : (null)
                                }
                            </div>
                        </div>
                    )
                }
                <Button
                    text={'Đăng tin mới'}
                    textStyle={'text-white text-sm font-semibold'}
                    bgColor={'bg-secondary2'}
                    icAfter={<BsPlusCircle />}
                    hover={'hover:shadow-md'}
                />
            </div>
        </div>
    )
}

export default TopBar