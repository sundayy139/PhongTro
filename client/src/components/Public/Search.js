import React, { useEffect, useState } from 'react'
import { SearchItem, Button, SearchModal } from './index';
import icons from '../../utils/icons';
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { path } from '../../utils/path'
import * as actions from '../../store/actions'

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
    const dispatch = useDispatch()
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
            ? `${queriesTextObj.category},`
            : ''} ${queriesTextObj.province
                ? `${queriesTextObj.province},`
                : ''} ${queriesTextObj.price
                    ? `Giá ${queriesTextObj.price},`
                    : ''} ${queriesTextObj.acreage
                        ? `Diện tích ${queriesTextObj.acreage},`
                        : ''} Mới nhất ${new Date().getFullYear()}`
        navigate({
            pathname: `/${path.SEARCH}`,
            search: createSearchParams(queriesCodeObj).toString(),
        }, { state: { titleSearch } })

        // set title search
        dispatch(actions.setSearchTitle(titleSearch))
    }

    return (
        <>
            <div className='w-full pc:p-[10px] laptop:p-[10px] pc:bg-[#febb02] laptop:bg-[#febb02] phone:bg-primary tablet:bg-primary  pc:rounded-[8px] laptop:rounded-[8px] pc:grid pc:grid-cols-5 laptop:grid laptop:grid-cols-5 gap-2
            phone:flex phone:flex-col tablet:flex tablet:flex-col phone:py-[10px] tablet:py-[10px] tablet:px-4 phone:px-4
            '>
                <span
                    onClick={() => handleShowModal(categories, 'category', "Tất cả danh mục")}
                    className='flex-1 cursor-pointer'>
                    <SearchItem
                        text={queries.category || "Tất cả danh mục"}
                        icAfter={queries.category ? <FiDelete size={15} color='#333333' /> : <GrNext size={15} color='#777777' />}
                        icBefore={<HiOutlineBuildingOffice size={15} color='#777777' />}
                        styleText={queries.category ? 'font-semibold text-black' : ''}
                        onClick={() => setQueries(null)}
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
                        bgColor={"pc:bg-secondary1 laptop:bg-secondary1 phone:bg-[#febb02] tablet:bg-[#febb02]"}
                        textStyle={'pc:text-white laptop:text-white text-sm font-semibold'}
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