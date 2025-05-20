import { useState } from 'react';
import { Lock, Check, X, Loader2, Eye, EyeOff } from 'lucide-react';

import { useAuth } from '../../../context/AuthContext';

const ChangePasswordModal = ({ onClose }) => {
    const { updatePassword } = useAuth();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [showPassword, setShowPassword] = useState(false);

    const checkPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.match(/[A-Z]/)) strength++;
        if (password.match(/[0-9]/)) strength++;
        if (password.match(/[^A-Za-z0-9]/)) strength++;
        return strength;
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setNewPassword(value);
        setPasswordStrength(checkPasswordStrength(value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        if (passwordStrength < 3) {
            setError("Password is too weak");
            return;
        }
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await updatePassword(currentPassword, newPassword);
            setSuccess("Password updated successfully!");
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (error) {
            console.error("Password change error:", error);
            setError(error.message || "Failed to update password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 animate-fade-in">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                            <Lock className="w-5 h-5 mr-2 text-indigo-600" />
                            Change Password
                        </h3>
                        <button
                            onClick={onClose}
                            className="p-1 !rounded-full hover:bg-gray-100 transition-colors"
                            disabled={isLoading}
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Current Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full pl-10 block py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button
                                        type="button"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        className="text-gray-400 hover:text-rose-600 transition-colors"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                New Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full pl-10 py-2 block border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button
                                        type="button"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        className="text-gray-400 hover:text-rose-600 transition-colors"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="mt-3 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-gray-500">
                                        Password Strength
                                    </span>
                                    <span className={`text-xs font-semibold ${passwordStrength === 0 ? 'text-red-600' :
                                        passwordStrength === 1 ? 'text-orange-500' :
                                            passwordStrength === 2 ? 'text-yellow-500' :
                                                passwordStrength === 3 ? 'text-blue-500' :
                                                    'text-green-600'
                                        }`}>
                                        {passwordStrength === 0 && "Very Weak"}
                                        {passwordStrength === 1 && "Weak"}
                                        {passwordStrength === 2 && "Moderate"}
                                        {passwordStrength === 3 && "Strong"}
                                        {passwordStrength === 4 && "Very Strong"}
                                    </span>
                                </div>

                                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`absolute top-0 left-0 h-full transition-all duration-500 ease-out ${passwordStrength === 0 ? 'bg-red-500 w-1/5' :
                                            passwordStrength === 1 ? 'bg-orange-500 w-2/5' :
                                                passwordStrength === 2 ? 'bg-yellow-500 w-3/5' :
                                                    passwordStrength === 3 ? 'bg-blue-500 w-4/5' :
                                                        'bg-green-500 w-full'
                                            }`}
                                        style={{
                                            boxShadow: passwordStrength > 2 ?
                                                `0 0 8px ${passwordStrength === 3 ? 'rgba(59, 130, 246, 0.5)' : 'rgba(34, 197, 94, 0.5)'}` :
                                                'none'
                                        }}
                                    ></div>
                                </div>

                                {newPassword.length > 0 && (
                                    <div className="grid grid-cols-2 gap-2 mt-3">
                                        <div className="flex items-center">
                                            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${newPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-300'
                                                }`}></span>
                                            <span className={`text-xs ${newPassword.length >= 8 ? 'text-gray-700' : 'text-gray-400'
                                                }`}>8+ characters</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${/[A-Z]/.test(newPassword) ? 'bg-green-500' : 'bg-gray-300'
                                                }`}></span>
                                            <span className={`text-xs ${/[A-Z]/.test(newPassword) ? 'text-gray-700' : 'text-gray-400'
                                                }`}>Uppercase</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${/[0-9]/.test(newPassword) ? 'bg-green-500' : 'bg-gray-300'
                                                }`}></span>
                                            <span className={`text-xs ${/[0-9]/.test(newPassword) ? 'text-gray-700' : 'text-gray-400'
                                                }`}>Number</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${/[^A-Za-z0-9]/.test(newPassword) ? 'bg-green-500' : 'bg-gray-300'
                                                }`}></span>
                                            <span className={`text-xs ${/[^A-Za-z0-9]/.test(newPassword) ? 'text-gray-700' : 'text-gray-400'
                                                }`}>Special char</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-10 block py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button
                                        type="button"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        className="text-gray-400 hover:text-rose-600 transition-colors"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-center">
                                <X className="w-4 h-4 mr-2" />
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm flex items-center">
                                <Check className="w-4 h-4 mr-2" />
                                {success}
                            </div>
                        )}

                        <div className="flex justify-end !space-x-3 pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 !rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 text-white !rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center min-w-[120px]"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                                        Updating...
                                    </>
                                ) : (
                                    "Change Password"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordModal;