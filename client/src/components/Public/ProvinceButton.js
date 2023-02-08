import React, { memo } from 'react';

const ProvinceButton = ({ name, image }) => {
    return (
        <div className='rounded-[10px] overflow-hidden shadow-md bg-white flex flex-col cursor-pointer  text-primary hover:text-orange'>
            <img
                src={image}
                alt={name}
                className='w-[190px] h-[110px] object-cover'
            />
            <span className='py-3 px-[10px] text-sm font-semibold text-center'>
                {name}
            </span>
        </div>
    )
}

export default memo(ProvinceButton)