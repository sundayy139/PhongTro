import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RelatePostItem } from './index'
import * as actions from '../../store/actions'
import notFound from '../../assets/image/not-found.png'

const ReleasePost = () => {
    const dispatch = useDispatch();
    const { relatePosts, posts, isLoadingRelatePosts } = useSelector(state => state.post)
    useEffect(() => {
        dispatch(actions.getPostsReleaseLimit({ categoryCode: posts[0]?.categoryCode, districtCode: posts[0]?.districtPostData.code, provinceCode: posts[0]?.provincePostData.code }))
    }, [posts])

    return (
        <div className='w-full pc:border pc:border-[#dedede] pc:rounded-[10px] laptop:border laptop:border-[#dedede] laptop:rounded-[10px] bg-white px-4 py-5' >
            <h3 className='text-xl font-semibold mb-2'>
                {`${relatePosts[0]?.categoryData?.value} ${relatePosts[0]?.districtPostData?.value}, ${relatePosts[0]?.provincePostData?.value}`}
            </h3>
            <div className='flex w-full pc:flex-col laptop:flex-col phone:gap-4 tablet:gap-4 phone:overflow-x-auto tablet:overflow-x-auto'>
                {
                    relatePosts && relatePosts?.length > 0 ? relatePosts.map(item => (
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
                            <RelatePostItem
                                isLoading={isLoadingRelatePosts}
                            />
                        )
                }
            </div>
        </div >
    )
}

export default ReleasePost