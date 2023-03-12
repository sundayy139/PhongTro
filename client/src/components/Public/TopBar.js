import React, { useCallback, useEffect, useRef, useState } from 'react';
import logo from '../../assets/image/logo-phongtro.svg'
import { Button, User } from './index';
import icons from '../../utils/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { path } from '../../utils/path';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions'
import { menuAdmin, menuManage } from '../../utils/constant';
import { Header } from './index'

const { BsPlusCircle, MdLogout, MdOutlineKeyboardArrowDown, RxHamburgerMenu } = icons

const TopBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation()
    const { isLoggedIn } = useSelector(state => state.auth)
    const { currentUserData } = useSelector(state => state.user)
    const [isShow, setIsShow] = useState(false)
    const [isShowMenuRes, setIsShowMenuRes] = useState(false)
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
    }, [location])

    const handleClick = () => {
        if (isLoggedIn) {
            navigate(`he-thong/${path.CREATE_POST}`)
        } else {
            navigate(path.LOGIN)
        }
    }

    return (
        <div
            ref={ref}
            className='pc:max-w-1100 laptop:max-w-1100 phone:w-full tablet:w-full tablet:px-4 phone:px-4 mx-auto flex items-center justify-between  phone:shadow-md tablet:shadow-md tablet:fixed phone:fixed top-0 left-0 phone:bg-white tablet:bg-white z-[1000]'
        >
            <Link
                to={'/'}
                className='pc:w-[240px] pc:h-[70px] laptop:w-[240px] laptop:h-[70px] tablet:w-[150px] tablet:h-[50px] phone:w-[150px] phone:h-[50px] '
            >
                <img
                    src={logo}
                    alt="logo"
                    className='w-full h-full object-contain'
                />
            </Link>
            <div className='flex items-center gap-2 h-[40px] cursor-pointer pc:hidden laptop:hidden'>
                <span className='flex items-center gap-2'
                    onClick={() => setIsShowMenuRes(true)}
                >
                    <RxHamburgerMenu size={30} />
                    <span>
                        Danh mục
                    </span>
                </span>
            </div>
            <div className='pc:flex laptop:flex  items-center gap-2 h-[40px] phone:hidden tablet:hidden '>
                {
                    !isLoggedIn ? (
                        <>
                            <Button
                                text={'Đăng nhập'}
                                textStyle={'text-white text-sm font-semibold py-[10px]'}
                                bgColor={'bg-secondary1'}
                                onClick={goLogin}
                                hover={'hover:shadow-md'}
                            />
                            <Button
                                text={'Đăng ký'}
                                textStyle={'text-white text-sm font-semibold py-[10px]'}
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
                                    textStyle={'text-white text-sm font-semibold py-[10px]'}
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
                    textStyle={'text-white text-sm font-semibold py-[10px]'}
                    bgColor={'bg-secondary2'}
                    icAfter={<BsPlusCircle size={15} />}
                    hover={'hover:shadow-md'}
                    onClick={handleClick}
                />
            </div>
            {
                isShowMenuRes && (
                    <Header
                        isShowMenuRes={isShowMenuRes}
                        setIsShowMenuRes={setIsShowMenuRes}
                    />
                )
            }
        </div>
    )
}

export default TopBar