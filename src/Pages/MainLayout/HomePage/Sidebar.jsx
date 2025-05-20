import {
    Check,
    Truck,
    Lock,
    Box,
    Star,
    Clock,
    Navigation,
    Zap,
} from 'lucide-react';

import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

const Sidebar = () => {
    return (
        <aside className="lg:w-72 w-full ps-4 py-8 lg:sticky top-15 self-start">
            <div className="bg-white rounded-lg shadow-xl border border-rose-100 py-6 px-2 h-full flex flex-col justify-between">
                <div className="flex flex-col gap-8">
                    <div className='text-center'>
                        <h4 className="font-bold !text-rose-600 text-center font-serif mb-2">Why Shop With Us?</h4>
                        <p className="text-sm text-gray-500">Premium service at every step.</p>
                    </div>

                    {/* Delivery Options */}
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Truck className="w-5 h-5" />
                        </div>
                        <h4 className="text-base font-semibold text-gray-900">Flexible Delivery</h4>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-100">
                            <div className="w-8 h-8 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                                <Check className="w-4 h-4" />
                            </div>
                            <div>
                                <h5 className="text-sm font-medium">Standard</h5>
                                <p className="text-xs text-gray-500">Next day delivery</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-100">
                            <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                                <Navigation className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="flex items-center gap-1">
                                    <h5 className="text-sm font-medium">Pickup Mtaani</h5>
                                    <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-xl">Nairobi</span>
                                </div>
                                <p className="text-xs text-gray-500">Same day collection</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-100">
                            <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                                <Zap className="w-4 h-4" />
                            </div>
                            <div>
                                <h5 className="text-sm font-medium">Speedaf Express</h5>
                                <p className="text-xs text-gray-500">Next day delivery</p>
                            </div>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex items-start gap-2">
                        <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className='h-5 w-5' />
                        </div>
                        <div>
                            <h4 className="text-base font-semibold text-gray-900">Premium Quality</h4>
                            <p className="text-sm text-gray-600">Crafted with top-tier materials from ethical sources.</p>
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-4 border-t border-rose-50">
                    <div className="grid grid-cols-4 gap-2 mb-4">
                        {[
                            { icon: <Lock className="w-5 h-5 text-green-600" />, label: "Secure" },
                            { icon: <Box className="w-5 h-5 text-blue-600" />, label: "Reliable" },
                            { icon: <Star className="w-5 h-5 text-amber-500" />, label: "Rated" },
                            { icon: <Clock className="w-5 h-5 text-rose-600" />, label: "24/7" }
                        ].map((item, index) => (
                            <div key={index} className="flex flex-col items-center group">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-xs flex items-center justify-center mb-1 transition-all group-hover:shadow-sm">
                                    {item.icon}
                                </div>
                                <span className="text-xs text-gray-500">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Social Proof */}
                <div className="text-center">
                    <p className="text-xs text-gray-400 mb-3">Trusted by 10,000+ Kenyans</p>
                    <div className="flex justify-center gap-4">
                        <a href="https://www.facebook.com/profile.php?id=61551260480648" target='_blank' className="w-9 h-9 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center hover:bg-rose-100 transition-colors" aria-label="Follow us on facebook">
                            <FaFacebookF className="w-5 h-5" />
                        </a>
                        <a href="https://www.instagram.com/trendy.collection01?igsh=MXNjOGs1bDM3d2YwZg%3D%3D" target='_blank' className="w-9 h-9 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center hover:bg-rose-100 transition-colors" aria-label="Follow us on instagram">
                            <FaInstagram className="w-5 h-5" />
                        </a>
                        <a href="tiktok.com/@trendy.collections01" target='_blank' className="w-9 h-9 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center hover:bg-rose-100 transition-colors" aria-label="Follow us on tiktok">
                            <FaTiktok className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </aside >
    )
}

export default Sidebar;