import React, { memo } from 'react'
import bgSupport from '../../assets/image/support-bg.jpg'
import { supportText } from '../../utils/constant'

const Contact = () => {
    return (
        <div className='w-full bg-white rounded-[55px] border-[7px] border-[#dedede] border-dashed pt-[40px] p-[70px] text-center text-[#333333]'>
            <img src={bgSupport} className='h-[150px] object-contain w-full' />
            <div className='w-full flex flex-col mt-[30px]'>
                <span className='text-sm mb-[20px]'>
                    {supportText.title}
                </span>
                <div className='flex items-center justify-evenly w-full'>
                    {
                        supportText.info.map((item, i) => (
                            <div key={i} className='flex flex-col gap-3'>
                                <span className='text-sm text-orange font-bold uppercase'>
                                    {item.name}
                                </span>
                                <a
                                    target='_blank'
                                    className='text-[21px] text-[#233762] font-bold'
                                    href={`tel:${item.phone}`}
                                >
                                    {`Điện thoại: ${item.phone}`}
                                </a>
                                <a
                                    target='_blank'
                                    href={`https://zalo.me/${item.phone}`}
                                    className='text-[21px] text-[#233762] font-bold'
                                >
                                    {`Zalo: ${item.phone}`}
                                </a>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default memo(Contact)