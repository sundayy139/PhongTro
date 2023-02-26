import React, { memo } from 'react'

const SelectAddress = ({ label, options, value, setValue, type, invalidFileds, setInvalidFileds }) => {

    const handleTextErr = () => {
        let invalidName = invalidFileds?.find(item => item.name === type)
        let invalidAddress = invalidFileds?.find(item => item.name === 'address')

        return `${invalidName ? invalidName.message : ''}` || `${invalidAddress ? invalidAddress.message : ''}`
    }

    return (
        <div className='flex flex-col gap-2 w-full text-sm'>
            <label htmlFor='select-address' className='font-semibold'>
                {label}
            </label>
            <select
                value={value || ''}
                onChange={(e) => setValue(e.target.value)}
                id='select-address'
                className='outline-none border border-gray-300 p-2 rounded-[5px]'
                onFocus={() => setInvalidFileds([])}
            >
                <option
                    value=''
                >
                    {`-- Chọn ${label} --`}
                </option>
                {
                    options?.map(item => (
                        <option
                            key={
                                type === "province"
                                    ? item?.province_id
                                    : type === "district"
                                        ? item?.district_id
                                        : type === "ward"
                                            ? item?.ward_id
                                            : type === "categoryCode" || type === "target"
                                                ? item?.id
                                                : ''
                            }
                            value={
                                type === "province"
                                    ? item?.province_id
                                    : type === "district"
                                        ? item?.district_id
                                        : type === "ward"
                                            ? item?.ward_id
                                            : type === "categoryCode" || type === "target"
                                                ? item?.code
                                                : ''
                            }
                        >
                            {
                                type === "province"
                                    ? item?.province_name
                                    : type === "district"
                                        ? item?.district_name
                                        : type === "ward"
                                            ? item?.ward_name
                                            : type === "categoryCode" || type === "target"
                                                ? item?.value
                                                : ''
                            }
                        </option>
                    ))
                }
            </select>
            {
                invalidFileds && (
                    <small className='text-red-500 text-[10px]'>
                        {handleTextErr()}
                    </small>
                )
            }
        </div >
    )
}

export default memo(SelectAddress)