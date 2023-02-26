import React from 'react'
import { useSelector } from 'react-redux'
import { SidebarItem, ReleasePost } from './index'
const Sidebar = () => {
    const { categories, prices, acreages } = useSelector(state => state.app)
    const { newPosts } = useSelector(state => state.post)

    return (
        <div className='w-full flex flex-col  gap-5'>
            <SidebarItem content={categories} type="categoryCode" title="Danh mục cho thuê" />
            <SidebarItem double={true} type="priceCode" content={prices} title="Xem theo giá" />
            <SidebarItem double={true} type="acreageCode" content={acreages} title="Xem theo diện tích" />
            <ReleasePost
                title={'Tin mới đăng'}
                data={newPosts}
            />
        </div>
    )
}

export default Sidebar