import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

import { fetchBestSellers } from '../../../api/api';

const BestSellers = () => {
    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetchBestSellers();
                setBestSellers(response);
            } catch (error) {
                console.log("Error fetching best sellers", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);
    return (
        <div className="container mx-auto max-w-8xl space-y-6">
            <section className="mb-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
                    <div className="mb-6 md:mb-0">
                        <p className="text-md text-gray-900">Our most loved products by our clients</p>
                    </div>
                    <Link to="/products?sort=bestsellers" className="hidden md:flex items-center md:text-md font-medium text-rose-700 hover:text-rose-800 transition-colors group">
                        <span className="border-b group-hover:border-rose-700 transition-all">
                            View all best sellers
                        </span>
                        <ChevronRight className='h-5 w-5' />
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {bestSellers.map((product) => (
                        <div key={product.id} className="group relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-amber-50 to-rose-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                            <div className="relative h-full z-10 bg-white rounded-xl p-2 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <Link to={`/products/${product.id}`} className="block mb-4">
                                    <div className="relative overflow-hidden rounded-lg aspect-[1/1] bg-gray-50">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center">
                                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            Best Seller
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
                                    <Link
                                        to={`/products/${product.id}`}
                                        className="inline-flex items-center text-xs font-medium text-rose-700 hover:text-rose-800 border-b border-transparent hover:border-rose-700 transition-all"
                                    >
                                        Discover why customers love this
                                        <svg className="w-3 h-3 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default BestSellers;