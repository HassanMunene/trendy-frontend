import {
    productDatabase,
    collections,
    bestSellers,
    newArrivals,
    testimonials
} from "../Mocks/mockData";

// Simulate Api delay
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 300));

export const fetchCollections = async () => {
    await simulateDelay();
    return collections;
};

export const fetchBestSellers = async () => {
    await simulateDelay();
    return bestSellers;
};

export const fetchNewArrivals = async () => {
    await simulateDelay();
    return newArrivals;
};

export const fetchTestimonials = async () => {
    await simulateDelay();
    return testimonials;
}

export const fetchProductDetails = async (productId) => {
    await simulateDelay();
    return productDatabase[productId] || null;
}

export const fetchAllProducts = async () => {
    await simulateDelay();
    return Object.values(productDatabase);
}