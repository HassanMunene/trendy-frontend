import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

import { fetchNewArrivals } from "../../../api/api";


const NewArrivals = () => {
    const [newArrivals, setNewArrivals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetchNewArrivals();
                setNewArrivals(response);
            } catch (error) {
                console.log("error fetching new arrivals", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <section className="container mx-auto max-w-8xl space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
                <div className="mb-6 md:mb-0">
                    <p className="text-md text-gray-600">Fresh additions to elevate your home</p>
                </div>
                <Link to="/products?sort=newest" className="flex items-center text-base md:text-md font-medium text-rose-700 hover:text-rose-800 transition-colors group">
                    <span className="border-b group-hover:border-rose-700 transition-all">
                        View all new arrivals
                    </span>
                    <ChevronRight className="h-5 w-5" />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {newArrivals.map((product) => (
                    <div key={product.id} className="group relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-50 to-rose-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                        <div className="relative h-full z-10 bg-white rounded-xl p-2 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <Link to={`/products/${product.id}`} className="block">
                                <div className="relative overflow-hidden rounded-xl mb-4 aspect-[1/1] bg-gray-50">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute top-3 left-3 bg-white text-rose-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center">
                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        New Arrival
                                    </div>
                                </div>
                            </Link>

                            <div className="px-1">
                                <h3 className="font-serif text-lg font-semibold text-gray-900 mb-1.5 group-hover:text-rose-700 transition-colors duration-200">
                                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                                </h3>
                                <div className="flex items-center mb-3">
                                    {product.salePrice ? (
                                        <>
                                            <span className="font-bold text-gray-900 text-base mr-2">ksh {product.salePrice.toFixed(2)}</span>
                                            <span className="text-gray-500 text-xs line-through">ksh {product.price.toFixed(2)}</span>
                                        </>
                                    ) : (
                                        <span className="font-bold text-gray-900 text-base">ksh {product.price.toFixed(2)}</span>
                                    )}
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-xs text-gray-500">
                                        Limited stock available
                                    </div>
                                    <Link to={`/products/${product.id}`} className="text-xs font-medium !text-rose-700 !hover:text-rose-800 flex items-center">
                                        Shop now
                                        <ChevronRight className="w-3 h-3 ml-0.5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default NewArrivals;