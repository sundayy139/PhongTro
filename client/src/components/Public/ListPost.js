import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ListPostItem } from './index'
import * as actions from '../../store/actions'
import { useSearchParams } from 'react-router-dom'
import notFound from '../../assets/image/not-found.png'
import moment from 'moment'

const List = ({ categoryCode }) => {
    const dispatch = useDispatch();
    const [paramsSearch] = useSearchParams()
    const { posts } = useSelector(state => state.post)
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

        dispatch(actions.getPostsLimit(searchParamsQuery))
    }, [paramsSearch, categoryCode, sort])

    return (
        <div className='w-full border border-[#dedede] bg-white rounded-[10px]' >
            <div className='flex flex-col gap-5 p-5'>
                <div className='flex justify-between items-center'>
                    <h4 className='text-[18px] font-bold'>Danh sách tin đăng</h4>
                    <span className='text-sm'>{`Cập nhật: ${moment(moment(Date.now())).local().format('HH:mm DD/MM/YYYY')}`}</span>
                </div>
                <div className=' w-full flex items-center gap-3 h-[30px]'>
                    <span className='text-[13px]'>Sắp xếp:</span>
                    <span
                        className={`h-full text-[13px] flex items-center hover:underline px-2 text-[#333333] hover:bg-[#e7f0f7] rounded-[5px] bg-[#f5f5f5] cursor-pointer ${sort === 0 ? 'bg-bg-[#e7f0f7] underline' : ''}`}
                        onClick={() => setSort(0)}
                    >
                        Mặc định
                    </span>
                    <span
                        className={`h-full text-[13px] flex items-center hover:underline px-2 text-[#333333] hover:bg-[#e7f0f7] rounded-[5px] bg-[#f5f5f5] cursor-pointer ${sort === 1 ? 'bg-bg-[#e7f0f7] underline' : ''}`}
                        onClick={() => setSort(1)}
                    >
                        Mới nhất
                    </span>
                </div>
            </div>
            <div className='flex flex-col w-full'>
                {
                    posts && posts?.length > 0 ? posts.map(item => (
                        <ListPostItem
                            key={item.id}
                            id={item?.id}
                            images={JSON.parse(item?.imagesData?.images)}
                            acreage={item?.acreageNumber}
                            price={item?.priceNumber}
                            // description={JSON.parse(item?.description)}
                            description={item?.description}
                            address={item?.address}
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

export default List