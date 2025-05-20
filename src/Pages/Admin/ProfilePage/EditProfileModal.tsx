import { useState, useEffect } from "react";
import { X, User, Mail, Save, Loader2, Edit } from "lucide-react";

import { useAuth } from "../../../context/AuthContext";
import SessionExpiredModal from "../AdminComponents/SessionExpiredModal";

const EditProfileModal = ({ user, onClose, onSave }) => {
    const { updateProfile, isAuthenticated } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [sessionExpired, setSessionExpired] = useState(false);
    const [formData, setFormData] = useState(() => {
        // checked unsaved changes from  the session storage.
        const savedData = sessionStorage.getItem('unsavedProfileChanges');
        return savedData ? JSON.parse(savedData) : {
            username: user.username,
            email: user.email,
            avatar: user.avatar,
        }
    });

    useEffect(() => {
        // Clear session storage when modal closes
        return () => {
            sessionStorage.removeItem('unsavedProfileChanges');
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            // we will call our backend api endpoint to update profile.
            await updateProfile(formData)
            setSuccess("Profile updated Successfully");
            setTimeout(() => {
                onSave(formData);
                onClose();
            }, 1500);
        } catch (error) {
            if (error.message.includes('Token expired') || error.message.includes('Unauthorized')) {
                setSessionExpired(true);
            } else {
                console.log("Error updating profile", error);
                setError(error.message || 'failed to update profile')
            }
        } finally {
            setIsLoading(false);
        }
    }

    const handleLoginSuccess = (savedData) => {
        setSessionExpired(false);
        setFormData(savedData);
        // Retry the update automatically if coming back from login
        handleSubmit(new Event('submit'));
    }

    if (sessionExpired) {
        return (
            <>
                <SessionExpiredModal
                    onLoginSuccess={handleLoginSuccess}
                    formData={formData}
                />;
            </>
        )
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all duration-300 animate-fade-in">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">Edit Profile</h3>
                    <button
                        onClick={onClose}
                        className="p-1 !rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSubmit} className="p-4 md:p-6">
                    {/* Avatar Upload */}
                    <div className="flex flex-col items-center mb-4 md:mb-6">
                        <div className="relative mb-3 md:mb-4">
                            <img
                                src={formData.avatar}
                                alt="Profile"
                                className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg"
                            />
                            <button
                                type="button"
                                className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 md:p-2 !rounded-full shadow-md hover:bg-indigo-700 transition-all"
                                aria-label="Edit avatar"
                            >
                                <Edit className="w-3 h-3 md:w-4 md:h-4" />
                            </button>
                        </div>
                        <input
                            type="text"
                            name="avatar"
                            value={formData.avatar}
                            onChange={handleChange}
                            placeholder="Image URL"
                            className="text-sm w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-indigo-500"
                        />
                    </div>

                    {/* Name Field */}
                    <div className="mb-3 md:mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="pl-9 md:pl-10 w-full py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="mb-4 md:mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="pl-9 md:pl-10 w-full py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Status Messages */}
                    {error && (
                        <div className="mb-3 md:mb-4 p-2 md:p-3 bg-red-50 text-red-700 rounded-lg text-xs md:text-sm">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-3 md:mb-4 p-2 md:p-3 bg-green-50 text-green-700 rounded-lg text-xs md:text-sm">
                            {success}
                        </div>
                    )}

                    {/* Form Actions */}
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:!space-x-3 !space-y-2 sm:!space-y-0">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 !rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm md:text-base"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-3 py-2 sm:px-4 sm:py-2 bg-indigo-600 text-white !rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center min-w-[100px] text-sm md:text-base"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfileModal;