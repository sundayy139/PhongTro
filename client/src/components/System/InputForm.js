import React from 'react';

const InputForm = ({ id, label, value, setValue, name, invalidFileds, setInvalidFileds, symbol, isRow }) => {
    return (
        <div className={isRow ? 'text-sm w-full flex whitespace-nowrap items-center' : "text-sm w-full flex flex-col gap-2"}>
            <label
                htmlFor={id}
                className='font-semibold w-[200px] flex-none'
            >
                {label}
            </label>
            <div className='w-full mt-1 relative'>
                <div className='relative'>
                    <input
                        type={name === 'priceNumber' || name === 'acreageNumber' || name === 'expired'
                            ? 'number'
                            : name === 'oldPassword' || name === 'newPassword' || name === 'confirmPassword'
                                ? 'password'
                                : 'text'
                        }
                        min={0}
                        value={value || ""}
                        id={id}
                        className='outline-none border border-gray-300 p-2 rounded-[5px] w-full'
                        onChange={(e) => setValue(prev => ({ ...prev, [name]: e.target.value }))}
                        onFocus={() => setInvalidFileds([])}
                    />
                    {
                        symbol && (
                            <span className='absolute top-0 right-0 bottom-0 px-2 bg-gray-200 rounded-r-[5px] flex items-center justify-center  border-l-[2px] border-l-gray-300'>
                                {symbol}
                            </span>
                        )
                    }
                </div>
                {
                    invalidFileds?.length > 0 && invalidFileds?.some(item => item.name === name) && (
                        <small className='text-[10px] text-red-500'>
                            {
                                invalidFileds?.find(item => item.name === name)?.message
                            }
                        </small>
                    )
                }
            </div>
        </div>
    )
}

export default InputForm