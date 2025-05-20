import { AlertTriangle, LogIn } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";

const SessionExpiredModal = ({ onLoginSuccess, formData }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    // Check if user authenticated after coming back from login
    useEffect(() => {
        if (isAuthenticated) {
            onLoginSuccess(formData);
        }
    }, [isAuthenticated, formData, onLoginSuccess]);

    const handleRedirectToLogin = () => {
        // Store current path and form data in session storage
        sessionStorage.setItem('preAuthPath', window.location.pathname);
        sessionStorage.setItem('unsavedProfileChanges', JSON.stringify(formData));

        navigate('/login', {
            state: {
                from: 'session_expired',
                returnTo: window.location.pathname
            }
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 animate-fade-in p-6">
                <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-yellow-100 rounded-full mb-4">
                        <AlertTriangle className="w-8 h-8 text-yellow-600" />
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Session Expired</h3>
                    <p className="text-gray-600 mb-6">
                        Your session has timed out. Please log in again to continue editing your profile.
                    </p>

                    <button
                        onClick={handleRedirectToLogin}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                    >
                        <LogIn className="w-5 h-5 mr-2" />
                        Go to Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SessionExpiredModal;