import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import RegisterForm from "./RegisterForm";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    const handleRegister = async ({ username, email, password }) => {
        setIsLoading(true);
        setRegisterError(null);

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                })
            });

            const data = await response.json();
            if (!response.ok) {
                console.log("Error registering", data);
                setRegisterError(data.message || "Register failed");
                return;
            }
            setSuccessMessage("Registration successful! Redirecting...");
            await new Promise((resolve) => setTimeout(resolve, 1500));
            navigate("/login");
        } catch (error) {
            console.log("Error in the register Logic", error);
            setLoginError("Connection error, Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="sm:mx-auto mb-4 sm:w-full sm:max-w-md">
                {/* Logo with animated underline */}
                <Link to="/" className="flex justify-center group">
                    <span className="text-2xl font-bold bg-gradient-to-r from-rose-700 to-pink-600 bg-clip-text text-transparent relative">
                        Trendy Collections
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-700 to-pink-600 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                </Link>

                {/* Visual separator with animation */}
                <div className="mt-3 relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-200 relative">
                            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-rose-100 rounded-full transition-all duration-300 hover:bg-rose-200 hover:scale-110"></span>
                        </div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="px-3 bg-white text-sm text-gray-500 font-medium">
                            Already a member?
                        </span>
                    </div>
                </div>

                {/* Animated login link */}
                <div className="mt-3 text-center">
                    <Link
                        to="/login"
                        className="inline-flex items-center text-sm font-medium !text-rose-600 !hover:text-rose-500 group transition-all duration-300"
                    >
                        <span className="relative">
                            Sign in to your account
                            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-rose-500 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                        <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full mx-auto max-w-md"
            >
                {registerError && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-4 shadow-sm flex items-start"
                    >
                        <div className="flex-1">
                            <p className="font-medium">{registerError}</p>
                        </div>
                        <button onClick={() => setRegisterError(null)} className="text-red-400 hover:text-red-600 ml-2">
                            ✕
                        </button>
                    </motion.div>
                )}

                {successMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-50 border border-green-200 text-green-600 p-4 rounded-xl mb-6 shadow-sm flex items-start"
                    >
                        <div className="flex-1">
                            <p className="font-medium">{successMessage}</p>
                        </div>
                    </motion.div>
                )}
                <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
            </motion.div>
        </div>
    );
};

export default RegisterPage;