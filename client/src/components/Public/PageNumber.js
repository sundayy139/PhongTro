import React, { memo } from 'react'
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

const PageNumber = ({ number, currentPage, icons, setCurrentPage, type }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [paramsSearch] = useSearchParams()

    let entries = paramsSearch.entries()

    const append = (entries) => {
        let params = []
        paramsSearch.append('page', +number)
        for (let entry of entries) {
            params.push(entry)
        }

        let searchParamsQuery = {}
        params.forEach(i => {
            if (Object.keys(searchParamsQuery)?.some(item => item === i[0] && item !== 'page')) {
                searchParamsQuery[i[0]] = [...searchParamsQuery[i[0]], i[1]]
            } else {
                searchParamsQuery = { ...searchParamsQuery, [i[0]]: [i[1]] }
            }
        })

        return searchParamsQuery
    }

    const handleChangePage = () => {
        if (number !== '...') {
            setCurrentPage(number)
            navigate({
                pathname: location?.pathname,
                search: createSearchParams(append(entries)).toString()
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