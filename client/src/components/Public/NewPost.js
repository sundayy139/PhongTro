import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { NewPostItem } from './index'

const NewPost = ({ title, data }) => {
    const { isLoadingNewPosts } = useSelector(state => state.post)
    return (
        <div className='pc:p-5 pc:border pc:border-[#dedede] pc:rounded-[10px] laptop:p-5 laptop:border laptop:border-[#dedede] laptop:rounded-[10px] bg-white w-full text-[#333333]'>
            <h3 className='text-lg font-bold mb-2'>
                {title}
            </h3>
            <div className='flex pc:flex-col laptop:flex-col phone:gap-4 tablet:gap-4 phone:overflow-x-auto tablet:overflow-x-auto'>
                {
                    data && data?.length > 0 ? data?.map(item => (
                        <NewPostItem
                            key={item.id}
                            id={item.id}
                            img={JSON.parse(item?.imagesData?.images)[0]}
                            title={item.title}
                            price={item?.priceNumber}
                            address={`${item?.districtPostData?.value}, ${item?.provincePostData?.value}`}
                            createdAt={item?.createdAt}
                        />
                    )) : (
                        <NewPostItem
                            isLoading={isLoadingNewPosts}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default memo(NewPost)