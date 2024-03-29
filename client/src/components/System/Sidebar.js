import React, { useCallback } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { menuManageSidebar, menuManageSidebarAdmin } from '../../utils/constant'
import * as actions from '../../store/actions'
import { User } from './index'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import logoutIc from '../../assets/icon/logout.png'


const isActiveStyle = 'flex items-center  font-semibold py-2 hover:bg-[#f1f1f1] px-[10px] gap-3 text-sm'
const isNotActiveStyle = 'flex items-center hover:bg-[#f1f1f1] py-2 px-[10px] gap-3  text-sm '

const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUserData } = useSelector(state => state.user)

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
        <div className='w-full bg-[#f8f9fa] h-full p-4 flex flex-col gap-10 text-[16px] border-r border-gray-300 text-[#333] overflow-auto'>
            <User />
            <div className='flex flex-col gap-3'>
                {
                    menuManageSidebar.map(item => (
                        <NavLink
                            key={item.id}
                            to={item.path}
                            className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                        >
                            <img src={item.images} className='w-4 h-4 object-contain' />
                            <span>
                                {item.text}
                            </span>
                        </NavLink>
                    ))
                }
                {
                    currentUserData?.role === 'admin' && (
                        <div className='text-sm font-bold uppercase mt-4'>
                            Admin
                        </div>
                    )
                }
                {
                    currentUserData?.role === 'admin' && (
                        menuManageSidebarAdmin.map(item => (
                            <NavLink
                                key={item.id}
                                to={item.path}
                                className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                            >
                                <img src={item.images} className='w-4 h-4 object-contain' />
                                <span>
                                    {item.text}
                                </span>
                            </NavLink>
                        ))
                    )
                }
                <span
                    className='flex py-2 px-[10px] text-sm gap-3 items-center cursor-pointer hover:bg-[#f1f1f1]'
                    onClick={logout}
                >
                    <img src={logoutIc} className='w-4 h-4 object-contain' />
                    Đăng xuất
                </span>
            </div>
        </div>
    )
}

export default Sidebar