import React from 'react'
import { Link } from 'react-router-dom'
import Skeleton from './Skeleton'

const BlogItem = ({ image, title, descHTML, id, isLoading }) => {
    return (
        <>
            {
                isLoading ? (
                    Array(+process.env.REACT_APP_POSTS_LIMIT).fill(0)?.map((item, index) => (
                        <div
                            className='w-full flex items-center px-5 py-[15px] pc:border-b laptop:border-b'
                            key={index}
                        >
                            <Skeleton className='pc:w-[140px] pc:h-[140px] laptop:w-[140px] laptop:h-[140px] phone:w-[70px] phone:h-[70px] tablet:w-[70px] tablet:h-[70px] flex-none rounded-[5px]'
                            />
                            <div className='flex-auto ml-4 flex flex-col justify-between pc:h-[140px] laptop:h-[140px] phone:h-[70px] tablet:h-[70px]'>
                                <Skeleton className='h-[70px] w-full rounded-[5px]' />
                                <Skeleton className='h-[60px] w-full rounded-[5px] phone:hidden tablet:hidden' />
                            </div>
                        </div>
                    ))) : (
                    <div className='w-full flex items-center px-5 py-[15px] pc:border-b laptop:border-b'>
                        <Link
                            to={`/blog/chi-tiet/${id}`}
                            className='pc:w-[140px] pc:h-[140px] laptop:w-[140px] laptop:h-[140px] phone:w-[70px] phone:h-[70px] tablet:w-[70px] tablet:h-[70px] flex-none'
                        >
                            <img
                                src={image}
                                className='w-full h-full object-cover rounded-[5px]'
                                alt=''
                            />
                        </Link>
                        <div className='flex-auto ml-4 flex flex-col justify-between pc:h-[140px] laptop:h-[140px] phone:h-[70px] tablet:h-[70px]'>
                            <Link
                                to={`/blog/chi-tiet/${id}`}
                                className=' pc:text-[21px] laptop:text-[21px] phone:text-lg tablet:text-lg text-[#055699] hover:underline cursor-pointer'>
                                {title}
                            </Link>
                            <div dangerouslySetInnerHTML={{ __html: descHTML }} className='line-clamp-3 text-sm phone:hidden tablet:hidden'>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default BlogItem