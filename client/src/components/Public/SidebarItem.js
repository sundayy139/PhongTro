import React, { memo } from 'react'
import icons from '../../utils/icons'
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { formatVietnameseToString } from '../../utils/fn'
import phongtro from '../../assets/icon/home.png'
import nhanguyencan from '../../assets/icon/villa.png'
import canho from '../../assets/icon/flat.png'
import matbang from '../../assets/icon/store.png'
import oghep from '../../assets/icon/group.png'
import { path } from '../../utils/path'
import { useDispatch } from 'react-redux'
import * as actions from '../../store/actions'

const { GrNext } = icons

const SidebarItem = ({ content, title, double, type }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const [paramsSearch] = useSearchParams()

    let entries = paramsSearch.entries()

    const append = (entries, type, code) => {
        let params = []
        paramsSearch.append(type, code)
        for (let entry of entries) {
            params.push(entry)
        }

        let searchParamsQuery = {}
        params.forEach(i => {
            if (Object.keys(searchParamsQuery)?.some(item => item === i[0] && item !== type)) {
                searchParamsQuery[i[0]] = [...searchParamsQuery[i[0]], i[1]]
            } else {
                searchParamsQuery = { ...searchParamsQuery, [i[0]]: [i[1]] }
            }
        })

        return searchParamsQuery
    }


    const handleFilter = (code) => {
        navigate({
            pathname: location?.pathname,
            search: createSearchParams(append(entries, type, code)).toString()
        })
    }

    const handleNavigate = (value) => {
        navigate(`/${formatVietnameseToString(value)}`)
    }

    const handleFilterLabel = (item) => {
        let titleSearch = item.value

        navigate({
            pathname: `/${path.SEARCH}`,
            search: createSearchParams({
                [type]: item.code,
            }).toString()
        }, { state: { titleSearch } })
        dispatch(actions.setSearchTitle(titleSearch))
    }

    return (
        <div className='pc:p-5 pc:border pc:border-[#dedede] pc:rounded-[10px] laptop:p-5 laptop:border laptop:border-[#dedede] laptop:rounded-[10px] bg-white w-full text-[#333333]'>
            <h3 className='text-lg font-bold mb-2'>
                {title}
            </h3>
            {
                !double && type === 'categoryCode' && (
                    <div className='flex flex-col gap-2'>
                        {
                            content?.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        type === 'categoryCode' ? handleNavigate(item.value) : handleFilter(item.code)
                                    }}
                                    className='w-full px-2 pc:py-[5px] pc:border-b pc:border-b-[#dedede] pc:border-dashed laptop:py-[5px] laptop:border-b laptop:border-b-[#dedede] laptop:border-dashed 
                                    flex items-center justify-between hover:text-orange cursor-pointer phone:bg-primary phone:rounded-[5px] phone:py-2 tablet:bg-primary tablet:rounded-[5px] tablet:py-2'
                                >
                                    <div className='w-full flex items-center gap-2 hover:text-orange cursor-pointer'>
                                        <div className='w-4 h-4'>
                                            <img src={item.code === 'CTPT'
                                                ? phongtro
                                                : item.code === 'CTCH'
                                                    ? canho
                                                    : item.code === 'NCT'
                                                        ? nhanguyencan
                                                        : item.code === 'CTMB'
                                                            ? matbang
                                                            : item.code === 'TNOG'
                                                                ? oghep
                                                                : ''
                                            }
                                                className='w-full h-full object-contain'
                                            />
                                        </div>
                                        <span className='text-sm '>
                                            {item.value}
                                        </span>
                                    </div>
                                    {item?.count && (
                                        <span className='text-sm pc:text-[#777777] laptop:text-[#777777] phone:text-[#ababab]'>{`(${item.count})`}</span>
                                    )}
                                </div>
                            ))
                        }
                    </div>
                )
            }
            {
                !double && type === 'labelCode' && (
                    <div className='flex flex-col gap-2'>
                        {
                            content?.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => { handleFilterLabel(item) }}
                                    className='w-full flex items-center justify-between  px-2 py-[5px] border-b border-b-[#dedede] border-dashed hover:text-orange cursor-pointer'
                                >
                                    <div className='w-full flex items-center gap-2 hover:text-orange cursor-pointer'>
                                        <span className='text-sm '>
                                            {item.value}
                                        </span>
                                    </div>
                                    {item?.count && (
                                        <span className='text-sm pc:text-[#777777] laptop:text-[#777777] phone:text-[#ababab]'>{`(${item.count})`}</span>
                                    )}
                                </div>
                            ))
                        }
                    </div>
                )
            }
            {
                double && (
                    <div className='flex gap-2 w-full flex-wrap'>
                        {
                            content?.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleFilter(item.code)}
                                    className=' w-[calc((100%-8px)/2)] p-[5px] flex items-center gap-2 border-b border-b-[#dedede] border-dashed hover:text-orange cursor-pointer'
                                >
                                    <span className='mb-[2px]'>
                                        <GrNext size={8} color="#dedede" />
                                    </span>
                                    <span className='text-sm '>
                                        {item.value}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default memo(SidebarItem)