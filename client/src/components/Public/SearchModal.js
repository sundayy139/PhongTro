import React, { memo, useEffect, useState } from 'react'
import { getNumberAcreage, getNumberPrice } from '../../utils/fn'
import icons from '../../utils/icons'

const { BsArrowLeft } = icons
const SearchModal = ({ setIsShowModal, content, name, handleSubmit, queries, range, defaultText }) => {

    const [percent1, setPercent1] = useState(name === 'price' && range.priceRange
        ? range?.priceRange[0]
        : name === 'acreage' && range.acreageRange
            ? range?.acreageRange[0]
            : 0
    )
    const [percent2, setPercent2] = useState(name === 'price' && range.priceRange
        ? range?.priceRange[1]
        : name === 'acreage' && range.acreageRange
            ? range?.acreageRange[1]
            : 100
    )
    const [active, setActive] = useState('')

    useEffect(() => {
        if (name === 'acreage' || name === 'price') {
            const trackActiveEls = document.getElementById("track-active")
            if (percent2 <= percent1) {
                trackActiveEls.style.left = `${percent2}%`
                trackActiveEls.style.right = `${100 - percent1}%`
            } else {
                trackActiveEls.style.left = `${percent1}%`
                trackActiveEls.style.right = `${100 - percent2}%`
            }
        }
    }, [percent1, percent2])

    const handleClickTrack = (e, percentDf) => {
        e.stopPropagation()
        active && setActive('')
        const trackEls = document.getElementById("track")
        const stackRect = trackEls.getBoundingClientRect()
        let percent = percentDf || percentDf === 0 ? percentDf : Math.round((e.clientX - stackRect.left) * 100 / stackRect.width)

        if (Math.abs(percent - percent1) < Math.abs(percent - percent2)) {
            setPercent1(percent)
        } else {
            setPercent2(percent)
        }
    }

    const convert100toTarget = (percent) => {
        return name === 'price' ? Math.ceil(Math.round((percent * 15) / 50) * 5) / 10
            : name === 'acreage' ? Math.ceil(Math.round((percent * 9) / 50) * 5)
                : 0
    }

    const convertTargetTo100 = (percent) => {
        let target = name === 'price' ? 15 : name === "acreage" ? 90 : 0
        return Math.round((percent / target) * 100)
    }

    const handleActive = (item) => {
        setActive(item.code)
        let arrMaxMin = name === 'price' ? getNumberPrice(item.value) : name === 'acreage' ? getNumberAcreage(item.value) : ''
        if (arrMaxMin.length === 1) {
            if (+arrMaxMin[0] === 1 || +arrMaxMin[0] === 20) {
                setPercent1(0)
                setPercent2(convertTargetTo100(1))
            }
            if (+arrMaxMin[0] === 15 || +arrMaxMin[0] === 90) {
                setPercent1(100)
                setPercent2(100)
            }
        } else {
            setPercent1(convertTargetTo100(+arrMaxMin[0]))
            setPercent2(convertTargetTo100(+arrMaxMin[1]))
        }
    }

    const handleBeforeSubmit = (e) => {
        let min = percent1 < percent2 ? percent1 : percent2
        let max = percent1 < percent2 ? percent2 : percent1
        let arrMinMax = [+convert100toTarget(min), +convert100toTarget(max)]

        handleSubmit(e, {
            [`${name}Number`]: arrMinMax,
            [name]: (percent1 === 100 && percent2 === 100)
                ? `Trên ${convert100toTarget(percent1)} ${name === 'price' ? 'triệu' : 'm2'}`
                : `Từ ${convert100toTarget(min)} - ${convert100toTarget(max)} ${name === 'price' ? 'triệu' : 'm2'}`
        },
            {
                [`${name}Range`]: [min, max]
            }
        )
    }


    return (
        <div
            className='fixed top-0 left-0 right-0 bottom-0 bg-overlay-3 z-50'
            onClick={() => setIsShowModal(false)}
        >
            <div
                className='w-[700px] h-full max-h-[500px] flex flex-col bg-white mx-auto mt-[100px] rounded-[10px] overflow-hidden justify-between'
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className='w-full'>
                    <div className='w-full h-[45px] flex items-center px-5 relative'>
                        <span
                            className='absolute cursor-pointer hover:text-orange'
                            onClick={() => setIsShowModal(false)}
                        >
                            <BsArrowLeft size={25} />
                        </span>
                        <span className='flex-auto text-center uppercase text-sm font-bold'>
                            {
                                name === 'category'
                                    ? "Chọn danh mục" :
                                    name === 'province'
                                        ? "Chọn tỉnh thành"
                                        : name === 'price'
                                            ? "Chọn giá"
                                            : name === 'acreage'
                                                ? "Chọn diện tích"
                                                : ''
                            }
                        </span>
                    </div>
                    {
                        (name === 'category' || name === 'province') && (
                            <div className='px-[25px] py-[10px] flex flex-col'>
                                <span className='py-3 flex gap-2 items-center border-b border-b-[#dedede]'>
                                    <input
                                        name={name}
                                        type="radio"
                                        id='default'
                                        value={defaultText}
                                        checked={!queries[`${name}Code`] ? true : false}
                                        onChange={(e) => handleSubmit(e, { [name]: defaultText, [`${name}Code`]: null })}
                                    />
                                    <label
                                        className='text-[16px] hover:text-primary cursor-pointer font-[400]'
                                        htmlFor="default">
                                        {defaultText}
                                    </label>
                                </span>
                                {
                                    content?.map(item => (
                                        <span key={item.code} className='py-3 flex gap-2 items-center border-b border-b-[#dedede]'>
                                            <input
                                                name={name}
                                                type="radio"
                                                id={item.code}
                                                value={item.code}
                                                checked={item.code === queries[`${name}Code`] ? true : false}
                                                onChange={(e) => handleSubmit(e, { [name]: item.value, [`${name}Code`]: item.code })}
                                            />
                                            <label
                                                className='text-[16px] hover:text-primary cursor-pointer font-[400]'
                                                htmlFor={item.code}>
                                                {item.value}
                                            </label>
                                        </span>
                                    ))
                                }
                            </div>
                        )
                    }
                    {
                        (name === 'acreage' || name === 'price') && (
                            <div className='px-[25px] py-20'>
                                <div className='flex flex-col items-center justify-center relative'>
                                    <div className='absolute -top-14 font-semibold text-xl text-orange'>
                                        {
                                            (percent1 === 100 && percent2 === 100)
                                                ? `Trên ${convert100toTarget(percent1)} ${name === 'price' ? 'triệu' : 'm2'}`
                                                : `Từ ${convert100toTarget(percent1 < percent2 ? percent1 : percent2)} - ${convert100toTarget(percent2 > percent1 ? percent2 : percent1)} ${name === 'price' ? 'triệu' : 'm2'}`
                                        }

                                    </div>
                                    <div
                                        id='track'
                                        className='slider-track h-[5px] bg-[#ddd] rounded-full absolute w-full top-0 bottom-0'
                                        onClick={handleClickTrack}
                                    ></div>
                                    <div
                                        id='track-active'
                                        className='slider-track-active h-[5px] bg-orange rounded-full absolute top-0 bottom-0'
                                        onClick={handleClickTrack}
                                    ></div>
                                    <input
                                        type="range"
                                        max={100}
                                        min={0}
                                        step={1}
                                        value={percent1}
                                        className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                                        onChange={(e) => {
                                            setPercent1(+e.target.value)
                                            active && setActive('')
                                        }}
                                    />
                                    <input
                                        type="range"
                                        max={100}
                                        min={0}
                                        step={1}
                                        value={percent2}
                                        className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                                        onChange={(e) => {
                                            setPercent2(+e.target.value)
                                            active && setActive('')
                                        }}
                                    />
                                    <div className='flex items-center justify-between absolute w-full left-0 right-0 top-6 z-30 px-2 text-[#333333]'>
                                        <span
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleClickTrack(e, 0)
                                            }}
                                            className='text-sm cursor-pointer'>
                                            0
                                        </span>
                                        <span
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleClickTrack(e, 100)
                                            }}
                                            className='text-sm -mr-4 cursor-pointer'>
                                            {
                                                name === 'price' ? ' 15+ triệu' : name === 'acreage' ? '90m2' : ''
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4 mt-14'>
                                    <h5 className='text-sm font-[400]'>
                                        Chọn nhanh
                                    </h5>
                                    <div className='flex flex-wrap gap-3'>
                                        {
                                            content?.map(item => (
                                                <span
                                                    key={item.code}
                                                    className={`px-4 py-2 bg-[#eee] rounded-md text-xs cursor-pointer ${active === item.code ? 'bg-blue-500 text-white' : ''}`}
                                                    onClick={() => handleActive(item)}
                                                >
                                                    {item.value}
                                                </span>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                {
                    (name === 'acreage' || name === 'price') && (
                        <button
                            type='button'
                            className='w-full text-sm py-2 font-[500] uppercase bg-[#ffa500] '
                            onClick={handleBeforeSubmit}
                        >
                            Áp dụng
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default memo(SearchModal)