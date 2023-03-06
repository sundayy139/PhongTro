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
                    className="w-[60px] h-[60px] bg-secondary2 fixed bottom-20 right-10 cursor-pointer rounded-full shadow-md flex items-center justify-center"
                    onClick={scrollToTop}>
                    <AiOutlineArrowUp size={30} color='white' />
                </div>
            )}
        </>
    );
}

export default ScrollToTop;
