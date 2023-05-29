import React, { memo } from 'react'

const Select = ({ label, options, value, setValue, type, invalidFileds, setInvalidFileds, disabled }) => {

    const handleTextErr = () => {
        let invalidName = invalidFileds?.find(item => item.name === type)
        let invalidAddress = invalidFileds?.find(item => item.name === 'address')

        return `${invalidName ? invalidName.message : ''}` || `${invalidAddress ? invalidAddress.message : ''}`
    }

    return (
        <div className='flex flex-col gap-2 w-full text-sm'>
            <label htmlFor={type} className='font-semibold'>
                {label}
            </label>
            <select
                disabled={disabled ? true : false}
                value={value || ''}
                onChange={(e) => setValue(e.target.value)}
                id={type}
                className='outline-none border border-gray-300 p-2 rounded-[5px] phone:font-semibold phone:text-[#007aff] phone:bg-[#e7f0fe] tablet:font-semibold tablet:text-[#007aff] tablet:bg-[#e7f0fe]'
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
                                            : type === "categoryCode" || type === "target" || type === "type"
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
                                            : type === "categoryCode" || type === "target" || type === "type"
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
                                            : type === "categoryCode" || type === "target" || type === "type"
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

export default memo(Select)