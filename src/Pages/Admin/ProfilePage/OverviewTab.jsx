import { useState } from "react";
import { User, Shield } from "lucide-react";
import { format } from 'date-fns'

import TwoFactorComingSoonModal from "./TwoFactorComingSoonModal.jsx";

const OverviewTab = ({ user }) => {
    const [show2FAModal, setShow2FAModal] = useState(false);
    const rawCreatedAt = user.createdAt;
    const formattedCreatedAt = format(new Date(rawCreatedAt), 'PPP')
    return (
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
            <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-medium text-base md:text-lg mb-4 md:mb-5 flex items-center text-gray-800">
                    <User className="w-4 h-4 md:w-5 md:h-5 mr-2 text-indigo-600" />
                    Personal Information
                </h3>
                <div className="space-y-3 md:space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        <div>
                            <label className="text-xs md:text-sm text-gray-500">Username</label>
                            <p className="font-medium text-sm md:text-base">{user.username}</p>
                        </div>
                        <div>
                            <label className="text-xs md:text-sm text-gray-500">Role</label>
                            <p className="font-medium text-sm md:text-base">{user.role}</p>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs md:text-sm text-gray-500">Email</label>
                        <p className="font-medium text-sm md:text-base">{user.email}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        <div>
                            <label className="text-xs md:text-sm text-gray-500">Join Date</label>
                            <p className="font-medium text-sm md:text-base">{formattedCreatedAt}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-medium text-base md:text-lg mb-4 md:mb-5 flex items-center text-gray-800">
                    <Shield className="w-4 h-4 md:w-5 md:h-5 mr-2 text-indigo-600" />
                    Account Status
                </h3>
                <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center justify-between p-2 md:p-3 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium text-sm md:text-base">Account Verification</p>
                            <p className="text-xs md:text-sm text-gray-500">Status of your account verification</p>
                        </div>
                        <span className="px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-xs font-semibold bg-green-100 text-green-800 !rounded-full">Verified</span>
                    </div>
                    <div className="flex items-center justify-between p-2 md:p-3 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium text-sm md:text-base">Two-Factor Authentication</p>
                            <p className="text-xs md:text-sm text-gray-500">Add an extra layer of security</p>
                        </div>
                        <button
                            onClick={() => setShow2FAModal(true)}
                            className="text-xs md:text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                            Enable
                        </button>
                    </div>
                </div>
            </div>

            {show2FAModal && (
                <TwoFactorComingSoonModal onClose={() => setShow2FAModal(false)}/>
            )}
        </div>
    )
};

export default OverviewTab