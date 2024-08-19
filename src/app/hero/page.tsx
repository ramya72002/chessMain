"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './hero.scss';

const Hero: React.FC = () => {
    const [visibleTextIndex, setVisibleTextIndex] = useState(-1);
    const [hoveredImageIndex, setHoveredImageIndex] = useState(-1);
    const [showPopup, setShowPopup] = useState(false);
    const texts = ['Smarter', 'Strategic', 'Skilled', 'Superior','Sharp'];
    const router = useRouter();

    useEffect(() => {
        const initialDelay = setTimeout(() => {
            setVisibleTextIndex(0);
            const interval = setInterval(() => {
                setVisibleTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
            }, 2000);
            return () => clearInterval(interval);
        }, 3000);

        return () => clearTimeout(initialDelay);
    }, [texts.length]);

    useEffect(() => {
        const hoverInterval = setInterval(() => {
            setHoveredImageIndex((prevIndex) => (prevIndex + 1) % 4);
        }, 2000);

        return () => clearInterval(hoverInterval);
    }, []);

    const handleImageClick = (index: number) => {
        if (index === 1) {
            router.push('/signup');
        } else {
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 500); // Show the popup for 0.1 seconds
        }
    };

    return (
        <div className="image-container">
            <div className="image-wrapper">
                <Image src="/images/C1.jpg" alt="C1" className="slide-from-bottom" layout="fill" objectFit="cover" />
            </div>
            <div className="overlay">
                <h2 className="elementor-heading-title elementor-size-default">
                <div className="chess-text">
    Playing chess <br />
    Makes your<br />
    Kid<br />
</div>

                    {texts.map((text, index) => (
                        <span key={index} className={visibleTextIndex === index ? 'visible' : 'hidden'}>
                            {text}
                        </span>
                    ))}
                </h2>
            </div>
            <div className="right-side">
                {[1, 2, 3, 4].map((index) => (
                    <div
                        key={index}
                        className={`image-wrapper1 zoom-in ${hoveredImageIndex === index - 1 ? 'hover' : ''}`}
                        onClick={() => handleImageClick(index - 1)}
                        onMouseEnter={() => index !== 2 && setHoveredImageIndex(index - 1)}
                    >
                        <Image src={`/images/image${index}.png`} alt={`i${index}`} layout="fill" objectFit="cover" />
                        <div className="overlay1"></div>
                        <div className="text-overlay1">
                            {texts[index - 1]} <span className='arrow'>→</span>
                        </div>
                    </div>
                ))}
            </div>

            {showPopup && (
                <div className="custom-popup">
                    <div className="popup-content">
                        <p>Coming Soon</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Hero;
