import React from 'react'
import { Link } from 'react-router-dom'

const BlogItem = ({ image, title, descMarkdown, descHTML, id }) => {
    return (
        <div className='w-full flex items-center px-5 py-[15px] pc:border-b laptop:border-b'>
            <Link
                to={`/blog/chi-tiet/${id}`}
                className='pc:w-[140px] pc:h-[140px] laptop:w-[140px] laptop:h-[140px] phone:w-[70px] phone:h-[70px] tablet:w-[70px] tablet:h-[70px] flex-none'
            >
                <img
                    src={image}
                    className='w-full h-full object-cover rounded-[5px]'
                />
            </Link>
            <div className='flex-auto ml-4 '>
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

export default BlogItem