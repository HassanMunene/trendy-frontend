import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';

import pillowHero from "../../assets/images/pillow_hero.jpg"
import curtainHero from "../../assets/images/curtain_hero.webp"

const HeroSection = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const heroSlides = [
        {
            id: 1,
            title: 'Luxury Pillow Collections',
            subtitle: 'Experience cloud-like comfort with our premium pillows',
            cta: 'Shop Pillows',
            link: '/products?category=pillows',
            image: pillowHero,
            alt: "bed pillows",
            bgColor: 'from-rose-50 to-rose-100'
        },
        {
            id: 2,
            title: 'Elegant Window Treatments',
            subtitle: 'Transform your space with our designer curtains and drapes',
            cta: 'Shop Curtains',
            link: '/products?category=curtains',
            image: curtainHero,
            alt: "curtain",
            bgColor: 'from-rose-50 to-pink-50'
        }
    ];

    const nextSlide = () => {
        setActiveSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setActiveSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
    };

    // Swipe handlers
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    }

    const handleTouchEnd = (e) => {
        touchEndX.current = e.changedTouches[0].clientX;
        handleSwipeGesture();
    }

    const handleSwipeGesture = () => {
        const difference = touchStartX.current - touchEndX.current;
        if (difference > 50) {
            nextSlide();
        } else if (difference < -50) {
            prevSlide();
        }
    }

    return (
        <section className="relative overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            {/* Gradient background overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-black/10 z-10 pointer-events-none"></div>

            {/* Slides container */}
            <div className="flex transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
                {heroSlides.map((slide) => (
                    <div key={slide.id} className="min-w-full relative h-[75vh] min-h-[400px] md:h-[80vh] md:min-h-[600px] max-h-[800px]">
                        <img
                            src={slide.image}
                            alt={slide.alt}
                            className="absolute inset-0 w-full h-full object-cover z-0"
                            loading="eager"
                        />

                        {/* Content */}
                        <div className="relative z-20 container mx-auto px-4 h-[80vh] min-h-[600px] max-h-[800px] flex flex-col justify-center">
                            <div className="max-w-2xl bg-white/90 backdrop-blur-sm p-8 md:p-10 rounded-xl shadow-lg">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 leading-tight">
                                    {slide.title}
                                </h1>
                                <p className="text-lg md:text-xl text-gray-700 mb-8">
                                    {slide.subtitle}
                                </p>
                                <Link
                                    to={slide.link}
                                    className="inline-block cursor-pointer bg-gradient-to-r from-rose-700 to-pink-600 hover:from-rose-800 hover:to-pink-700 text-white px-8 py-4 rounded-lg hover:shadow-lg transition-all duration-300 font-medium text-lg"
                                >
                                    {slide.cta}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation arrows */}
            <button
                onClick={prevSlide}
                className="hidden sm:flex absolute left-4 md:left-8 top-1/2 z-30 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Previous slide"
            >
                <svg className="w-6 h-6 text-rose-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={nextSlide}
                className="hidden sm:flex absolute right-4 md:right-8 top-1/2 z-30 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Next slide"
            >
                <svg className="w-6 h-6 text-rose-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-2">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeSlide ? 'bg-rose-700 w-8' : 'bg-white/80'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSection;