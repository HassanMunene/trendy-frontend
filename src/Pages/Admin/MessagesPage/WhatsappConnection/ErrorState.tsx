import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

const ErrorState = ({ state, fetchQrCodeToConnect }) => {
    return (
        <motion.div className="flex flex-col items-center py-4 sm:py-8">
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-900 bg-opacity-20 rounded-full">
                <AlertCircle className="w-8 h-8 sm:w-12 sm:h-12 text-red-500" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2 text-center">
                Connection Failed
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6 text-center max-w-md px-2">
                {state.error || 'We encountered an issue while trying to connect to WhatsApp.'}
            </p>
            <div className="flex gap-3 sm:gap-4 w-full max-w-xs">
                <button
                    onClick={fetchQrCodeToConnect}
                    className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white !rounded-lg transition-all text-sm sm:text-base"
                >
                    Try Again
                </button>
            </div>
        </motion.div>
    )
}

export default ErrorState;