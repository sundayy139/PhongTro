import React, { memo } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'

const PageNumber = ({ number, currentPage, icons, setCurrentPage, type }) => {
    const navigate = useNavigate()

    const handleChangePage = () => {
        if (number !== '...') {
            setCurrentPage(number)
            navigate({
                pathname: '/',
                search: createSearchParams({
                    page: number,
                }).toString()
            })
        }
    }

    return (
        <div
            className={`w-[50px] h-[50px] text-sm rounded-md ${number !== '...' ? 'cursor-pointer' : ''} flex items-center justify-center ${+currentPage === +number ? 'text-white bg-[#e13427]' : 'bg-white hover:bg-[#ddd]'}`}
            onClick={handleChangePage}
        >
            {icons || number}
        </div>
    )
}

export default memo(PageNumber)