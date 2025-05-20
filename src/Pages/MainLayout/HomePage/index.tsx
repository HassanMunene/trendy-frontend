import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import MinimalHeroSection from './MinimalHeroSection';
import Sidebar from './Sidebar';
import OurCollections from './OurCollection';
import BestSellers from './BestSellers';
import NewArrivals from './NewArrivals';
import TestimonialsSection from './TestimonialsSection';

import {
    fetchCollections,
    fetchBestSellers,
    fetchNewArrivals,
    fetchTestimonials
} from "../../../api/api"

const HomePage = () => {
    const [collections, setCollections] = useState([]);
    const [bestSellers, setBestSellers] = useState([]);
    const [newArrivals, setNewArrivals] = useState([]);
    const [testimonials, setTestimonials] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [collectionsData, bestSellersData, newArrivalsData, testimonialsData] = await Promise.all([
                    fetchCollections(),
                    fetchBestSellers(),
                    fetchNewArrivals(),
                    fetchTestimonials()
                ]);
                setCollections(collectionsData);
                setBestSellers(bestSellersData);
                setNewArrivals(newArrivalsData);
                setTestimonials(testimonialsData);
            } catch (error) {
                setError(error.message);
                console.log("error fetching the data");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [])

    if (loading) {
        return <div className="text-center py-20">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="bg-gray-100">
            {/* Minimal Hero section - A headline and CTA */}
            <MinimalHeroSection />

            <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-50">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <main className="flex-1 py-8">
                    <OurCollections />
                    <div className="mt-8">
                        <BestSellers />
                    </div>
                    <div className="mt-8">
                        <NewArrivals />
                    </div>
                </main>
            </div>

            {/* Testimonial Section */}
            <TestimonialsSection />

            {/* Final CTA */}
            <div className="relative py-32 px-4 bg-gray-50 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://www.home-beddings-and-curtains.com/cdn/shop/files/02_taloa_kaki_mobile_1600x.jpg?v=1725106460"
                        alt="Luxury bedroom"
                        className="w-full h-full object-cover opacity-20"
                    />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">Experience Unparalleled Comfort</h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Your dream bedroom awaits - discover our collection of premium home textiles today
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/products"
                            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-rose-700 hover:bg-rose-800 shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Shop Now
                        </Link>
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center px-8 py-4 border border-2 border-gray-900 text-lg font-medium rounded-md text-gray-900 hover:bg-gray-900/5 transition-all duration-300"
                        >
                            Personal Stylist
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;