import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RelatePostItem } from './index'
import * as actions from '../../store/actions'
import { useSearchParams } from 'react-router-dom'
import notFound from '../../assets/image/not-found.png'

const ReleasePost = ({ categoryCode }) => {
    const dispatch = useDispatch();
    const [paramsSearch] = useSearchParams()
    const { posts } = useSelector(state => state.post)
    useEffect(() => {
        let params = []
        for (let entry of paramsSearch.entries()) {
            params.push(entry)
        }

        let searchParamsQuery = {}
        params.forEach(i => {
            if (Object.keys(searchParamsQuery)?.some(item => item === i[0])) {
                searchParamsQuery[i[0]] = [...searchParamsQuery[i[0]], i[1]]
            } else {
                searchParamsQuery = { ...searchParamsQuery, [i[0]]: [i[1]] }
            }
        })

        if (categoryCode) searchParamsQuery.categoryCode = categoryCode

        dispatch(actions.getPostsLimit(searchParamsQuery))
    }, [paramsSearch, categoryCode])

    return (
        <div className='w-full pc:border pc:border-[#dedede] pc:rounded-[10px] laptop:border laptop:border-[#dedede] laptop:rounded-[10px] bg-white px-4 py-5' >
            <h3 className='text-xl font-semibold mb-2'>
                {`${posts[0]?.categoryData?.value} ${posts[0]?.districtPostData?.value}, ${posts[0]?.provincePostData?.value}`}
            </h3>
            <div className='flex w-full pc:flex-col laptop:flex-col phone:gap-4 tablet:gap-4 phone:overflow-x-auto tablet:overflow-x-auto'>
                {
                    posts && posts?.length > 0 ? posts.map(item => (
                        <RelatePostItem
                            key={item.id}
                            id={item?.id}
                            images={JSON.parse(item?.imagesData?.images)}
                            acreage={item?.acreageNumber}
                            price={item?.priceNumber}
                            description={JSON.parse(item?.description)}
                            address={`${item?.districtPostData?.value}, ${item?.provincePostData?.value}`}
                            user={item?.userData}
                            title={item?.title}
                            createdAt={item?.createdAt}
                        />
                    ))
                        : (
                            <div className='w-full h-full p-10 border-t border-gray-300'>
                                <div className='w-1/2 m-auto'>
                                    <img
                                        src={notFound}
                                        className='w-full h-full object-contain'
                                    />
                                </div>
                            </div>
                        )
                }
            </div>
        </div >
    )
}

export default ReleasePost