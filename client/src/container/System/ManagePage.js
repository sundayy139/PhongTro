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
import { useDispatch } from 'react-redux';

const { GrNext, MdLogout } = icons

const title = 'Quản lý - Phòng trọ';
const ManagePage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                navigate(path.LOGIN)
            }
        })

    })

    return (
        <div className='px-8 py-4'>
            <Helmet>
                <title>{title}</title>
                <link rel="icon" href={logo} />
            </Helmet>
            <BreadCrumb
                items={items}
            />
            <div className='my-4'>
                <Link
                    to={`/he-thong/${path.CREATE_POST}`}
                    className='bg-[#dc3545] inline-block text-center text-sm text-white p-2 w-full rounded-[5px]'
                >
                    Đăng tin mới
                </Link>
                <div className='border mt-4'>
                    {
                        menuManageSystem.map(item => (
                            <Link
                                key={item.id}
                                to={item.path}
                                className='p-4 text-sm flex items-center justify-between border-b'
                            >
                                <span className='flex items-center gap-3'>
                                    {item.icons}
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
                            <MdLogout size={16} />
                            <span>
                                Đăng xuất
                            </span>
                        </span>
                        <GrNext size={16} />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ManagePage