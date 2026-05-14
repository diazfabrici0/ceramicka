import { useState, useEffect, useMemo } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

interface CarouselItem {
    id: string | number;
    url: string;
    name: string;
    price?: number;
}

const Carousel = ({ data }: { data: CarouselItem[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const navigate = useNavigate();

    const visibleIndices = useMemo(() => {
        const indices = [];
        const total = data.length;
        for (let i = -2; i <= 2; i++) {
            let index = currentIndex + i;
            if (index < 0) index = total + index;
            if (index >= total) index = index - total;
            indices.push(index);
        }
        return [...new Set(indices)];
    }, [currentIndex, data.length]);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | undefined;

        if (!isPaused && data.length > 1) {
            interval = setInterval(() => {
                nextSlide();
            }, 3000);
        }

        return () => clearInterval(interval);
    }, [currentIndex, isPaused, data.length]);

    const nextSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prevIndex) =>
            prevIndex === data.length - 1 ? 0 : prevIndex + 1
        );
        setTimeout(() => setIsAnimating(false), 500);
    };

    const prevSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? data.length - 1 : prevIndex - 1
        );
        setTimeout(() => setIsAnimating(false), 500);
    };

    const handleProductClick = (id: string | number) => {
        if (!isAnimating) {
            navigate(`/product/${id}`);
        }
    };

    const goToSlide = (index: number) => {
        if (isAnimating || index === currentIndex) return;
        setIsAnimating(true);
        setCurrentIndex(index);
        setTimeout(() => setIsAnimating(false), 500);
    };

    if (data.length === 0) return null;

    return (
        <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div
                className="flex items-center justify-center gap-2 md:gap-4 transition-transform duration-500 ease-out"
                style={{ height: '320px' }}
            >
                {visibleIndices.map((itemIndex) => {
                    const item = data[itemIndex];
                    const offset = (itemIndex - currentIndex + data.length) % data.length;

                    let translateX = 0;
                    let scale = 0.6;
                    let zIndex = 0;
                    let opacity = 0.4;

                    if (offset === 0) {
                        translateX = 0;
                        scale = 1;
                        zIndex = 10;
                        opacity = 1;
                    } else if (offset === 1 || offset === -data.length + 1) {
                        translateX = 100;
                        scale = 0.8;
                        zIndex = 5;
                        opacity = 0.7;
                    } else if (offset === -1 || offset === data.length - 1) {
                        translateX = -100;
                        scale = 0.8;
                        zIndex = 5;
                        opacity = 0.7;
                    } else if (offset === 2 || offset === -data.length + 2) {
                        translateX = 180;
                        scale = 0.6;
                        zIndex = 1;
                        opacity = 0.3;
                    } else if (offset === -2 || offset === data.length - 2) {
                        translateX = -180;
                        scale = 0.6;
                        zIndex = 1;
                        opacity = 0.3;
                    }

                    return (
                        <button
                            key={item.id}
                            onClick={() => handleProductClick(item.id)}
                            className={`absolute transition-all duration-500 ease-out cursor-pointer ${
                                isAnimating ? 'pointer-events-none' : ''
                            }`}
                            style={{
                                transform: `translateX(${translateX}%) scale(${scale})`,
                                opacity,
                                zIndex,
                            }}
                        >
                            <img
                                src={item.url}
                                alt={item.name}
                                className="object-cover rounded-lg shadow-2xl"
                                style={{ width: '180px', height: '200px' }}
                            />
                            {offset === 0 && (
                                <div className="mt-4 text-center">
                                    <h3 className="text-lg font-medium text-white ">{item.name}</h3>
                                    {item.price && (
                                        <p className="text-[#f880b8] font-semibold bg-[#ffffffc5] rounded-xl">${item.price.toLocaleString()}</p>
                                    )}
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {data.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        disabled={isAnimating}
                        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full shadow-lg transition-all z-20 disabled:opacity-50"
                    >
                        <FaChevronLeft size={20} />
                    </button>
                    <button
                        onClick={nextSlide}
                        disabled={isAnimating}
                        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full shadow-lg transition-all z-20 disabled:opacity-50"
                    >
                        <FaChevronRight size={20} />
                    </button>

                    <div className="flex justify-center gap-2 mt-4">
                        {data.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    index === currentIndex
                                        ? 'bg-[#f880b8] w-4'
                                        : 'bg-white/50 hover:bg-white/70'
                                }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Carousel;