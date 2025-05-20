import { Lock, X, Clock } from "lucide-react";

const TwoFactorComingSoonModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-2 transform transition-all duration-300 animate-fade-in p-4 sm:p-6">
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <div className="flex items-center">
                        <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-full mr-2 sm:mr-3">
                            <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h4>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 !rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                    </button>
                </div>

                <div className="flex flex-col items-center text-center py-4 sm:py-6">
                    <div className="p-4 bg-blue-50 rounded-full mb-4">
                        <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 animate-pulse" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Feature Coming Soon!</h4>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-2">
                        We're working hard to bring you enhanced security with two-factor authentication.
                        This feature will be available in our next update.
                    </p>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={onClose}
                        className="px-5 sm:px-6 py-1.5 sm:py-2 bg-indigo-600 text-white !rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base"
                    >
                        Got it!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TwoFactorComingSoonModal;