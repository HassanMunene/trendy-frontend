import { useState } from 'react';
import {
    ArrowUpRight, ArrowDownRight, DollarSign, ShoppingBag,
    Users, Percent, Calendar, ChevronDown,
    Package, Tag, User, Users2, Settings,
    LogOut, Map, PieChart, LineChart,
    BarChart2, ShoppingCart, CheckCircle2,
    Clock, Truck, AlertCircle, MoreHorizontal
} from 'lucide-react';

// Mock data
const recentOrders = [
    { id: '#12345', customer: 'Sarah Johnson', date: '2025-04-12', status: 'Completed', total: '$149.00' },
    { id: '#12344', customer: 'Michael Smith', date: '2025-04-12', status: 'Processing', total: '$89.00' },
    { id: '#12343', customer: 'Emma Davis', date: '2025-04-11', status: 'Shipped', total: '$210.00' },
    { id: '#12342', customer: 'James Wilson', date: '2025-04-11', status: 'Completed', total: '$178.50' },
    { id: '#12341', customer: 'Olivia Brown', date: '2025-04-10', status: 'Processing', total: '$325.00' }
];

const topProducts = [
    { id: 1, name: 'Luxe Sateen Core Sheet Set', sales: 142, revenue: '$21,158.00' },
    { id: 2, name: 'Classic Percale Sheet Set', sales: 98, revenue: '$14,112.00' },
    { id: 3, name: 'Super-Plush Bath Towels', sales: 87, revenue: '$3,915.00' },
    { id: 4, name: 'Down Comforter', sales: 64, revenue: '$12,736.00' },
    { id: 5, name: 'Washed Linen Duvet Cover', sales: 58, revenue: '$8,642.00' }
];

const StatCard = ({ title, value, change, isPositive, icon }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="text-2xl font-semibold mt-2 text-gray-900">{value}</p>
                    <div className={`flex items-center mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        <span className="text-sm font-medium">{change}</span>
                        {isPositive ? (
                            <ArrowUpRight className="h-4 w-4 ml-1" />
                        ) : (
                            <ArrowDownRight className="h-4 w-4 ml-1" />
                        )}
                    </div>
                </div>
                <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                    {icon}
                </div>
            </div>
        </div>
    );
};

const StatusBadge = ({ status }) => {
    const statusConfig = {
        Completed: { color: 'bg-green-100 text-green-800', icon: <CheckCircle2 className="h-4 w-4 mr-1" /> },
        Processing: { color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="h-4 w-4 mr-1" /> },
        Shipped: { color: 'bg-blue-100 text-blue-800', icon: <Truck className="h-4 w-4 mr-1" /> },
        Cancelled: { color: 'bg-red-100 text-red-800', icon: <AlertCircle className="h-4 w-4 mr-1" /> }
    };

    return (
        <span className={`px-2.5 py-1 inline-flex items-center text-xs leading-4 font-medium rounded-full ${statusConfig[status]?.color || 'bg-gray-100 text-gray-800'}`}>
            {statusConfig[status]?.icon}
            {status}
        </span>
    );
};

const DashboardPage = () => {
    const [timeRange, setTimeRange] = useState('7days');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                    <p className="text-gray-500">Welcome back! Here's what's happening with your store today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="pl-10 pr-8 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                        >
                            <option value="today">Today</option>
                            <option value="yesterday">Yesterday</option>
                            <option value="7days">Last 7 Days</option>
                            <option value="30days">Last 30 Days</option>
                            <option value="quarter">This Quarter</option>
                            <option value="year">This Year</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <StatCard
                    title="Total Revenue"
                    value="$48,273.21"
                    change="+14.5% from last period"
                    isPositive={true}
                    icon={<DollarSign className="h-6 w-6" />}
                />
                <StatCard
                    title="Orders"
                    value="542"
                    change="+7.2% from last period"
                    isPositive={true}
                    icon={<ShoppingBag className="h-6 w-6" />}
                />
                <StatCard
                    title="New Customers"
                    value="128"
                    change="+12.3% from last period"
                    isPositive={true}
                    icon={<Users className="h-6 w-6" />}
                />
                <StatCard
                    title="Conversion Rate"
                    value="3.42%"
                    change="-0.4% from last period"
                    isPositive={false}
                    icon={<Percent className="h-6 w-6" />}
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Revenue Chart */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Revenue Analytics</h2>
                        <button className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
                            View report <ArrowUpRight className="h-4 w-4 ml-1" />
                        </button>
                    </div>
                    <div className="h-64 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg flex items-center justify-center">
                        <div className="text-center p-4">
                            <LineChart className="h-12 w-12 mx-auto text-indigo-400 mb-2" />
                            <p className="text-gray-500">Revenue trends visualization</p>
                        </div>
                    </div>
                </div>

                {/* Sales Distribution */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Sales Distribution</h2>
                        <button className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
                            View details <ArrowUpRight className="h-4 w-4 ml-1" />
                        </button>
                    </div>
                    <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                        <div className="text-center p-4">
                            <PieChart className="h-12 w-12 mx-auto text-blue-400 mb-2" />
                            <p className="text-gray-500">Sales by category breakdown</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tables Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Recent Orders */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                        <button className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
                            View all <ArrowUpRight className="h-4 w-4 ml-1" />
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Order
                                    </th>
                                    <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-900">
                                                {order.id}
                                            </a>
                                            <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {order.customer}
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <StatusBadge status={order.status} />
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                            {order.total}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
                        <button className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
                            View all <ArrowUpRight className="h-4 w-4 ml-1" />
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Product
                                    </th>
                                    <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Sales
                                    </th>
                                    <th scope="col" className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Revenue
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {topProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                    <Package className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 line-clamp-1">
                                                        {product.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {product.sales}
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                            {product.revenue}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Insights Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Customer Acquisition */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Acquisition</h2>
                    <div className="h-64 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg flex items-center justify-center">
                        <div className="text-center p-4">
                            <BarChart2 className="h-12 w-12 mx-auto text-purple-400 mb-2" />
                            <p className="text-gray-500">Customer acquisition channels</p>
                        </div>
                    </div>
                </div>

                {/* Order Activity Map */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Activity Map</h2>
                    <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                        <div className="text-center p-4">
                            <Map className="h-12 w-12 mx-auto text-blue-400 mb-2" />
                            <p className="text-gray-500">Geographic order distribution</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;