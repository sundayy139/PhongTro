import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import bgSupport from '../../assets/image/support-bg.jpg'
import { supportText } from '../../utils/constant'
import { path } from '../../utils/path'
import { Button } from './index'

const Contact = () => {
    const navigate = useNavigate()
    return (
        <div className='w-full bg-white pc:rounded-[10px] pc:border-[7px] pc:border-[#dedede] pc:border-dashed pc:pt-[40px] pc:p-[70px] pc:text-center laptop:rounded-[10px] laptop:border-[7px] laptop:border-[#dedede] laptop:border-dashed laptop:pt-[40px] laptop:p-[70px] laptop:text-center text-[#333333]
        phone:px-4 phone:py-10 tablet:px-4 tablet:py-10'>
            <img src={bgSupport} className='h-[150px] object-contain w-full' />
            <div className='w-full flex flex-col mt-[30px]'>
                <span className='text-sm mb-[20px]'>
                    {supportText.title}
                </span>
                <div className='flex pc:items-center pc:justify-evenly laptop:items-center laptop:justify-evenly w-full phone:flex-wrap tablet:flex-wrap'>
                    {
                        supportText.info.map((item, i) => (
                            <div key={i} className='flex flex-col pc:w-full laptop:w-full gap-2 text-left phone:w-1/2 phone:flex-none phone:pr-4 phone:pb-4 tablet:pr-4 tablet:pb-4'>
                                <span className='text-sm text-orange font-bold uppercase'>
                                    {item.name}
                                </span>
                                <a
                                    target='_blank'
                                    className='pc:text-[21px] laptop:text-[21px] phone:text-sm tablet:text-sm text-[#233762] font-bold'
                                    href={`tel:${item.phone}`}
                                >
                                    {`Điện thoại: ${item.phone}`}
                                </a>
                                <a
                                    target='_blank'
                                    href={`https://zalo.me/${item.phone}`}
                                    className='pc:text-[21px] laptop:text-[21px] phone:text-sm tablet:text-sm text-[#233762] font-bold'
                                >
                                    {`Zalo: ${item.phone}`}
                                </a>
                            </div>
                        ))
                    }
                </div>
                <div className='flex items-center justify-center mt-9'>
                    <div className='w-[150px] '>
                        <Button
                            text={"Gửi liên hệ"}
                            textStyle={'text-white text-sm font-semibold py-[10px]'}
                            bgColor={"bg-secondary1"}
                            fullWidth
                            onClick={() => navigate(`/${path.LIEN_HE}`)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Contact)