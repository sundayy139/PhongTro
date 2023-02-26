import React, { memo } from 'react'
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import Slider from 'react-slick'

const Slick = ({ images }) => {
    const settings = {
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Slider {...settings}>
            {
                images && images?.map((item, index) => (
                    <div
                        className='w-[500px] h-[320px] bg-black z-100 cursor-pointer px-10'
                        key={index}
                    >
                        <LightGallery
                            height='auto'
                            speed={500}
                            plugins={[lgThumbnail, lgZoom]}
                        >
                            <img
                                alt="img"
                                src={item}
                                className='w-full h-full object-contain'
                            />
                        </LightGallery >
                    </div >
                ))
            }
        </Slider >
    )
}

export default memo(Slick)