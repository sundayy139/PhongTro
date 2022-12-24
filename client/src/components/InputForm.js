import React, { useState } from 'react';
import icons from '../utils/icons';

const {
    BsEyeSlash,
    BsEye
} = icons

const InputForm = ({ label, value, setValue, type, invalidFileds, setInvalidFileds }) => {
    const [isShow, setIsShow] = useState(false)
    return (
        <div>
            <label
                htmlFor='phone'
                className='text-xs uppercase'
            >
                {label}
            </label>
            <div className='w-full mt-1 relative'>
                <input
                    type={type === 'password' && !isShow ? 'password' : 'text'}
                    value={value}
                    id='phone'
                    className='outline-none bg-[#e8f0fe] w-full h-[45px] p-[10px] rounded-md font-semibold text-[16px]'
                    onChange={(e) => setValue(prev => ({ ...prev, [type]: e.target.value }))}
                    onFocus={() => setInvalidFileds([])}
                />
                {
                    invalidFileds?.length > 0 && invalidFileds?.some(item => item.name === type) && (
                        <small className='text-[10px] text-red-500'>
                            {
                                invalidFileds?.find(item => item.name === type)?.message
                            }
                        </small>
                    )
                }
                {
                    type === 'password' && (
                        <span
                            className='absolute top-[13px] right-5 text-[12px] z-20 cursor-pointer text-primary hover:text-orange'
                            onClick={() => setIsShow(!isShow)}
                        >
                            {
                                isShow ? (
                                    <BsEye size={15} />
                                ) : (
                                    <BsEyeSlash size={15} />
                                )
                            }
                        </span>
                    )
                }
            </div>
        </div>
    )
}

export default InputForm