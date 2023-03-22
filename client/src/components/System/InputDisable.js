import React from 'react'

const InputDisable = ({ label, value, isRow }) => {
    return (
        <div className={isRow ? "flex pc:items-center laptop:items-center w-full text-sm whitespace-nowrap phone:flex-col phone:gap-2 tablet:flex-col tablet:gap-2" : "flex flex-col gap-2 w-full text-sm"}>
            <label
                htmlFor=""
                className='font-semibold pc:w-[200px] pc:flex-none laptop:w-[200px] laptop:flex-none'>
                {label}
            </label>
            <input
                value={value || ""}
                type='text'
                disabled
                className='rounded-md p-2 bg-gray-200 border border-gray-300 w-full'
            />
        </div>
    )
}

export default InputDisable