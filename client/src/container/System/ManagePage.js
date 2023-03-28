import React, { useCallback } from 'react'
import { Helmet } from 'react-helmet';
import { BreadCrumb } from '../../components/System'
import logo from '../../assets/image/homestay.png';
import { menuManageAdmin, menuManageStatistic, menuManageSystem } from '../../utils/constant';
import { Link, useNavigate } from 'react-router-dom';
import icons from '../../utils/icons';
import { path } from '../../utils/path';
import Swal from 'sweetalert2';
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux';
import logoutIcon from '../../assets/icon/logout.png'
import { getNumberFromString } from '../../utils/fn';
import { BottomBar } from '../../components/Public';

const { GrNext, MdLogout } = icons

const title = 'Quản lý - Phòng trọ';
const ManagePage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUserData } = useSelector(state => state.user)
    const { isLoggedin } = useSelector(state => state.app)
    const items = [
        { title: 'Trang chủ', link: '/' },
        { title: 'Trang quản lý' },
    ];

    const logout = useCallback(() => {
        Swal.fire({
            title: 'Đăng xuất',
            text: 'Bạn có chắc muốn đăng xuất?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đăng xuất',
            cancelButtonText: 'Ở lại',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(actions.logout())
                navigate('/')
            }
        })

    })

    return (
        <div className='pc:px-8 pc:py-4 laptop:px-8 laptop:py-4 phone:px-[10px] tablet:px-[10px] relative'>
            <BottomBar />
            <Helmet>
                <title>{title}</title>
                <link rel="icon" href={logo} />
            </Helmet>
            <div className='phone:hidden tablet:hidden'>
                <BreadCrumb
                    items={items}
                />
            </div>
            <div className='phone:py-4 phone:mb-10 tablet:mb-10 tablet:py-4'>
                <div className='pc:hidden laptop:hidden flex flex-col gap-4 mb-4 '>
                    <div className='flex gap-5 items-center'>
                        <img src={currentUserData?.avatar} className='w-[45px] h-[45px] object-cover rounded-full' />
                        <strong className='text-[28px]'>{currentUserData?.name}</strong>
                    </div>
                    <div
                        className='w-1/2 px-4 py-3 flex flex-col text-white rounded-[5px] bg-gradient-to-tr from-[#004aba] via-[#00b1d0] to-[#a8eb12] cursor-pointer'
                        onClick={() => navigate(`/he-thong/${path.MANAGE_PROFILE}`)}
                    >
                        <span className='text-sm'>Mã thành viên</span>
                        <span className='text-[23px] font-bold'>
                            {getNumberFromString(currentUserData?.id)}
                        </span>
                    </div>
                </div>
                <Link
                    to={`/he-thong/${path.CREATE_POST}`}
                    className='bg-[#dc3545] inline-block text-center text-sm text-white p-2 w-full rounded-[5px] pc:my-4 laptop:my-4'
                >
                    Đăng tin mới
                </Link>
                <div className='flex flex-col gap-2 w-full'>
                    <div className='pc:border-t pc:border-l pc:border-r laptop:border-t laptop:border-l laptop:border-r mt-4 phone:bg-white phone:rounded-[5px] tablet:bg-white tablet:rounded-[5px]'>
                        {
                            currentUserData?.role === 'user' ? (
                                <div>
                                    {
                                        menuManageSystem.map(item => (
                                            <Link
                                                key={item.id}
                                                to={item.path}
                                                className='p-4 text-sm flex items-center justify-between border-b'
                                            >
                                                <span className='flex items-center gap-3'>
                                                    <img src={item.image} className='w-4 h-4' />
                                                    <span>
                                                        {item.text}
                                                    </span>
                                                </span>
                                                <GrNext size={16} />
                                            </Link>
                                        ))
                                    }
                                </div>
                            ) : currentUserData?.role === 'admin' ? (
                                <div>
                                    {
                                        menuManageSystem.map(item => (
                                            <Link
                                                key={item.id}
                                                to={item.path}
                                                className='p-4 text-sm flex items-center justify-between border-b'
                                            >
                                                <span className='flex items-center gap-3'>
                                                    <img src={item.image} className='w-4 h-4' />
                                                    <span>
                                                        {item.text}
                                                    </span>
                                                </span>
                                                <GrNext size={16} />
                                            </Link>
                                        ))
                                    }
                                </div>
                            ) : (
                                null
                            )
                        }

                    </div>
                    {
                        currentUserData?.role === 'admin' && (
                            <>
                                <div className='pc:border-t pc:border-l pc:border-r laptop:border-t laptop:border-l laptop:border-r phone:bg-white phone:rounded-[5px] tablet:bg-white tablet:rounded-[5px]'>
                                    {
                                        menuManageAdmin.map(item => (
                                            <Link
                                                key={item.id}
                                                to={item.path}
                                                className='p-4 text-sm flex items-center justify-between border-b'
                                            >
                                                <span className='flex items-center gap-3'>
                                                    <img src={item.image} className='w-4 h-4' />
                                                    <span>
                                                        {item.text}
                                                    </span>
                                                </span>
                                                <GrNext size={16} />
                                            </Link>
                                        ))
                                    }
                                </div>
                                <div className='pc:border-t pc:border-l pc:border-r laptop:border-t laptop:border-l laptop:border-r phone:bg-white phone:rounded-[5px] tablet:bg-white tablet:rounded-[5px]'>
                                    {
                                        menuManageStatistic.map(item => (
                                            <Link
                                                key={item.id}
                                                to={item.path}
                                                className='p-4 text-sm flex items-center justify-between border-b'
                                            >
                                                <span className='flex items-center gap-3'>
                                                    <img src={item.image} className='w-4 h-4' />
                                                    <span>
                                                        {item.text}
                                                    </span>
                                                </span>
                                                <GrNext size={16} />
                                            </Link>
                                        ))
                                    }
                                </div>
                            </>
                        )
                    }
                    <span
                        className='p-4 text-sm flex items-center justify-between border-b cursor-pointer pc:border laptop:border phone:bg-white phone:rounded-[5px] tablet:bg-white tablet:rounded-[5px]'
                        onClick={logout}
                    >
                        <span className='flex items-center gap-3'>
                            <img src={logoutIcon} className='w-4 h-4' />
                            <span>
                                Đăng xuất
                            </span>
                        </span>
                        <GrNext size={16} />
                    </span>
                </div>
            </div>
        </div >
    )
}

export default ManagePage