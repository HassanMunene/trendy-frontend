import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart } from 'lucide-react';

import NoProductFound from './NoProductFoundComponent';
import { productDatabase } from '../../Mocks/mockData';

const ProductDetailPage = () => {
    const { productId } = useParams();
    const product = productDatabase[productId];

    // State management ]
    const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('details');

    // Handle color selection with safety checks
    const handleColorSelect = (color) => {
        if (color.inStock) {
            setSelectedColor(color);
        }
    };

    // Handle quantity changes with boundaries
    const handleQuantityChange = (newQuantity) => {
        const validatedQuantity = Math.max(1, Math.min(10, newQuantity));
        setQuantity(validatedQuantity);
    };

    // Image navigation with circular looping
    const navigateImage = (direction) => {
        if (!product?.images?.length) return;

        setCurrentImageIndex(prevIndex => {
            if (direction === 'next') {
                return (prevIndex + 1) % product.images.length;
            } else {
                return (prevIndex - 1 + product.images.length) % product.images.length;
            }
        });
    };

    // Add to cart functionality
    const handleAddToCart = () => {
        if (!selectedColor?.inStock) return;
        console.log("handling adding to cart..")
    };

    // Handle buy now action
    const handleBuyNow = () => {
        console.log("Handling buy now!");
    };

    // If product not found
    if (!product) { return <NoProductFound />; }

    // Render stars for ratings
    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(product.rating);
        const hasHalfStar = product.rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<StarIcon key={`full-${i}`} className="w-5 h-5 text-amber-400" />);
        }

        if (hasHalfStar) {
            stars.push(<StarIcon key="half" className="w-5 h-5 text-amber-400" />);
        }

        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<StarIcon key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
        }

        return stars;
    };

    return (
        <div className="bg-gradient-to-b from-rose-50 to-white min-h-screen">
            {/* Main Product Section */}
            <div className="mx-auto px-4 py-8">
                <div className="bg-white rounded-sm shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                        {/* Product Image section */}
                        <div className="relative">
                            {/* Main Image */}
                            <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-50 mb-4">
                                <img
                                    src={product.images[currentImageIndex]}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-opacity duration-300"
                                    loading="eager"
                                />

                                {/* Navigation Arrows */}
                                {product.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => navigateImage('prev')}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 shadow-md hover:bg-rose-500 transition-colors"
                                            style={{ borderRadius: '50%' }}
                                            aria-label="Previous image"
                                        >
                                            <ChevronLeft className="w-6 h-6 text-gray-800" />
                                        </button>
                                        <button
                                            onClick={() => navigateImage('next')}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-md hover:bg-rose-500 transition-colors"
                                            style={{ borderRadius: '50%' }}
                                            aria-label="Next image"
                                        >
                                            <ChevronRight className="w-6 h-6 text-gray-800" />
                                        </button>
                                    </>
                                )}

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                                    {product.isNew && (
                                        <span className="bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                            New Arrival
                                        </span>
                                    )}
                                    {product.isBestSeller && (
                                        <span className="bg-amber-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                                            Best Seller
                                        </span>
                                    )}
                                    {product.salePrice < product.price && (
                                        <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                            {Math.round((1 - product.salePrice / product.price) * 100)}% Off
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Thumbnail Gallery */}
                            {product.images.length > 1 && (
                                <div className="grid grid-cols-4 gap-3">
                                    {product.images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`aspect-square overflow-hidden border-2 transition-all ${currentImageIndex === index ? 'border-rose-500 scale-105' : 'border-transparent hover:border-gray-300'}`}
                                            style={{ borderRadius: '10px' }}
                                            aria-label={`View image ${index + 1}`}
                                        >
                                            <img
                                                src={image}
                                                alt={`${product.name} thumbnail ${index + 1}`}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info section */}
                        <div className="py-4">
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                                <div className="mb-6">
                                    <div className="flex items-center">
                                        <span className="text-2xl font-bold text-gray-900 mr-3">ksh {product.salePrice.toFixed(2)}</span>
                                        {product.salePrice < product.price && (
                                            <span className="text-lg text-gray-500 line-through">ksh {product.price.toFixed(2)}</span>
                                        )}
                                    </div>
                                </div>

                                <p className="text-gray-700 mb-6">{product.description}</p>
                            </div>

                            {/* Color Selection */}
                            <div className="mb-8">
                                <h3 className="text-sm font-medium text-gray-900 mb-3">
                                    Available colors: <span className="capitalize">{selectedColor?.name || 'Not selected'}</span>
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.colors.map((color) => (
                                        <button
                                            key={color.name}
                                            onClick={() => handleColorSelect(color)}
                                            disabled={!color.inStock}
                                            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${selectedColor?.name === color.name
                                                ? 'border-rose-500 scale-110'
                                                : 'border-transparent hover:border-gray-300'
                                                } ${!color.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            title={`${color.name}${!color.inStock ? ' (Out of stock)' : ''}`}
                                            aria-label={`Select ${color.name} color${!color.inStock ? ' (Out of stock)' : ''}`}
                                        >
                                            <div className="w-8 h-8 rounded-full border border-gray-200" style={{ backgroundColor: color.hex, borderRadius: '50%' }}></div>
                                        </button>
                                    ))}
                                </div>
                                {selectedColor && !selectedColor.inStock && (
                                    <p className="mt-2 text-sm text-rose-600">This color is currently out of stock</p>
                                )}
                            </div>

                            {/* Quantity Selector */}
                            <div className="mb-8">
                                <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
                                <div className="flex items-center max-w-xs">
                                    <button
                                        onClick={() => handleQuantityChange(quantity - 1)}
                                        disabled={quantity <= 1}
                                        className="w-12 h-12 flex items-center justify-center border border-black rounded-l-lg bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        aria-label="Decrease quantity"
                                    >
                                        <Minus color='black' />
                                    </button>
                                    <div className="w-16 h-12 flex items-center justify-center border-t border-b border-gray-300 bg-white text-gray-900 font-medium">
                                        {quantity}
                                    </div>
                                    <button
                                        onClick={() => handleQuantityChange(quantity + 1)}
                                        disabled={quantity >= 10}
                                        className="w-12 h-12 flex items-center justify-center border border-black rounded-r-lg bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        aria-label="Increase quantity"
                                    >
                                        <Plus />
                                    </button>
                                </div>
                            </div>

                            {/* Add to Cart */}
                            <div className="flex flex-col max-w-md">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={!selectedColor?.inStock}
                                    className={`w-full py-4 px-6 rounded-lg font-medium flex items-center justify-center transition-all ${selectedColor?.inStock
                                        ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white hover:opacity-90 shadow-md hover:shadow-lg'
                                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    {selectedColor?.inStock ? 'Add to Cart' : 'Out of Stock'}
                                </button>

                                <button
                                    onClick={handleBuyNow}
                                    disabled={!selectedColor?.inStock}
                                    className={`w-full mt-3 py-4 px-6 rounded-lg font-medium border-2 transition-all ${selectedColor?.inStock
                                        ? 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                                        : 'border-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Product Details Tabs */}
                    <div className="mt-12">
                        {/* Tab Navigation */}
                        <div className="border-b border-gray-200">
                            <nav className="flex -mb-px space-x-8 px-6">
                                <button
                                    onClick={() => setActiveTab('details')}
                                    className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors duration-200 ${activeTab === 'details'
                                            ? 'border-rose-600 text-rose-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <span className="flex items-center">
                                        <svg
                                            className={`w-5 h-5 mr-2 ${activeTab === 'details' ? 'text-rose-600' : 'text-gray-400'
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        Product Details
                                    </span>
                                </button>

                                <button
                                    onClick={() => setActiveTab('shipping')}
                                    className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors duration-200 ${activeTab === 'shipping'
                                            ? 'border-rose-600 text-rose-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <span className="flex items-center">
                                        <svg
                                            className={`w-5 h-5 mr-2 ${activeTab === 'shipping' ? 'text-rose-600' : 'text-gray-400'
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                                            />
                                        </svg>
                                        Shipping & Returns
                                    </span>
                                </button>
                            </nav>
                        </div>

                        {/* Tab Content */}
                        <div className="py-8">
                            {/* Details Tab */}
                            {activeTab === 'details' && (
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Features */}
                                        <div className="bg-gray-50 p-6 rounded-lg">
                                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                                <svg
                                                    className="w-5 h-5 text-rose-500 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                                    />
                                                </svg>
                                                Key Features
                                            </h3>
                                            <ul className="space-y-3">
                                                {product.details.map((detail, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-start pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                                                    >
                                                        <svg
                                                            className="flex-shrink-0 h-5 w-5 text-rose-500 mr-2 mt-0.5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M5 13l4 4L19 7"
                                                            />
                                                        </svg>
                                                        <span className="text-gray-700">{detail}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Specifications */}
                                        <div className="bg-gray-50 p-6 rounded-lg">
                                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                                <svg
                                                    className="w-5 h-5 text-rose-500 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                    />
                                                </svg>
                                                Specifications
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="pb-3 border-b border-gray-100">
                                                    <h4 className="text-sm font-medium text-gray-500">Materials</h4>
                                                    <p className="mt-1 text-gray-700">{product.materials}</p>
                                                </div>
                                                <div className="pb-3 border-b border-gray-100">
                                                    <h4 className="text-sm font-medium text-gray-500">Dimensions</h4>
                                                    <p className="mt-1 text-gray-700">{product.dimensions}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500">
                                                        Care Instructions
                                                    </h4>
                                                    <p className="mt-1 text-gray-700">{product.care}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Additional Info */}
                                    <div className="bg-rose-50 p-6 rounded-lg border border-rose-100">
                                        <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                                            <svg
                                                className="w-5 h-5 text-rose-600 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                                />
                                            </svg>
                                            Important Information
                                        </h3>
                                        <p className="text-gray-700">
                                            This product is handcrafted and may have slight variations that make
                                            each piece unique. Please allow 1-2 business days for order
                                            processing before shipment.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Shipping Tab */}
                            {activeTab === 'shipping' && (
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Shipping Info */}
                                        <div className="bg-gray-50 p-6 rounded-lg">
                                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                                <svg
                                                    className="w-5 h-5 text-rose-500 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                                                    />
                                                </svg>
                                                Shipping Information
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="pb-3 border-b border-gray-100">
                                                    <h4 className="text-sm font-medium text-gray-500">
                                                        Processing Time
                                                    </h4>
                                                    <p className="mt-1 text-gray-700">
                                                        Orders are typically processed within 1-2 business days.
                                                    </p>
                                                </div>
                                                <div className="pb-3 border-b border-gray-100">
                                                    <h4 className="text-sm font-medium text-gray-500">
                                                        Delivery Time
                                                    </h4>
                                                    <p className="mt-1 text-gray-700">
                                                        3-5 business days via premium carriers.
                                                    </p>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500">
                                                        Free Shipping
                                                    </h4>
                                                    <p className="mt-1 text-gray-700">
                                                        Available on all orders over $100.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Returns Info */}
                                        <div className="bg-gray-50 p-6 rounded-lg">
                                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                                <svg
                                                    className="w-5 h-5 text-rose-500 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                    />
                                                </svg>
                                                Returns Policy
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="pb-3 border-b border-gray-100">
                                                    <h4 className="text-sm font-medium text-gray-500">
                                                        Satisfaction Guarantee
                                                    </h4>
                                                    <p className="mt-1 text-gray-700">
                                                        30-day return window from delivery date.
                                                    </p>
                                                </div>
                                                <div className="pb-3 border-b border-gray-100">
                                                    <h4 className="text-sm font-medium text-gray-500">
                                                        Condition
                                                    </h4>
                                                    <p className="mt-1 text-gray-700">
                                                        Must be in original condition with tags attached.
                                                    </p>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500">
                                                        Refund Method
                                                    </h4>
                                                    <p className="mt-1 text-gray-700">
                                                        Original payment method within 5-7 business days.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="bg-rose-50 p-6 rounded-lg border border-rose-100">
                                        <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                                            <svg
                                                className="w-5 h-5 text-rose-600 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                />
                                            </svg>
                                            Need Help?
                                        </h3>
                                        <p className="text-gray-700 mb-4">
                                            Our customer service team is available to answer any questions about
                                            shipping or returns.
                                        </p>
                                        <button className="text-rose-600 hover:text-rose-800 font-medium flex items-center">
                                            Contact Us
                                            <svg
                                                className="w-4 h-4 ml-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Complete Your Collection</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Object.values(productDatabase).filter(p => p.id !== product.id && p.category === product.category).slice(0, 4).map((relatedProduct) => (
                            <div key={relatedProduct.id} className="group">
                                <Link to={`/products/${relatedProduct.id}`} className="block">
                                    <div className="relative overflow-hidden rounded-xl mb-4 aspect-square bg-gray-50">
                                        <img
                                            src={relatedProduct.images[0]}
                                            alt={relatedProduct.name}
                                            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        {relatedProduct.isNew && (
                                            <div className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                                New
                                            </div>
                                        )}
                                        {relatedProduct.isBestSeller && (
                                            <div className="absolute top-3 right-3 bg-amber-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                                                Best Seller
                                            </div>
                                        )}
                                    </div>
                                </Link>

                                <div className="p-2">
                                    <h3 className="font-semibold text-lg text-gray-900 mb-1 group-hover:text-rose-700 transition-colors">
                                        <Link to={`/products/${relatedProduct.id}`}>{relatedProduct.name}</Link>
                                    </h3>
                                    <div className="flex items-center mb-3">
                                        <span className="font-bold text-gray-900 mr-2">ksh {relatedProduct.salePrice.toFixed(2)}</span>
                                        {relatedProduct.salePrice < relatedProduct.price && (
                                            <span className="text-gray-500 text-sm line-through">ksh {relatedProduct.price.toFixed(2)}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;