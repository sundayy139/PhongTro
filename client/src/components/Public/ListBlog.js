import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { useSearchParams } from 'react-router-dom'
import notFound from '../../assets/image/not-found.png'
import { BlogItem } from './index'

const List = ({ isRelease }) => {
    const [paramsSearch] = useSearchParams()
    const dispatch = useDispatch()
    const { blogs } = useSelector(state => state.blog)

    useEffect(() => {
        dispatch(actions.getBlogs())
    }, [])

    useEffect(() => {
        let params = []
        for (let entry of paramsSearch.entries()) {
            params.push(entry)
        }

        let searchParamsQuery = {}
        params.forEach(i => {
            if (Object.keys(searchParamsQuery)?.some(item => item === i[0])) {
                searchParamsQuery[i[0]] = [...searchParamsQuery[i[0]], i[1]]
            } else {
                searchParamsQuery = { ...searchParamsQuery, [i[0]]: [i[1]] }
            }
        })
        dispatch(actions.getBlogs(searchParamsQuery))
    }, [paramsSearch])

    return (
        <div className='w-full pc:border pc:border-[#dedede] pc:rounded-[10px] laptop:border laptop:border-[#dedede] laptop:rounded-[10px] bg-white ' >
            {
                isRelease && (
                    <h1 className='px-5 py-[15px] text-lg font-bold tablet:px-4 phone:px-4'>Có thể bạn quan tâm</h1>
                )
            }
            <div className='flex flex-col w-full'>
                {
                    blogs && blogs?.length > 0 ? blogs.map(item => (
                        <BlogItem
                            id={item.id}
                            key={item.id}
                            image={item.image}
                            title={item.title}
                            descMarkdown={item.descMarkdown}
                            descHTML={item.descHTML}
                        />
                    ))
                        : (
                            <div className='w-full h-full p-10 border-t border-gray-300'>
                                <div className='w-1/2 m-auto'>
                                    <img
                                        src={notFound}
                                        className='w-full h-full object-contain'
                                    />
                                </div>
                            </div>
                        )
                }
            </div>
        </div >
    )
}

export default List