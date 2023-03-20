import React, { useState, useEffect } from "react";
import icons from '../../utils/icons'

const { AiOutlineArrowUp } = icons
const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 120) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);

        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <>
            {isVisible && (
                <div
                    className=" pc:w-[60px] pc:h-[60px] laptop:w-[60px] laptop:h-[60px] phone:w-[40px] phone:h-[40px] tablet:w-[40px] tablet:h-[40px] bg-secondary2 fixed bottom-20 right-10 cursor-pointer rounded-full shadow-md flex items-center justify-center z-[9999]"
                    onClick={scrollToTop}>
                    <AiOutlineArrowUp size={30} color='white' />
                </div>
            )}
        </>
    );
}

export default ScrollToTop;
