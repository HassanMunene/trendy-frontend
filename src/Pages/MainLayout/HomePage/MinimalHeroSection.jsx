import React from 'react';
import { Link } from 'react-router-dom';

import HeroImage from "../../../assets/images/hero_section_image.avif";

const MinimalHeroSection = () => {
    return (
        <div className="relative overflow-hidden">
            {/* Background image with overlay */}
            <div className="absolute inset-0">
                <img src={HeroImage} alt="Hero section Image" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Hero content */}
            <div className="relative z-10 py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                        Sleep Like Royalty
                    </h1>
                    <p className="text-xl md:text-2xl text-rose-100 mb-8 max-w-2xl mx-auto">
                        Handcrafted luxury bedding designed for those who appreciate the finer things in life
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/products"
                            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-rose-700 hover:bg-rose-800 shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Explore Collections
                        </Link>
                        <Link
                            to="/about"
                            className="inline-flex items-center justify-center px-8 py-4 border border-2 border-white text-lg font-medium rounded-md text-white hover:bg-white/10 transition-all duration-300"
                        >
                            Our Craftsmanship
                        </Link>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
        </div>
    )
}

export default MinimalHeroSection;