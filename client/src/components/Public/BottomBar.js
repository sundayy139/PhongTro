import React from 'react'
import { Link } from 'react-router-dom'
import { menuBottomBar } from '../../utils/constant'


const BottomBar = () => {
    return (
        <div className='fixed bottom-0 left-0 right-0 h-[50px] bg-white shadow-custom z-[9999] flex items-center justify-evenly pc:hidden laptop:hidden'>
            {
                menuBottomBar.map(item => (
                    <Link
                        key={item.id}
                        className={`flex flex-col items-center gap-[2px] text-[#333333] justify-center ${item.isPrimary && 'bg-[#ffba00] w-[60px] h-[60px] rounded-full font-semibold'}`}
                        to={item.path}
                    >
                        <div className='w-5 h-5'>
                            <img src={item.image} className='w-full h-full object-cover' />
                        </div>
                        <span className='text-xs'>
                            {item.text}
                        </span>
                    </Link>
                ))
            }
        </div>
    )
}

export default BottomBar