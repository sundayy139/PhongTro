import React, { memo } from 'react'
import { textIntro } from '../../utils/constant'
import icons from '../../utils/icons'
import { Button } from './index'

const { BsStarFill } = icons

const Intro = () => {
    return (
        <div className='w-full bg-white rounded-[10px] border border-[#dedede] pt-[40px] p-[70px] text-center text-[#333333]'>
            <h4 className='text-lg font-bold'>
                {textIntro.title}
            </h4>
            <p className='text-sm my-[14px]'>
                {textIntro.desc}
            </p>
            <div className='flex items-center  justify-evenly'>
                {textIntro?.statistic?.map((item, i) => (
                    <span key={i} className='flex flex-col gap-[5px]'>
                        <span className='text-[21px] font-bold'>
                            {item.value}
                        </span>
                        <span className='text-sm'>
                            {item.name}
                        </span>
                    </span>
                ))}
            </div>
            <br />
            <br />
            <h4 className='text-lg font-bold'>
                {textIntro.price}
            </h4>
            <span className='flex items-center justify-center text-yellow-300 my-3'>
                <BsStarFill size={20} />
                <BsStarFill size={20} />
                <BsStarFill size={20} />
                <BsStarFill size={20} />
                <BsStarFill size={20} />
            </span>
            <div className='flex flex-col gap-[14px] mb-[14px]'>
                <p className='text-sm italic'>
                    <q>
                        <i>
                            {textIntro.comment}
                        </i>
                    </q>
                </p>
                <span className='text-sm '>
                    {textIntro.author}
                </span>
            </div>
            <br />
            <br />
            <h4 className='text-lg font-bold'>
                {textIntro.question}
            </h4>
            <p className='text-sm my-[14px]'>
                {textIntro.answer}
            </p>
            <div className='w-full flex justify-center'>
                <div className='w-[150px]'>
                    <Button
                        text={"Đăng tin ngay"}
                        bgColor={"bg-secondary2"}
                        textStyle={'text-sm font-semibold text-white'}
                        hover={'shadow-md'}
                        fulWidth
                    />
                </div>
            </div>
        </div>
    )
}

export default memo(Intro)