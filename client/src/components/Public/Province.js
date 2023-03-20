import React, { memo, useEffect, useState } from 'react'
import { ProvinceButton } from './index'
import { locationsCTCH, locationsCTPT, locationsCTMB, locationsTNOG, locationsNCT } from '../../utils/constant'
import { useLocation } from 'react-router-dom'
import { path } from '../../utils/path'


const Province = () => {
    const location = useLocation()
    const [locations, setLocations] = useState()

    useEffect(() => {
        if (location.pathname === `/${path.NHA_CHO_THUE}`) {
            setLocations(locationsNCT)
        }
        if (location.pathname === `/${path.CHO_THUE_CAN_HO}`) {
            setLocations(locationsCTCH)
        }

        if (location.pathname === `/${path.CHO_THUE_MAT_BANG}`) {
            setLocations(locationsCTMB)
        }
        if (location.pathname === `/${path.CHO_THUE_PHONG_TRO}` || location.pathname === '/') {
            setLocations(locationsCTPT)
        }
        if (location.pathname === `/${path.TIM_NGUOI_O_GHEP}`) {
            setLocations(locationsTNOG)
        }
    }, [location])

    return (
        <div className='w-full flex pc:gap-10 laptop:gap-10 items-center pc:justify-center laptop:justify-center phone:overflow-x-auto tablet:overflow-x-auto phone:gap-4 tablet:gap-4'>
            {
                locations?.map(item => (
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