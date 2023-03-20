import React, { memo, useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';

const Slick = ({ imagesArr }) => {

    const [images, setImages] = useState(imagesArr?.map((url) => ({
        original: url,
        thumbnail: url,
    })));

    useEffect(() => {
    }, [])


    const handleScreenChange = (fullscreenElement) => {
        const imageElement = document.querySelectorAll('.image-gallery-image');
        if (imageElement) {
            if (fullscreenElement) {
                for (let i = 0; i < imageElement.length; i++) {
                    imageElement[i].style.height = 'calc(100vh - 80px)';
                    imageElement[i].style.width = '100%';
                }
            } else {
                for (let i = 0; i < imageElement.length; i++) {
                    imageElement[i].style.height = '350px';
                    imageElement[i].style.width = '100%';
                }
            }
        }
    };

    const customRenderItem = (item) => (
        <img src={item.original} alt={item.originalAlt} className='image-gallery-image w-full h-[350px]' />
    );


    return (
        <div>
            <ImageGallery
                items={images}
                showIndex
                showFullscreenButton={true}
                onScreenChange={handleScreenChange}
                renderItem={customRenderItem}
            />
        </div>
    )
}

export default memo(Slick)