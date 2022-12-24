import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Item } from './index'
import * as actions from '../store/actions'

const List = ({ page }) => {
    const dispatch = useDispatch();
    const { posts } = useSelector(state => state.post)
    useEffect(() => {
        let offset = page ? +page : 1
        dispatch(actions.getPostsLimit(offset))
    }, [page])


    return (
        <div className='w-full border border-[#dedede] bg-white rounded-[10px]' >
            <div className='flex flex-col gap-5 p-5'>
                <div className='flex justify-between items-center'>
                    <h4 className='text-[18px] font-bold'>Danh sách tin đăng</h4>
                    <span className='text-sm'>Cập nhật: 15:41 22/12/202</span>
                </div>
                <div className=' w-full flex items-center gap-3 h-[30px]'>
                    <span className='text-[13px]'>Sắp xếp:</span>
                    <span className='h-full'>
                        <Button
                            text={"Mặc định"}
                            bgColor={"bg-primary"}
                            textStyle={"text-[#333333] text-[13px]"}
                            hover={'hover:bg-[#e7f0f7]'}
                        />
                    </span>
                    <span className='h-full'>
                        <Button
                            text={"Mới nhất"}
                            bgColor={"bg-primary"}
                            textStyle={"text-[#333333] text-[13px]"}
                            hover={'hover:bg-[#e7f0f7]'}
                        />
                    </span>
                </div>
            </div>
            <div className='flex flex-col w-full'>
                {
                    posts && posts?.length > 0 && posts.map(item => (
                        <Item
                            key={item.id}
                            images={JSON.parse(item?.imagesData?.images)}
                            attributes={item?.attributesData}
                            description={JSON.parse(item?.description)}
                            address={item?.address}
                            star={+item?.star}
                            user={item?.userData}
                            title={item?.title}
                            id={item?.id}
                        />
                    ))
                }
            </div>
        </div >
    )
}

export default List