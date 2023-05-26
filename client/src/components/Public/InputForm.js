import React, { memo, useState } from 'react';
import icons from '../../utils/icons';

const {
    BsEyeSlash,
    BsEye
} = icons

const InputForm = ({ id, label, value, setValue, type, name, invalidFileds, setInvalidFileds }) => {
    const [isShow, setIsShow] = useState(false)
    return (
        <div>
            <label
                htmlFor={id}
                className='text-xs uppercase'
            >
                {label}
            </label>
            <div className='w-full mt-1 relative'>
                <input
                    type={type === 'password' && !isShow ? 'password' : 'text'}
                    value={value || ''}
                    id={id}
                    className='outline-none bg-[#e8f0fe] w-full h-[45px] p-[10px] rounded-md font-semibold text-[16px]'
                    onChange={(e) => setValue(prev => ({ ...prev, [name]: e.target.value }))}
                    onFocus={() => setInvalidFileds([])}
                />
                {
                    invalidFileds?.length > 0 && invalidFileds?.some(item => item.name === name) && (
                        <small className='text-[10px] text-red-500'>
                            {
                                invalidFileds?.find(item => item.name === name)?.message
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
                                    <BsEyeSlash size={15} />
                                ) : (
                                    <BsEye size={15} />
                                )
                            }
                        </span>
                    )
                }
            </div>
        </div>
    )
}

export default memo(InputForm)