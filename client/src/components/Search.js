import React from 'react'
import { SearchItem, Button } from './index';
import icons from '../utils/icons';

const { GrNext,
    BsSearch,
    IoLocationOutline,
    GiMoneyStack,
    TbVectorOff,
    HiOutlineBuildingOffice,
    FiDelete
} = icons

const Search = () => {
    return (
        <div className='w-full p-[10px] bg-[#febb02] rounded-[8px] flex items-center justify-between gap-2'>
            <SearchItem
                text={"Phòng trọ, nhà trọ"}
                icAfter={<FiDelete size={15} color='#777777' />}
                icBefore={<HiOutlineBuildingOffice size={15} color='#777777' />}
                styleText={'font-semibold text-black'}
            />
            <SearchItem
                text={"Toàn quốc"}
                icAfter={<GrNext size={15} color='#777777' />}
                icBefore={<IoLocationOutline size={15} color='#777777' />}
            />
            <SearchItem
                text={"Chọn giá"}
                icAfter={<GrNext size={15} color='#777777' />}
                icBefore={<GiMoneyStack size={15} color='#777777' />}
            />
            <SearchItem
                text={"Chọn diện tích"}
                icAfter={<GrNext size={15} color='#777777' />}
                icBefore={<TbVectorOff size={15} color='#777777' />}
            />
            <div className='w-full h-[35px]'>
                <Button
                    text={"Tìm kiếm"}
                    icBefore={<BsSearch />}
                    bgColor={"bg-secondary1"}
                    textStyle={'text-white text-sm font-semibold'}
                    fulWidth
                    hover={'hover:shadow-md'}
                />
            </div>
        </div>
    )
}

export default Search