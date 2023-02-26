import React, { memo } from 'react';


const Button = ({ text, textStyle, bgColor, onClick, fullWidth, hover }) => {
    return (
        <button
            type='button'
            className={`h-full whitespace-nowrap py-[10px] px-4 ${textStyle} ${bgColor} rounded-md outline-none ${hover} flex gap-2 items-center justify-center ${fullWidth && 'w-full'}`}
            onClick={onClick}
        >
            <span>
                {text}
            </span>
        </button>
    )
}

export default memo(Button)