import React, { memo } from 'react';


const Button = ({ text, textStyle, bgColor, icAfter, icBefore, onClick, fulWidth, hover }) => {
    return (
        <button
            type='button'
            className={`h-full whitespace-nowrap py-[10px] px-4 ${textStyle} ${bgColor} rounded-md outline-none ${hover} flex gap-2 items-center justify-center ${fulWidth && 'w-full'}`}
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