import React, { useEffect } from 'react'
import { useState } from 'react'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { path } from '../../utils/path'

const AddressMenu = ({ address, name, paramsObj }) => {
    const [params, setParams] = useState({})
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        setParams(paramsObj)
    }, [paramsObj])

    const handleClick = (item) => {
        if (name === 'district') {
            let titleSearch = item.value + ', ' + location?.state?.titleSearch
            navigate({
                pathname: `/${path.SEARCH}`,
                search: createSearchParams({ ...params, districtCode: item.code }).toString(),
            }, { state: { titleSearch } })
        }
        if (name === 'ward') {
            let titleSearch = item.value + ', ' + location?.state?.titleSearch
            navigate({
                pathname: `/${path.SEARCH}`,
                search: createSearchParams({ ...params, wardCode: item.code }).toString(),
            }, { state: { titleSearch } })
        }
    }

    return (
        <div className='w-full h-full px-4 py-5 pc:border pc:border-[#dedede] pc:rounded-[5px] bg-white
         phone:flex phone:flex-col phone:gap-3 phone:px-4 phone:py-5 phone:border-t-[5px] phone:border-t-[#f5f5f5] phone:border-b-[5px] phone:border-b-[#f5f5f5]
        tablet:border-t-[5px] tablet:border-t-[#f5f5f5] tablet:border-b-[5px] tablet:border-b-[#f5f5f5] tablet:flex tablet:flex-col tablet:gap-3 tablet:px-4 tablet:py-5'>
            <span className='text-lg font-semibold pc:hidden laptop:hidden'>
                {
                    name === 'district' ? 'Xem theo quận huyện' : name === 'ward' ? 'Xem theo phường xã' : ''
                }
            </span>
            <div className='w-full h-full flex flex-wrap gap-3'>
                {
                    address?.map((item) => (
                        <div
                            key={item.code}
                            className='flex gap-1 flex-wrap items-center text-sm pc:min-w-[170px] laptop:min-w-[170px] phone:min-w-[120px]'
                        >
                            <span
                                className='text-primary cursor-pointer hover:text-orange'
                                onClick={() => handleClick(item)}
                            >
                                {item.value}
                            </span>
                            <span className='text-[#777777] phone:hidden tablet:hidden'>{`(${item.count})`}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default AddressMenu