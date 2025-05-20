import { motion } from "framer-motion";
import { CheckCircle, WifiOff, Smartphone, Zap, Clock  } from "lucide-react";

const SuccessfullyConnectedState = ({ handleDisconnect }) => {
    return (
        <motion.div className="flex flex-col items-center py-2 sm:py-4">
            <div className="relative mb-6 sm:mb-8">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-green-900 bg-opacity-20 flex items-center justify-center">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <div className="p-4 sm:p-6 bg-green-600 rounded-full">
                            <CheckCircle className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                        </div>
                    </motion.div>
                </div>
                <motion.div
                    className="absolute inset-0 rounded-full border-4 border-green-500 border-opacity-30 pointer-events-none"
                    animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2 text-center">
                Connected Successfully!
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-8 text-center max-w-md px-2">
                Your WhatsApp Business account is now securely linked to the dashboard.
                You can start managing messages and contacts.
            </p>

            <button
                onClick={handleDisconnect}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 sm:gap-3 transition-all text-sm sm:text-base"
            >
                <WifiOff className="w-4 h-4 sm:w-5 sm:h-5" />
                Disconnect Account
            </button>

            <div className="mt-6 sm:mt-8 w-full max-w-md px-2 sm:px-0">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
                    <div className="p-2 sm:p-3 bg-gray-800 rounded-lg">
                        <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 mx-auto text-blue-400 mb-1 sm:mb-2" />
                        <p className="text-xs text-gray-400">Device</p>
                        <p className="text-xs sm:text-sm font-medium text-white">iPhone</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-gray-800 rounded-lg">
                        <Zap className="w-5 h-5 sm:w-6 sm:h-6 mx-auto text-yellow-400 mb-1 sm:mb-2" />
                        <p className="text-xs text-gray-400">Status</p>
                        <p className="text-xs sm:text-sm font-medium text-white">Active</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-gray-800 rounded-lg">
                        <Clock className="w-5 h-5 sm:w-6 sm:h-6 mx-auto text-purple-400 mb-1 sm:mb-2" />
                        <p className="text-xs text-gray-400">Connected</p>
                        <p className="text-xs sm:text-sm font-medium text-white">Just now</p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default SuccessfullyConnectedState;