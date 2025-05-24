import React, { useState, useRef, useEffect } from 'react';
import { Search, User, ShoppingCart } from "lucide-react";
import { Link } from 'react-router-dom';

const UserActions = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const inputRef = useRef(null);
    const accountDropDownRef = useRef(null);

    //close down the account dropdown when click outside
    useEffect(() => {
        const handleClickOutsideAccount = (event) => {
            if (accountDropDownRef.current && !accountDropDownRef.current.contains(event.target)) {
                setIsAccountOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutsideAccount);
        return () => {
            document.removeEventListener('click', handleClickOutsideAccount);
        }
    }, []);

    useEffect(() => {
        if (showSearch && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showSearch]);

    return (
        <div className="flex items-center space-x-5">
            {/* Search with Expandable Input */}
            <div className="relative hidden sm:block group">
                <button
                    onClick={() => setShowSearch(!showSearch)}
                    className="text-gray-700 hover:text-rose-700 transition-colors p-2 rounded-full hover:bg-rose-50"
                    aria-label="Search"
                >
                    <Search className='h-5 w-5' />
                </button>
                {showSearch && (
                    <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300">
                        <div className="relative">
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search for products..."
                                className="w-full py-3 pl-4 pr-10 text-sm border-none focus:ring-0"
                            />
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-rose-600">
                                <Search className='h-5 w-5' />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Account with Dropdown Preview */}
            <div className="relative hidden sm:block" ref={accountDropDownRef}>
                {/* Account Trigger Button */}
                <button
                    onClick={() => setIsAccountOpen(!isAccountOpen)}
                    className="text-gray-700 hover:text-rose-700 transition-colors p-2 hover:bg-rose-50 rounded-full flex items-center justify-center"
                    aria-label="Account"
                    aria-expanded={isAccountOpen}
                >
                    <User className='h-5 w-5' />
                </button>

                {/* Dropdown Menu */}
                <div className={`absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl py-2 transition-all duration-200 z-50 ${isAccountOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-1'}`}>
                    <Link
                        to="/account"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-700"
                        onClick={() => setIsAccountOpen(false)}
                    >
                        My Account
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <Link
                        to="/logout"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-700"
                        onClick={() => setIsAccountOpen(false)}
                    >
                        Sign Out
                    </Link>
                </div>
            </div>

            {/* Cart with Floating Counter */}
            <div className="relative group">
                <Link
                    to="/cart"
                    className="text-gray-700 hover:text-rose-700 transition-colors p-2 rounded-full hover:bg-rose-50 relative flex items-center justify-center"
                    aria-label="Cart"
                >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-rose-700 to-pink-600 text-xs text-white transform transition-transform duration-200 group-hover:scale-110 shadow-sm">
                        3
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default UserActions;