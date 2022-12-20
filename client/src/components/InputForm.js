import React from 'react'

const InputForm = ({ label }) => {
    return (
        <div>
            <label
                htmlFor='phone'
                className='text-xs uppercase'
            >
                {label}
            </label>
            <input type='text'
                id='phone'
                className='outline-none bg-[#e8f0fe] w-full h-[45px] p-[10px] rounded-md mt-1'
            />
        </div>
    )
}

export default InputForm