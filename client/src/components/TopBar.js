import React, { useCallback, useEffect, useRef } from 'react';
import logo from '../assets/image/logo-phongtro.svg'
import { Button } from './index';
import icons from '../utils/icons';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { path } from '../utils/path';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions'

const { BsPlusCircle } = icons

const TopBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    let page = searchParams.get('page')
    const { isLoggedIn } = useSelector(state => state.auth)
    const ref = useRef()
    const goLogin = useCallback(() => {
        navigate(path.LOGIN)
    })

    const goRegister = useCallback(() => {
        navigate(path.REGISTER)
    })

    const logout = useCallback(() => {
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
                        <Button
                            text={'Đăng xuất'}
                            textStyle={'text-white text-sm font-semibold'}
                            bgColor={'bg-secondary1'}
                            onClick={logout}
                            hover={'hover:shadow-md'}
                        />
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