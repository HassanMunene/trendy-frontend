import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchCollections } from '../../../api/api';

const OurCollections = () => {
    const [collections, setCollections] = useState([]);
    const [loadingCollections, setLoadingCollections] = useState(false);
    const [errorLoadingCollections, setErrorLoadingCollections] = useState(null);
    const [expandedDescriptions, setExpandedDescriptions] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingCollections(true);
                const response = await fetchCollections();
                setCollections(response);
                // we need to keep tab if the collections in our reponse are expanded or not
                const initialExpandedState = response.reduce((accumulator, collection) => {
                    accumulator[collection.id] = false;
                    return accumulator;
                }, {});
                setExpandedDescriptions(initialExpandedState);
            } catch (error) {
                console.log("error Loading collection", error);
                setErrorLoadingCollections(error.message)
            } finally {
                setLoadingCollections(false);
            }
        }

        fetchData();
    }, []);

    const truncateDescription = (text, maxLength = 120) => {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    // toggle the description of each card to expand it to view more details.
    const toggleDescription = (collectionID) => {
        setExpandedDescriptions(prev => (
            {
                ...prev,
                [collectionID]: !prev[collectionID]
            }
        ));
    }

    if (loadingCollections) return <div className="text-center py-20">Loading collections...</div>;
    if (errorLoadingCollections) return <div className="text-center py-20 text-rose-600">Error loading collections: {errorLoadingCollections}</div>;
    if (!collections.length) return <div className="text-center py-20">No collections found</div>;

    return (
        <div className="container mx-auto max-w-7xl space-y-6">
            {collections.map((collection) => (
                <section key={collection.id} className="group/collection">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {collection.products.map((product) => (
                            <div key={product.id} className="group relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-amber-50 to-rose-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                                <div className="relative h-full z-10 bg-white rounded-xl p-2 shadow-sm hover:shadow-md transition-shadow duration-300">
                                    {/* Product Image */}
                                    <Link to={`/products/${product.id}`} className="block mb-4">
                                        <div className="relative overflow-hidden rounded-xl mb-4 aspect-[1/1] bg-gray-50">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            {product.salePrice && (
                                                <div className="absolute top-3 right-3 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                                    Sale
                                                </div>
                                            )}
                                        </div>
                                    </Link>

                                    {/* Product Details */}
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
                                            <div className="flex items-center">
                                                <div className="flex -space-x-1.5">
                                                    {product.colors.slice(0, 4).map((color) => (
                                                        <div
                                                            key={color}
                                                            className="w-5 h-5 rounded-full border border-white shadow-xs transition-transform duration-200 hover:scale-125 hover:z-10"
                                                            style={{
                                                                backgroundColor: color === 'white' ? '#ffffff' :
                                                                    color === 'cream' ? '#f5f5dc' :
                                                                        color === 'graphite' ? '#4d4d4d' :
                                                                            color === 'navy' ? '#000080' :
                                                                                color === 'sage' ? '#9CAF88' :
                                                                                    color === 'ivory' ? '#FFFFF0' :
                                                                                        color === 'charcoal' ? '#36454F' :
                                                                                            color === 'blush' ? '#DE5D83' :
                                                                                                color === 'taupe' ? '#483C32' :
                                                                                                    color === 'natural' ? '#E1C9B5' :
                                                                                                        color === 'stone' ? '#928E85' :
                                                                                                            color === 'grey' ? '#808080' :
                                                                                                                color === 'blue' ? '#0000FF' :
                                                                                                                    color === 'camel' ? '#C19A6B' :
                                                                                                                        color === 'oatmeal' ? '#D3C9B5' : '#ccc'
                                                            }}
                                                            title={color}
                                                        ></div>
                                                    ))}
                                                </div>
                                                {product.colors.length > 4 && (
                                                    <span className="text-xs text-gray-500 ml-1.5">+{product.colors.length - 4} more</span>
                                                )}
                                            </div>
                                            <Link
                                                to={`/products/${product.id}`}
                                                className="text-xs font-medium text-rose-700 hover:text-rose-800 flex items-center"
                                            >
                                                Details
                                                <svg className="w-3 h-3 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    )
}

export default OurCollections;