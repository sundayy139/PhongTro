import React, { memo, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageNumber } from './index'
import icons from '../../utils/icons'

const { MdLastPage } = icons

const Pagination = ({ count, data }) => {
    const [arrPage, setArrPage] = useState()
    const [isHideEnd, setIsHideEnd] = useState(false)
    const [isHideStart, setIsHideStart] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    const [params] = useSearchParams()

    useEffect(() => {
        const page = params.get('page')
        page && +page !== currentPage && setCurrentPage(+page)
        !page && setCurrentPage(1)
    }, [params])

    useEffect(() => {

        let length = data?.length < process.env.REACT_APP_POSTS_LIMIT ? process.env.REACT_APP_POSTS_LIMIT : data?.length
        let maxPage = count > 0 ? Math.ceil(count / length) : 1

        let minPage = 1

        let start = (currentPage - 2) < minPage ? minPage : (currentPage - 2)
        let end = (currentPage + 2) > maxPage ? maxPage : (currentPage + 2)

        let temp = []
        for (let i = start; i <= end; i++) {
            temp.push(i)
        }
        setArrPage(temp)

        currentPage > minPage + 2 ? setIsHideStart(true) : setIsHideStart(false)
        currentPage >= maxPage - 2 ? setIsHideEnd(true) : setIsHideEnd(false)


    }, [count, data, currentPage])


    return (
        <div className='flex items-center justify-center gap-2'>
            {
                isHideStart && (
                    <>
                        <PageNumber
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
                            number={Math.ceil(count / data?.length)}
                        />
                    </>
                )
            }
        </div>
    )
}

export default memo(Pagination)