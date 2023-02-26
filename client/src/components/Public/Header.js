import React from 'react';
import { NavLink } from 'react-router-dom';
import { formatVietnameseToString } from '../../utils/fn';
import { useSelector } from 'react-redux';
import { path } from '../../utils/path';

const isActiveStyle = 'h-full  bg-secondary2 flex items-center px-3'
const isNotActiveStyle = 'h-full flex items-center px-3 hover:bg-secondary2'

const Header = () => {
    const { categories } = useSelector(state => state.app)

    return (
        <div className='w-full h-10 bg-secondary1'>
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
                    to={`/${path.LIEN_HE}`}
                    className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                >
                    Liên hệ
                </NavLink>
            </div>
        </div>
    )
}

export default Header