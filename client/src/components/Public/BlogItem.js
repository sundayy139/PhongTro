import React from 'react'
import { Link } from 'react-router-dom'

const BlogItem = ({ image, title, descMarkdown, descHTML, id }) => {
    return (
        <div className='flex gap-5 items-center px-5 py-[15px] border-b'>
            <Link
                to={`/blog/chi-tiet/${id}`}
                className='w-[140px] h-[140px] flex-none'
            >
                <img
                    src={image}
                    className='w-full h-full object-cover rounded-[5px]'
                />
            </Link>
            <div className='flex flex-col gap-2'>
                <Link
                    to={`/blog/chi-tiet/${id}`}
                    className='text-[21px] text-[#055699] hover:underline cursor-pointer'>
                    {title}
                </Link>
                <div dangerouslySetInnerHTML={{ __html: descHTML }} className='line-clamp-3 text-sm'>
                </div>
            </div>
        </div>
    )
}

export default BlogItem