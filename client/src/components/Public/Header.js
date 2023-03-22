import React, { useCallback, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { formatVietnameseToString } from '../../utils/fn';
import { useSelector } from 'react-redux';
import { path } from '../../utils/path';
import { Button } from './index'

const isActiveStyle = 'h-full  bg-secondary2 flex items-center px-3'
const isNotActiveStyle = 'h-full flex items-center px-3 hover:bg-secondary2'
const isActiveStyleRes = 'bg-[#f1f1f1] w-full py-2 px-3'
const isNotActiveStyleRes = 'w-full hover:bg-[#fafafa] py-2 px-3'


const Header = ({ isShowMenuRes, setIsShowMenuRes }) => {
    const { categories } = useSelector(state => state.app)
    const { currentUserData } = useSelector(state => state.user)
    const { isLoggedIn } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const headerRef = useRef()
    const menuRef = useRef()

    const addFixedToHeader = () => {
        if (window.scrollY > 70) {
            headerRef.current?.classList.add('fixed', 'top-0', 'left-0', 'right-0');
        } else {
            headerRef.current?.classList.remove('fixed', 'top-0', 'left-0', 'right-0')
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', addFixedToHeader);

        return () => {
            window.removeEventListener("scroll", addFixedToHeader);
        };
    }, [])

    const handleClickManage = () => {
        setIsShowMenuRes(false)
        if (isLoggedIn) {
            navigate(`/he-thong/${path.MANAGE_POST}`)
        } else {
            navigate(path.LOGIN)
        }
    }

    const handleClickProfile = () => {
        setIsShowMenuRes(false)
        if (isLoggedIn) {
            navigate(`/he-thong`)
        } else {
            navigate(path.LOGIN)
        }
    }

    const goLogin = useCallback(() => {
        setIsShowMenuRes(false)
        navigate(path.LOGIN)
    })

    const goRegister = useCallback(() => {
        setIsShowMenuRes(false)
        navigate(path.REGISTER)
    })


    return (
        <>
            <div
                className='w-full z-[1000] h-10 bg-secondary1 tablet:hidden phone:hidden'
                ref={headerRef}
            >
                <div className='max-w-1100 mx-auto h-full flex items-center text-white text-sm font-semibold'>
                    <NavLink
                        to={"/"}
                        className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                    >
                        Trang chủ
                    </NavLink>
                    {
                        categories?.length > 0 && categories?.map((item) => (
                            <div key={item.code} className="h-full" >
                                <NavLink
                                    to={formatVietnameseToString(item.value)}
                                    className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                                >
                                    {item.value}
                                </NavLink>
                            </div>
                        ))
                    }
                    <NavLink
                        to={`/${path.BLOG}`}
                        className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                    >
                        Blog
                    </NavLink>
                    <NavLink
                        to={`/${path.LIEN_HE}`}
                        className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                    >
                        Liên hệ
                    </NavLink>
                </div>
            </div>
            {
                isShowMenuRes && (
                    <div
                        className='w-full h-screen bg-overlay-3 absolute top-0 left-0 right-0 z-[9999] flex justify-end'
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsShowMenuRes(false)
                        }}
                    >
                        <div className='w-[300px] h-full flex flex-col bg-white items-center text-sm animate-slide-left overflow-auto'
                            ref={menuRef}
                            onClick={(e) => {
                                e.stopPropagation()
                            }}
                        >
                            <div className='w-full flex flex-col items-center gap-3 bg-[#3f51b5] p-5'>
                                {
                                    currentUserData && isLoggedIn ? (
                                        <>
                                            <div className='w-16 h-16'>
                                                <img className='w-full h-full rounded-full object-contain' src={currentUserData.avatar} />
                                            </div>
                                            <span className='text-sm text-white font-semibold'>
                                                {currentUserData?.name}
                                            </span>
                                            <span className='text-sm text-white'>
                                                {currentUserData?.phone}
                                            </span>
                                            <div className='w-full flex gap-2'>
                                                <Button
                                                    text={"Cá nhân"}
                                                    textStyle={'text-sm py-[5px]'}
                                                    bgColor={"bg-[#ffc107]"}
                                                    fullWidth
                                                    onClick={handleClickProfile}
                                                />
                                                <Button
                                                    text={"Quản lý tin"}
                                                    textStyle={'text-sm py-[5px]'}
                                                    bgColor={"bg-[#ffc107]"}
                                                    fullWidth
                                                    onClick={handleClickManage}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <span className='text-sm text-white'>
                                                Chào mừng đến với
                                                <span className='font-semibold ml-[5px]'>Phongtro123.com</span>
                                            </span>
                                            <div className='w-full flex gap-2'>
                                                <Button
                                                    text={"Đăng nhập"}
                                                    textStyle={'text-sm py-[5px]'}
                                                    bgColor={"bg-[#ffc107]"}
                                                    fullWidth
                                                    onClick={goLogin}
                                                />
                                                <Button
                                                    text={"Đăng ký"}
                                                    textStyle={'text-sm py-[5px]'}
                                                    bgColor={"bg-[#ffc107]"}
                                                    fullWidth
                                                    onClick={goRegister}
                                                />
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                            <div className='w-full flex flex-col text-[#333333] py-5'>
                                <NavLink
                                    to={"/"}
                                    className={({ isActive }) => isActive ? isActiveStyleRes : isNotActiveStyleRes}
                                    onClick={() => setIsShowMenuRes(false)}
                                >
                                    Trang chủ
                                </NavLink>
                                {
                                    categories?.length > 0 && categories?.map((item) => (
                                        <NavLink
                                            key={item.code}
                                            onClick={() => setIsShowMenuRes(false)}
                                            to={formatVietnameseToString(item.value)}
                                            className={({ isActive }) => isActive ? isActiveStyleRes : isNotActiveStyleRes}
                                        >
                                            {item.value}
                                        </NavLink>
                                    ))
                                }
                                <NavLink
                                    to={`/${path.BLOG}`}
                                    onClick={() => setIsShowMenuRes(false)}
                                    className={({ isActive }) => isActive ? isActiveStyleRes : isNotActiveStyleRes}
                                >
                                    Blog
                                </NavLink>
                                <NavLink
                                    to={`/${path.LIEN_HE}`}
                                    onClick={() => setIsShowMenuRes(false)}
                                    className={({ isActive }) => isActive ? isActiveStyleRes : isNotActiveStyleRes}
                                >
                                    Liên hệ
                                </NavLink>
                            </div>

                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Header