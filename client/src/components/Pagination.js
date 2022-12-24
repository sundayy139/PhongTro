import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { PageNumber } from './index'
import icons from '../utils/icons'

const { MdLastPage, MdFirstPage } = icons

const Pagination = ({ number }) => {
    const { count, posts } = useSelector(state => state.post)

    const [arrPage, setArrPage] = useState()
    const [isHideEnd, setIsHideEnd] = useState(false)
    const [isHideStart, setIsHideStart] = useState(false)
    const [currentPage, setCurrentPage] = useState(+number || 1)

    useEffect(() => {
        let length = posts.length || 1
        let maxPage = Math.floor(count / length)
        let minPage = 1

        let start = (currentPage - 3) < minPage ? minPage : (currentPage - 3)
        let end = (currentPage + 3) > maxPage ? maxPage : (currentPage + 3)

        let temp = []
        for (let i = start; i <= end; i++) {
            temp.push(i)
        }
        setArrPage(temp)

        currentPage > minPage + 3 ? setIsHideStart(true) : setIsHideStart(false)
        currentPage >= maxPage - 3 ? setIsHideEnd(true) : setIsHideEnd(false)

    }, [count, posts, currentPage, number])

    return (
        <div className='flex items-center justify-center gap-2'>
            {
                isHideStart && (
                    <>
                        <PageNumber
                            icons={<MdFirstPage size={20} />}
                            setCurrentPage={setCurrentPage}
                            number={1}
                        />
                        <PageNumber
                            number={"..."}
                        />
                    </>
                )
            }
            {
                arrPage?.length > 0 && arrPage.map(item => (
                    <PageNumber
                        key={item}
                        number={item}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                ))
            }
            {
                !isHideEnd && (
                    <>
                        <PageNumber
                            number={"..."}
                        />
                        <PageNumber
                            icons={<MdLastPage size={20} />}
                            setCurrentPage={setCurrentPage}
                            number={Math.floor(count / posts.length)}
                        />
                    </>
                )
            }
        </div>
    )
}

export default memo(Pagination)