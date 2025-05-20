import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Enhanced product data with better images and descriptions
const productData = [
	{
		id: 1,
		name: 'Luxe Sateen Pillow Set',
		category: 'pillows',
		subcategory: 'sateen',
		price: 149.00,
		salePrice: 126.65,
		isNew: false,
		isBestSeller: true,
		colors: ['white', 'cream', 'graphite', 'navy', 'sage'],
		description: '400-thread count sateen with a silky smooth finish',
		image: 'https://images.unsplash.com/photo-1616627561839-074385245ff6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
		hoverImage: 'https://images.unsplash.com/photo-1566669437688-37f7c4c9d1a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
		details: [
			'100% long-staple Egyptian cotton',
			'Oeko-Tex certified',
			'Machine washable',
			'30-day satisfaction guarantee'
		]
	},
	// ... (other products with similar enhanced structure)
];

// Category options
const categories = [
	{ id: 'all', name: 'All Collections' },
	{ id: 'pillows', name: 'Luxury Pillows' },
	{ id: 'curtains', name: 'Designer Curtains' },
	{ id: 'bundles', name: 'Complete Sets' }
];

// Filters
const subcategories = [
	{ id: 'sateen', name: 'Sateen Weave', category: 'pillows' },
	{ id: 'percale', name: 'Percale Weave', category: 'pillows' },
	{ id: 'plush', name: 'Plush Fill', category: 'pillows' },
	{ id: 'silk', name: 'Silk Blend', category: 'pillows' },
	{ id: 'blackout', name: 'Blackout', category: 'curtains' },
	{ id: 'sheer', name: 'Sheer Voile', category: 'curtains' },
	{ id: 'linen', name: 'European Linen', category: 'curtains' }
];

// Sort options
const sortOptions = [
	{ value: 'recommended', label: 'Recommended' },
	{ value: 'newest', label: 'New Arrivals' },
	{ value: 'price-low-high', label: 'Price: Low to High' },
	{ value: 'price-high-low', label: 'Price: High to Low' },
	{ value: 'best-sellers', label: 'Best Sellers' }
];


const ProductsPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const queryParams = new URLSearchParams(location.search);

	// State for filters
	const [selectedCategory, setSelectedCategory] = useState(queryParams.get('category') || 'all');
	const [selectedSubcategory, setSelectedSubcategory] = useState(queryParams.get('subcategory') || '');
	const [selectedSort, setSelectedSort] = useState(queryParams.get('sort') || 'recommended');
	const [showFilters, setShowFilters] = useState(false);
	const [filteredProducts, setFilteredProducts] = useState(productData);
	const [hoveredProductId, setHoveredProductId] = useState(null);
	const [quickViewProduct, setQuickViewProduct] = useState(null);

	// Filter products based on selected options
	useEffect(() => {
		let filtered = [...productData];

		// Category filter
		if (selectedCategory !== 'all') {
			filtered = filtered.filter(product => product.category === selectedCategory);
		}

		// Subcategory filter
		if (selectedSubcategory) {
			filtered = filtered.filter(product => product.subcategory === selectedSubcategory);
		}

		// Sort products
		switch (selectedSort) {
			case 'newest':
				filtered = filtered.filter(product => product.isNew)
					.concat(filtered.filter(product => !product.isNew));
				break;
			case 'price-low-high':
				filtered.sort((a, b) => a.salePrice - b.salePrice);
				break;
			case 'price-high-low':
				filtered.sort((a, b) => b.salePrice - a.salePrice);
				break;
			case 'best-sellers':
				filtered = filtered.filter(product => product.isBestSeller)
					.concat(filtered.filter(product => !product.isBestSeller));
				break;
			default:
				// For recommended, show best sellers first
				filtered = filtered.filter(product => product.isBestSeller)
					.concat(filtered.filter(product => !product.isBestSeller));
		}

		setFilteredProducts(filtered);

		// Update URL with filters
		const params = new URLSearchParams();
		if (selectedCategory !== 'all') params.set('category', selectedCategory);
		if (selectedSubcategory) params.set('subcategory', selectedSubcategory);
		if (selectedSort !== 'recommended') params.set('sort', selectedSort);

		navigate(`${location.pathname}?${params.toString()}`, { replace: true });
	}, [selectedCategory, selectedSubcategory, selectedSort, navigate, location.pathname]);

	// Get available subcategories for the selected category
	const availableSubcategories = subcategories.filter(
		sub => sub.category === selectedCategory
	);

	return (
		<div className="bg-white min-h-screen">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				{/* Page Header - Simplified */}
				<div className="mb-12">
					<h1 className="text-3xl font-serif font-bold text-gray-900">
						{selectedSubcategory
							? subcategories.find(sub => sub.id === selectedSubcategory)?.name
							: selectedCategory !== 'all'
								? categories.find(cat => cat.id === selectedCategory)?.name
								: 'Our Collections'}
					</h1>
					<p className="mt-2 text-gray-600">
						{filteredProducts.length} premium products
					</p>
				</div>

				{/* Mobile Filter Toggle */}
				<div className="lg:hidden mb-8 flex justify-between items-center">
					<button
						onClick={() => setShowFilters(!showFilters)}
						className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
					>
						<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
						</svg>
						Filters
					</button>
					<div className="flex items-center">
						<select
							value={selectedSort}
							onChange={(e) => setSelectedSort(e.target.value)}
							className="text-sm border-gray-200 rounded-lg py-1.5 pl-3 pr-8 focus:border-rose-500 focus:ring-rose-500"
						>
							{sortOptions.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className="flex flex-col lg:flex-row gap-8">
					{/* Sidebar Filters - Desktop */}
					<aside className="hidden lg:block w-72 shrink-0">
						<div className="sticky top-24 space-y-8">
							{/* Categories */}
							<div>
								<h3 className="font-serif text-lg font-medium text-gray-900 mb-4">Categories</h3>
								<ul className="space-y-2">
									{categories.map((category) => (
										<li key={category.id}>
											<button
												onClick={() => {
													setSelectedCategory(category.id);
													setSelectedSubcategory('');
												}}
												className={`w-full text-left py-2 px-4 rounded-lg transition-colors ${selectedCategory === category.id
													? 'bg-rose-50 text-rose-700 font-medium border border-rose-100'
													: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
													}`}
											>
												{category.name}
											</button>
										</li>
									))}
								</ul>
							</div>

							{/* Subcategories */}
							{availableSubcategories.length > 0 && (
								<div>
									<h3 className="font-serif text-lg font-medium text-gray-900 mb-4">Types</h3>
									<ul className="space-y-2">
										<li>
											<button
												onClick={() => setSelectedSubcategory('')}
												className={`w-full text-left py-2 px-4 rounded-lg transition-colors ${!selectedSubcategory
													? 'bg-rose-50 text-rose-700 font-medium border border-rose-100'
													: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
													}`}
											>
												All Types
											</button>
										</li>
										{availableSubcategories.map((subcategory) => (
											<li key={subcategory.id}>
												<button
													onClick={() => setSelectedSubcategory(subcategory.id)}
													className={`w-full text-left py-2 px-4 rounded-lg transition-colors ${selectedSubcategory === subcategory.id
														? 'bg-rose-50 text-rose-700 font-medium border border-rose-100'
														: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
														}`}
												>
													{subcategory.name}
												</button>
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					</aside>

					{/* Mobile Filters */}
					{showFilters && (
						<div className="fixed inset-0 z-40 lg:hidden">
							<div className="absolute inset-0 bg-black bg-opacity-25" onClick={() => setShowFilters(false)} />
							<div className="absolute inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl overflow-y-auto">
								<div className="p-6">
									<div className="flex items-center justify-between">
										<h2 className="text-lg font-medium text-gray-900">Filters</h2>
										<button
											type="button"
											onClick={() => setShowFilters(false)}
											className="-mr-2 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-500"
										>
											<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
											</svg>
										</button>
									</div>

									{/* Mobile filter content */}
									<div className="mt-8">
										<div className="space-y-6">
											<div>
												<h3 className="font-medium text-gray-900">Categories</h3>
												<ul className="mt-2 space-y-2">
													{categories.map((category) => (
														<li key={category.id}>
															<button
																onClick={() => {
																	setSelectedCategory(category.id);
																	setSelectedSubcategory('');
																	setShowFilters(false);
																}}
																className={`w-full text-left py-2 px-3 rounded-lg transition-colors ${selectedCategory === category.id
																	? 'bg-rose-50 text-rose-700 font-medium'
																	: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
																	}`}
															>
																{category.name}
															</button>
														</li>
													))}
												</ul>
											</div>

											{availableSubcategories.length > 0 && (
												<div>
													<h3 className="font-medium text-gray-900">Types</h3>
													<ul className="mt-2 space-y-2">
														{availableSubcategories.map((subcategory) => (
															<li key={subcategory.id}>
																<button
																	onClick={() => {
																		setSelectedSubcategory(subcategory.id);
																		setShowFilters(false);
																	}}
																	className={`w-full text-left py-2 px-3 rounded-lg transition-colors ${selectedSubcategory === subcategory.id
																		? 'bg-rose-50 text-rose-700 font-medium'
																		: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
																		}`}
																>
																	{subcategory.name}
																</button>
															</li>
														))}
													</ul>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					)}

					{/* Main Content */}
					<div className="flex-1">
						{/* Products Grid */}
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
							{filteredProducts.map((product) => (
								<div key={product.id} className="group relative">
									<div className="absolute -inset-2 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
									<div className="relative h-full z-10">
										<Link to={`/products/${product.id}`} className="block">
											<div className="relative overflow-hidden rounded-xl aspect-[3/4] bg-gray-50">
												<img
													src={hoveredProductId === product.id ? product.hoverImage : product.image}
													alt={product.name}
													className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
													loading="lazy"
													onMouseEnter={() => setHoveredProductId(product.id)}
													onMouseLeave={() => setHoveredProductId(null)}
												/>
												<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

												{/* Badges */}
												<div className="absolute top-4 left-4 flex flex-col space-y-2">
													{product.isNew && (
														<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-rose-700 border border-rose-200">
															New
														</span>
													)}
													{product.isBestSeller && (
														<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
															Best Seller
														</span>
													)}
													{product.salePrice < product.price && (
														<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-rose-600 text-white">
															Sale
														</span>
													)}
												</div>
											</div>
										</Link>

										<div className="mt-4">
											<h3 className="font-serif text-lg font-medium text-gray-900 group-hover:text-rose-700 transition-colors">
												<Link to={`/products/${product.id}`}>{product.name}</Link>
											</h3>
											<p className="mt-1 text-sm text-gray-500">{product.description}</p>

											<div className="mt-3 flex items-center justify-between">
												<div>
													{product.salePrice < product.price ? (
														<>
															<span className="font-serif font-bold text-gray-900">${product.salePrice.toFixed(2)}</span>
															<span className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
														</>
													) : (
														<span className="font-serif font-bold text-gray-900">${product.price.toFixed(2)}</span>
													)}
												</div>

												<div className="flex -space-x-1">
													{product.colors.slice(0, 4).map((color) => (
														<div
															key={color}
															className="w-5 h-5 rounded-full border-2 border-white shadow-sm transition-transform duration-200 hover:scale-125"
															style={{
																backgroundColor: color === 'white' ? '#ffffff' :
																	color === 'cream' ? '#f5f5dc' :
																		color === 'graphite' ? '#4d4d4d' :
																			color === 'navy' ? '#000080' :
																				color === 'sage' ? '#9CAF88' :
																					color === 'dune' ? '#C2B280' :
																						color === 'sienna' ? '#A0522D' :
																							color === 'marled-black' ? '#333' : '#ccc'
															}}
															title={color}
														/>
													))}
													{product.colors.length > 4 && (
														<div className="w-5 h-5 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-500">
															+{product.colors.length - 4}
														</div>
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Empty State */}
						{filteredProducts.length === 0 && (
							<div className="text-center py-16">
								<svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
								<p className="text-gray-600 mb-6">Try adjusting your filters to find what you're looking for.</p>
								<button
									onClick={() => {
										setSelectedCategory('all');
										setSelectedSubcategory('');
									}}
									className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium"
								>
									Clear All Filters
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductsPage;