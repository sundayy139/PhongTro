import React from 'react'

const InputDisable = ({ label, value, isRow }) => {
    return (
        <div className={isRow ? "flex items-center w-full text-sm whitespace-nowrap" : "flex flex-col gap-2 w-full text-sm"}>
            <label
                htmlFor=""
                className='font-semibold  w-[200px] flex-none'>
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