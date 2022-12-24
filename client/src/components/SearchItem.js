import React, { memo } from 'react'

const SearchItem = ({ icBefore, icAfter, text, styleText }) => {
    return (
        <div className='bg-white h-full w-full p-2 rounded-md text-[#777777] text-xs flex justify-between items-center whitespace-nowrap'>
            <div className='flex items-center gap-2'>
                {
                    icBefore && (
                        <span>
                            {icBefore}
                        </span>
                    )
                }
                <span className={`${styleText}`}>
                    {text}
                </span>
            </div>
            {
                icAfter && (
                    <span>
                        {icAfter}
                    </span>
                )
            }
        </div>
    )
}

export default memo(SearchItem)