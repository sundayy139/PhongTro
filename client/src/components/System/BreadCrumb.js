import React from 'react'
import { Link } from 'react-router-dom'

const BreadCrumb = ({ items }) => {
    return (
        <ul className="w-full py-[10px] px-[14px] bg-[#e9ecef] flex list-none gap-2 rounded-[5px]">
            {items?.map((item, index) => (
                <div
                    key={index}
                    className='flex items-center justify-center gap-2'
                >
                    <li
                        className={`text-sm  ${index === items.length - 1 ? "text-[#333]" : "text-[#007bff] hover:underline"}`}
                    >
                        {index < items.length - 1 ? <Link to={item.link}>{item.title}</Link> : item.title}
                    </li>
                    {
                        index !== items.length - 1 && (
                            <span
                                className='text-sm'
                            >/</span>
                        )
                    }
                </div>
            ))}
        </ul>
    )
}

export default BreadCrumb