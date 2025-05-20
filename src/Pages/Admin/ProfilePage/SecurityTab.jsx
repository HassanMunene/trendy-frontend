import { useState } from "react";
import { Lock, Shield, Bell } from "lucide-react";
import { format } from "date-fns";

import TwoFactorComingSoonModal from "./TwoFactorComingSoonModal.jsx";
import ChangePasswordModal from "./ChangePasswordModal.jsx";

const SecurityTab = () => {
    const [show2FAModal, setShow2FAModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

    const userDataString = localStorage.getItem("user");
    const userData = JSON.parse(userDataString);

    const passwordLastChanged = userData?.password_changed_at;
    let formattedPasswordLastChanged = 'Never changed';
    if (passwordLastChanged) {
        const parsedDate = new Date(passwordLastChanged);
        if (!isNaN(parsedDate)) {
            formattedPasswordLastChanged = format(parsedDate, 'PPP');
        }
    }

    return (
        <div className="space-y-4 md:space-y-6">
            <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-medium text-base md:text-lg mb-4 md:mb-5 flex items-center text-gray-800">
                    <Lock className="w-4 h-4 md:w-5 md:h-5 mr-2 text-indigo-600" />
                    Password Management
                </h3>
                <div className="space-y-3 md:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2 md:p-3 bg-gray-50 rounded-lg">
                        <div className="mb-2 sm:mb-0">
                            <p className="font-medium text-sm md:text-base">Password</p>
                            <p className="text-xs md:text-sm text-gray-500">{`Last changed ${formattedPasswordLastChanged}`} </p>
                        </div>
                        <button
                            onClick={() => setShowChangePasswordModal(true)}
                            className="px-3 py-1 md:px-4 md:py-2 bg-indigo-600 text-white !rounded-lg text-xs md:text-sm hover:bg-indigo-700 whitespace-nowrap transition-colors"
                        >
                            Change Password
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2 md:p-3 bg-gray-50 rounded-lg">
                        <div className="mb-2 sm:mb-0">
                            <p className="font-medium text-sm md:text-base">Two-Factor Authentication</p>
                            <p className="text-xs md:text-sm text-gray-500">Add an extra layer of security</p>
                        </div>
                        <button
                            onClick={() => setShow2FAModal(true)}
                            className="px-3 py-1 md:px-4 md:py-2 border border-gray-300 !rounded-lg text-xs md:text-sm hover:bg-gray-50 whitespace-nowrap transition-colors"
                        >
                            Set Up 2FA
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-medium text-base md:text-lg mb-4 md:mb-5 flex items-center text-gray-800">
                    <Shield className="w-4 h-4 md:w-5 md:h-5 mr-2 text-indigo-600" />
                    Security Activity
                </h3>
                <div className="space-y-3 md:space-y-4">
                    <div className="flex items-start p-2 md:p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="p-1 md:p-2 bg-blue-100 rounded-full mr-2 md:mr-3">
                            <Bell className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-sm md:text-base">Unusual login attempt</p>
                            <p className="text-xs md:text-sm text-gray-500">New login from Chrome on Windows</p>
                            <p className="text-2xs md:text-xs text-gray-400 mt-1">2 hours ago</p>
                        </div>
                        <button className="text-xs md:text-sm text-blue-600 hover:text-blue-800 font-medium">
                            Review
                        </button>
                    </div>
                    <div className="flex items-start p-2 md:p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="p-1 md:p-2 bg-green-100 rounded-full mr-2 md:mr-3">
                            <Shield className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-sm md:text-base">Password updated</p>
                            <p className="text-xs md:text-sm text-gray-500">Your password was changed</p>
                            <p className="text-2xs md:text-xs text-gray-400 mt-1">{formattedPasswordLastChanged}</p>
                        </div>
                        <button className="text-xs md:text-sm text-blue-600 hover:text-blue-800 font-medium">
                            Details
                        </button>
                    </div>
                </div>
            </div>

            {show2FAModal && (
                <TwoFactorComingSoonModal onClose={() => setShow2FAModal(false)} />
            )}

            {showChangePasswordModal && (
                <ChangePasswordModal onClose={() => setShowChangePasswordModal(false)} />
            )}
        </div>
    )
};

export default SecurityTab;