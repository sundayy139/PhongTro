import React, { memo } from 'react'
import { ProvinceButton } from './index'
import { location } from '../../utils/constant'


const Province = () => {

    return (
        <div className='w-full flex pc:gap-10 laptop:gap-10 items-center pc:justify-center laptop:justify-center phone:overflow-x-auto tablet:overflow-x-auto phone:gap-4 tablet:gap-4'>
            {
                location.map(item => (
                    <ProvinceButton
                        key={item.id}
                        name={item.name}
                        province={item.province}
                        image={item.image}
                        provinceCode={item.provinceCode}
                        categoryCode={item.categoryCode}
                    />
                ))
            }
        </div>
    )
}

export default memo(Province)