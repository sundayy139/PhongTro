import React from 'react'
import { useSelector } from 'react-redux'
import { SidebarItem } from './index'

const Sidebar = () => {
    const { categories, prices, acreages } = useSelector(state => state.app)
    return (
        <div className='w-full flex flex-col  gap-5'>
            <SidebarItem content={categories} title="Danh mục cho thuê" />
            <SidebarItem double={true} content={prices} title="Xem theo giá" />
            <SidebarItem double={true} content={acreages} title="Xem theo diện tích" />
        </div>
    )
}

export default Sidebar