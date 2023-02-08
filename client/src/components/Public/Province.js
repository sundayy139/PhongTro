import React, { memo } from 'react'
import { ProvinceButton } from './index'
import { location } from '../../utils/constant'


const Province = () => {
    return (
        <div className='flex gap-5 justify-center items-center'>
            {
                location.map(item => (
                    <ProvinceButton
                        key={item.id}
                        name={item.name}
                        image={item.image}
                    />
                ))
            }
        </div>
    )
}

export default memo(Province)