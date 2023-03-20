import React, { useCallback } from 'react'
import { Helmet } from 'react-helmet';
import { BreadCrumb } from '../../components/System'
import logo from '../../assets/image/homestay.png';
import { menuManageSystem } from '../../utils/constant';
import { Link, useNavigate } from 'react-router-dom';
import icons from '../../utils/icons';
import { path } from '../../utils/path';
import Swal from 'sweetalert2';
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux';
import logoutIcon from '../../assets/icon/logout.png'
import { getNumberFromString } from '../../utils/fn';

const { GrNext, MdLogout } = icons

const title = 'Quản lý - Phòng trọ';
const ManagePage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUserData } = useSelector(state => state.user)
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
        <div className='pc:px-8 pc:py-4 laptop:px-8 laptop:py-4 phone:px-[10px] tablet:px-[10px]'>
            <Helmet>
                <title>{title}</title>
                <link rel="icon" href={logo} />
            </Helmet>
            <div className='phone:hidden tablet:hidden'>
                <BreadCrumb
                    items={items}
                />
            </div>
            <div className='my-4'>
                <div className='pc:hidden laptop:hidden flex flex-col gap-4 mb-4'>
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
                    className='bg-[#dc3545] inline-block text-center text-sm text-white p-2 w-full rounded-[5px]'
                >
                    Đăng tin mới
                </Link>
                <div className='pc:border laptop:border mt-4 phone:bg-white phone:rounded-[5px]'>
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
                    <span
                        className='p-4 text-sm flex items-center justify-between border-b last:border-none cursor-pointer'
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