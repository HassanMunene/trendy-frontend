import { LogOut } from "lucide-react";

const LogoutConfirmationModal = ({ cancelLogout, isLoggingOut, confirmLogout }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md transform transition-all duration-300 scale-95 animate-fade-in">
                <div className="p-6">
                    <div className="flex items-center justify-center mb-4">
                        <div className="p-3 bg-red-100 rounded-full">
                            <LogOut className="w-8 h-8 text-red-600" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-center text-gray-900 mb-2">
                        Confirm Logout
                    </h3>
                    <p className="text-sm text-gray-500 text-center mb-6">
                        Are you sure you want to log out?
                    </p>

                    <div className="flex gap-3">
                        <button
                            onClick={cancelLogout}
                            className="flex-1 py-2 px-4 !rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                            disabled={isLoggingOut}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmLogout}
                            className="flex-1 py-2 px-4 !rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 flex items-center justify-center"
                            disabled={isLoggingOut}
                        >
                            {isLoggingOut ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Logging Out...
                                </>
                            ) : (
                                "Yes, Logout"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogoutConfirmationModal;