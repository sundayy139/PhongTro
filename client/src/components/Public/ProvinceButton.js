import React, { memo } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { path } from '../../utils/path';

const ProvinceButton = ({ name, image, province, provinceCode, categoryCode }) => {

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
            className='rounded-[10px] flex-none overflow-hidden pc:shadow-md laptop:shadow-md pc:bg-white laptop:bg-white 
            flex pc:flex-col laptop:flex-col cursor-pointer pc:text-primary laptop:text-primary hover:text-orange
            phone:p-[10px] phone:bg-[#f5f5f5] phone:flex phone:gap-2 phone:items-center tablet:p-[10px] tablet:bg-[#f5f5f5] tablet:flex tablet:gap-2 tablet:items-center '
            onClick={handleSearch}
        >
            <img
                src={image}
                alt={name}
                className='pc:w-[190px] pc:h-[110px] laptop:w-[190px] laptop:h-[110px] 
                phone:w-[50px] phone:h-[50px] tablet:w-[50px] tablet:h-[50px] object-cover
                phone:rounded-full tablet:rounded-full'
            />
            <span className='pc:py-3 pc:px-[10px] laptop:py-3 laptop:px-[10px] text-sm pc:font-semibold laptop:font-semibold text-center phone:flex phone:flex-col phone:items-start tablet:flex tablet:flex-col tablet:items-start'>
                {name}
                <span className='pc:ml-1 laptop:ml-1 phone:font-bold tablet:font-bold'>
                    {province}
                </span>
            </span>
        </div>
    )
}

export default memo(ProvinceButton)