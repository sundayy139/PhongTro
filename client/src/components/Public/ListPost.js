import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ListPostItem } from './index'
import * as actions from '../../store/actions'
import { useSearchParams } from 'react-router-dom'
import notFound from '../../assets/image/not-found.png'
import moment from 'moment'

const ListPost = ({ categoryCode, isHideSort, favouritePost }) => {
    const dispatch = useDispatch();
    const [paramsSearch, setParamsSearch] = useSearchParams()
    const { posts, isLoadingPosts } = useSelector(state => state.post)
    const [sort, setSort] = useState(0)
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
        if (sort === 1) searchParamsQuery.order = ['createdAt', 'DESC']
        if (favouritePost) searchParamsQuery.id = favouritePost

        favouritePost ? dispatch(actions.getPostById(searchParamsQuery)) : dispatch(actions.getPostsLimit(searchParamsQuery))
    }, [paramsSearch, categoryCode, sort, favouritePost])

    return (
        <div className='w-full pc:border pc:border-[#dedede] pc:rounded-[10px] laptop:border laptop:border-[#dedede] laptop:rounded-[10px] bg-white' >
            <div className='flex flex-col pc:gap-5 pc:p-5 laptop:gap-5 laptop:p-5 phone:gap-3 tablet:gap-3'>
                <div className='flex justify-between items-center phone:px-4 tablet:px-4'>
                    <h4 className='text-[18px] font-bold'>Danh sách tin đăng</h4>
                    <span className='text-sm phone:hidden tablet:hidden'>{`Cập nhật: ${moment(moment(Date.now())).local().format('HH:mm DD/MM/YYYY')}`}</span>
                </div>
                {
                    !isHideSort && (
                        <div className=' w-full flex items-center gap-3 h-[35px] phone:bg-primary phone:px-4 tablet:bg-primary tablet:px-4'>
                            <span className='text-[13px]'>Sắp xếp:</span>
                            <span
                                className={`h-full text-[13px] flex items-center hover:underline px-2 text-[#333333] hover:bg-[#e7f0f7] rounded-[5px] bg-[#f5f5f5] cursor-pointer ${sort === 0 ? 'underline phone:font-semibold tablet:font-semibold' : ''}`}
                                onClick={() => setSort(0)}
                            >
                                Mặc định
                            </span>
                            <span
                                className={`h-full text-[13px] flex items-center hover:underline px-2 text-[#333333] hover:bg-[#e7f0f7] rounded-[5px] bg-[#f5f5f5] cursor-pointer ${sort === 1 ? 'underline phone:font-semibold tablet:font-semibold' : ''}`}
                                onClick={() => setSort(1)}
                            >
                                Mới nhất
                            </span>
                        </div>
                    )
                }
            </div>
            <div className='flex flex-col w-full phone:gap-2 phone:bg-[#f0f0f0] tablet:gap-2 tablet:bg-[#f0f0f0]'>
                {
                    posts && posts?.length > 0 ? posts?.map(item => (
                        <ListPostItem
                            key={item.id}
                            id={item?.id}
                            order={item.order}
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
                        : !isLoadingPosts
                            ? (
                                <div className='w-full h-full p-10 border-t border-gray-300'>
                                    <div className='w-1/2 m-auto'>
                                        <img
                                            src={notFound}
                                            className='w-full h-full object-contain'
                                        />
                                    </div>
                                </div>
                            ) : (
                                <ListPostItem
                                    isLoading={isLoadingPosts}
                                />
                            )
                }
            </div>
        </div >
    )
}

export default ListPost