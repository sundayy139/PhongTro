import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { textIntro } from '../../utils/constant'
import icons from '../../utils/icons'
import { path } from '../../utils/path'
import { Button } from './index'

const { BsStarFill } = icons

const Intro = () => {
    const navigate = useNavigate()
    const { isLoggedIn } = useSelector(state => state.auth)
    const handleClick = () => {
        if (!isLoggedIn) {
            navigate(`/${path.LOGIN}`)
        } else {
            navigate(`/he-thong/${path.CREATE_POST}`)
        }
    }
    return (
        <div className='w-full bg-white pc:rounded-[10px] pc:border pc:border-[#dedede] pc:pt-[40px] pc:p-[70px] pc:text-center laptop:rounded-[10px] laptop:border laptop:border-[#dedede] laptop:pt-[40px] laptop:p-[70px] laptop:text-center text-[#333333]
         phone:px-4 phone:py-10 tablet:px-4 tablet:py-10'>
            <h4 className='text-lg font-bold'>
                {textIntro.title}
            </h4>
            <p className='text-sm my-[14px]'>
                {textIntro.desc}
            </p>
            <div className='flex items-center pc:justify-evenly laptop:justify-evenly phone:flex-wrap phone:text-center tablet:flex-wrap tablet:text-center'>
                {textIntro?.statistic?.map((item, i) => (
                    <span key={i} className='flex flex-col gap-[5px] w-1/2'>
                        <span className='pc:text-[21px] laptop:text-[21px] font-bold phone:text-lg tablet:text-lg'>
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
            <h4 className='text-lg text-center font-bold'>
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
                        textStyle={'text-sm font-semibold text-white py-[10px]'}
                        hover={'shadow-md'}
                        fullWidth
                        onClick={handleClick}
                    />
                </div>
            </div>
        </div>
    )
}

export default memo(Intro)