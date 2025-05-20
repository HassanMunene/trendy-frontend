import React from 'react';
import { ArrowLeft } from 'lucide-react';

const NoProductFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center p-4">
            <div className="text-center max-w-md p-8 bg-white rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
                <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
                <button
                    onClick={() => navigate('/products')}
                    className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium inline-flex items-center"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Products
                </button>
            </div>
        </div>
    )
}

export default NoProductFound;