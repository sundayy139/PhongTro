import React, { memo } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { path } from '../../utils/path';

const ProvinceButton = ({ name, image, provinceCode, categoryCode }) => {

    const navigate = useNavigate()

    const handleSearch = () => {
        let titleSearch = name

        navigate({
            pathname: `/${path.SEARCH}`,
            search: createSearchParams({ provinceCode: provinceCode, categoryCode: categoryCode }).toString(),
        }, { state: { titleSearch } })
    }

    return (
        <div
            className='rounded-[10px] overflow-hidden shadow-md bg-white flex flex-col cursor-pointer  text-primary hover:text-orange'
            onClick={handleSearch}
        >
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