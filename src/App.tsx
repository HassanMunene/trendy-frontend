import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import { AuthProvider } from './context/AuthContext';
import { MobileProvider } from './context/MobileContext';
import ProtectedRoute from './Components/ProtectedRoute';
import MainLayout from './Layouts/MainLayout';
import LoadingScreen from './Components/LoadingScreen';

// Main Layout pages
const HomePage = lazy(() => import('./Pages/MainLayout/HomePage/index'));
const ProductsPage = lazy(() => import('./Pages/MainLayout/ProductsPage'))
const ProductDetailPage = lazy(() => import('./Pages/MainLayout/ProductDetailPage'));
const CartPage = lazy(() => import('./Pages/MainLayout/CartPage'));

// Login and Register pages
const LoginPage = lazy(() => import('./Pages/Authentication/LoginPage'));
const RegistePage = lazy(() => import('./Pages/Authentication/RegisterPage'));

// Admin pages
const AdminLayout = lazy(() => import('./Pages/Admin/AdminLayout'));
const DashboardPage = lazy(() => import('./Pages/Admin/DashboardPage'));
const ProfilePage = lazy(() => import('./Pages/Admin/ProfilePage/ProfilePage'));
const MessagesPage = lazy(() => import('./Pages/Admin/MessagesPage/index'));
const OrdersPage = lazy(() => import('./Pages/Admin/OrdersPage'));
const AdminProductsPage = lazy(() => import('./Pages/Admin/AdminProductsPage'));
const CustomersPage = lazy(() => import('./Pages/Admin/CustomersPage'));
const CategoriesPage = lazy(() => import('./Pages/Admin/CategoriesPage'));

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<MobileProvider>
					{/* Suspense is used to show a fallback loading while the component is being loaded */}
					<Suspense fallback={<LoadingScreen />}>
						{/* This is the main layouts page */}
						<Routes>
							<Route path="/" element={<MainLayout />}>
								<Route index element={<HomePage />} />
								<Route path="products" element={<ProductsPage />} />
								<Route path="products/:productId" element={<ProductDetailPage />} />
								<Route path="/cart" element={<CartPage />} />
							</Route>

							{/* Authentication Routes */}
							<Route path='/login' element={<LoginPage />} />
							<Route path="/register" element={<RegistePage />} />

							{/* the next one is the admin layout page */}
							<Route element={<ProtectedRoute />}>
								<Route path='/admin' element={<AdminLayout />}>
									<Route index element={<DashboardPage />} />
									<Route path='profile' element={<ProfilePage />} />
									<Route path="messages" element={<MessagesPage />} />
									<Route path='orders' element={<OrdersPage />} />
									<Route path='products' element={<AdminProductsPage />} />
									<Route path='customers' element={<CustomersPage />} />
									<Route path="categories" element={<CategoriesPage />} />
								</Route>
							</Route>
						</Routes>
					</Suspense>
				</MobileProvider>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App
