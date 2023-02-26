import React, { useEffect, useState } from 'react'
import { SearchItem, Button, SearchModal } from './index';
import icons from '../../utils/icons';
import { useSelector } from 'react-redux';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { path } from '../../utils/path'

const { GrNext,
    BsSearch,
    IoLocationOutline,
    GiMoneyStack,
    TbVectorOff,
    HiOutlineBuildingOffice,
    FiDelete
} = icons

const Search = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const { provinces, prices, acreages, categories } = useSelector(state => state.app)
    const [isShowModal, setIsShowModal] = useState(false)
    const [content, setContent] = useState([])
    const [defaultText, setDefaultText] = useState('')
    const [name, setName] = useState('')
    const [queries, setQueries] = useState({})
    const [range, setRange] = useState({})

    useEffect(() => {
        if (!location?.pathname.includes(path.SEARCH)) {
            setRange({})
            setQueries({})
        }
    }, [location])

    const handleShowModal = (content, name, defaultText) => {
        setIsShowModal(true)
        setContent(content)
        setName(name)
        setDefaultText(defaultText)
    }

    const handleSubmit = (e, query, rangeMinMax) => {
        setQueries(prev => ({ ...prev, ...query }))
        setIsShowModal(false)
        range && setRange(prev => ({ ...prev, ...rangeMinMax }))
    }

    const handleSearch = () => {
        const queriesCode = Object.entries(queries).filter(item => item[0].includes('Number') || item[0].includes('Code')).filter(item => !item[1] === false)
        let queriesCodeObj = {}
        queriesCode.forEach(item => {
            queriesCodeObj[item[0]] = item[1]
        })

        const queriesText = Object.entries(queries).filter(item => !item[0].includes('Number') || !item[0].includes('Code'))
        let queriesTextObj = {}
        queriesText.forEach(item => {
            queriesTextObj[item[0]] = item[1]
        })

        let titleSearch = `${queriesTextObj.category
            ? `${queriesTextObj.category}`
            : ''} ${queriesTextObj.province
                ? `Khu vực ${queriesTextObj.province}`
                : ''} ${queriesTextObj.price
                    ? `Giá ${queriesTextObj.price}`
                    : ''} ${queriesTextObj.acreage
                        ? `Diện tích ${queriesTextObj.acreage}`
                        : ''}`
        navigate({
            pathname: `/${path.SEARCH}`,
            search: createSearchParams(queriesCodeObj).toString(),
        }, { state: { titleSearch } })
    }

    return (
        <>
            <div className='w-full p-[10px] bg-[#febb02] rounded-[8px] grid grid-cols-5 gap-2'>
                <span
                    onClick={() => handleShowModal(categories, 'category', "Tất cả danh mục")}
                    className='flex-1 cursor-pointer'>
                    <SearchItem
                        text={queries.category || "Tất cả danh mục"}
                        icAfter={queries.category ? <FiDelete size={15} color='#333333' /> : <GrNext size={15} color='#777777' />}
                        icBefore={<HiOutlineBuildingOffice size={15} color='#777777' />}
                        styleText={queries.category ? 'font-semibold text-black' : ''}
                    />
                </span>
                <span
                    onClick={() => handleShowModal(provinces, 'province', "Toàn quốc")}
                    className='flex-1 cursor-pointer'>
                    <SearchItem
                        text={queries.province || "Toàn quốc"}
                        icAfter={queries.province ? <FiDelete size={15} color='#333333' /> : <GrNext size={15} color='#777777' />}
                        icBefore={<IoLocationOutline size={15} color='#777777' />}
                        styleText={queries.province ? 'font-semibold text-black' : ''}
                    />
                </span>
                <span
                    onClick={() => handleShowModal(prices, 'price', "Chọn giá")}
                    className='flex-1 cursor-pointer'>
                    <SearchItem
                        text={queries.price || "Chọn giá"}
                        icAfter={queries.price ? <FiDelete size={15} color='#333333' /> : <GrNext size={15} color='#777777' />}
                        icBefore={<GiMoneyStack size={15} color='#777777' />}
                        styleText={queries.price ? 'font-semibold text-black' : ''}
                    />
                </span>
                <span
                    onClick={() => handleShowModal(acreages, 'acreage', 'Chọn diện tích')}
                    className='flex-1 cursor-pointer'>
                    <SearchItem
                        text={queries.acreage || "Chọn diện tích"}
                        icAfter={queries.acreage ? <FiDelete size={15} color='#333333' /> : <GrNext size={15} color='#777777' />}
                        icBefore={<TbVectorOff size={15} color='#777777' />}
                        styleText={queries.acreage ? 'font-semibold text-black' : ''}
                    />
                </span>
                <div
                    className='h-[35px]'>
                    <Button
                        text={"Tìm kiếm"}
                        icBefore={<BsSearch />}
                        bgColor={"bg-secondary1"}
                        textStyle={'text-white text-sm font-semibold'}
                        fullWidth
                        hover={'hover:shadow-md'}
                        onClick={handleSearch}
                    />
                </div>
            </div>
            {
                isShowModal && (
                    <SearchModal
                        setIsShowModal={setIsShowModal}
                        content={content}
                        name={name}
                        handleSubmit={handleSubmit}
                        queries={queries}
                        range={range}
                        defaultText={defaultText}
                    />
                )
            }
        </>
    )
}

export default Search