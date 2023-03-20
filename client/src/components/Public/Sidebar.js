import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { SidebarItem, NewPost } from './index'
import * as apis from '../../services'


const Sidebar = ({ isHidePrice, isHideAcreage }) => {
    const { categories, prices, acreages } = useSelector(state => state.app)
    const { newPosts } = useSelector(state => state.post)
    const [data, setData] = useState()
    const [dataPosts, setDataPosts] = useState()

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await apis.apiGetPosts()
            if (res?.data?.err === 0) {
                setDataPosts(res.data.posts)
            }
        }
        fetchCategories()

    }, [])

    useEffect(() => {
        const results = categories?.map(smallObj => {
            const matchingObjs = dataPosts?.filter(
                bigObj =>
                    bigObj.categoryCode === smallObj.code
            );
            return {
                ...smallObj,
                count: matchingObjs?.length,
            };
        });

        setData(results)
    }, [categories, dataPosts])

    return (
        <div className='w-full flex flex-col  gap-5'>
            <SidebarItem content={data} type="categoryCode" title="Danh mục cho thuê" />
            {
                !isHidePrice && (
                    <SidebarItem double={true} type="priceCode" content={prices} title="Xem theo giá" />
                )
            }
            {
                !isHideAcreage && (
                    <SidebarItem double={true} type="acreageCode" content={acreages} title="Xem theo diện tích" />
                )
            }
            <NewPost
                title={'Tin mới đăng'}
                data={newPosts}
            />
        </div>
    )
}

export default Sidebar