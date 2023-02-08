import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatVietnameseToString } from '../../utils/fn'


const Header = () => {
    const { categories } = useSelector(state => state.app)
    return (
        <div className='w-full bg-secondary1 px-4'>
            <div className='w-full h-full flex items-center text-white text-[16px] gap-4'>
                <div className='w-[224px] text-lg font-bold pl-4'>
                    Phongtro123.com
                </div>
                <Link
                    to={"/"}
                    className="px-2 py-4 hover:bg-secondary2"
                >
                    Trang chủ
                </Link>
                {
                    categories?.length > 0 && categories?.map((item) => (
                        <Link
                            key={item.code}
                            to={`/${formatVietnameseToString(item.value)}`}
                            className="px-2 py-4 hover:bg-secondary2"
                        >
                            {item.value}
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Header