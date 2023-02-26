import React, { memo } from 'react'
import { ReleasePostItem } from './index'

const ReleasePost = ({ title, data }) => {
    return (
        <div className='p-5 border border-[#dedede] rounded-[10px] bg-white w-full text-[#333333]'>
            <h3 className='text-lg font-bold mb-2'>
                {title}
            </h3>
            <div className='flex flex-col'>
                {data && data?.map(item => (
                    <ReleasePostItem
                        key={item.id}
                        id={item.id}
                        img={JSON.parse(item?.imagesData?.images)[0]}
                        title={item.title}
                        price={item?.attributesData?.price}
                        createdAt={item?.createdAt}
                    />
                ))}
            </div>
        </div>
    )
}

export default memo(ReleasePost)