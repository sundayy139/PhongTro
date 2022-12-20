import React, { memo } from 'react';


const Button = ({ text, textColor, bgColor, icAfter, icBefore, onClick, fulWidth }) => {
    return (
        <button
            type='button'
            className={`py-[10px] px-4 ${textColor} ${bgColor} text-sm font-semibold rounded-md outline-none hover:underline flex gap-2 items-center justify-center ${fulWidth && 'w-full'}`}
            onClick={onClick}
        >
            {
                icBefore && (
                    <span>
                        {icBefore}
                    </span>
                )
            }
            <span>
                {text}
            </span>
            {
                icAfter && (
                    <span>
                        {icAfter}
                    </span>
                )
            }
        </button>
    )
}

export default memo(Button)