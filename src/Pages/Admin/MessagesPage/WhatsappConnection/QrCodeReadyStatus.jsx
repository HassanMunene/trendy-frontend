import { motion } from "framer-motion";
import { Shield, Clock, RotateCw, CheckCircle } from "lucide-react";

const QrCodeReadyStatus = ({  qrImage, onRetry }) => {
    return (
        <motion.div className="flex flex-col items-center">
            <div className="relative mb-6 sm:mb-8">
                {qrImage && (
                    <>
                        <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-purple-500 blur-xl opacity-20 animate-pulse" />
                        <img
                            src={qrImage}
                            alt="WhatsApp QR Code"
                            className="relative z-10 border-4 border-white rounded-lg sm:rounded-xl shadow-lg w-48 h-48 sm:w-64 sm:h-64"
                        />
                        <div className="absolute -inset-1 sm:-inset-2 border-2 border-purple-400 rounded-lg sm:rounded-xl pointer-events-none animate-ping-once" />
                    </>
                )}
            </div>

            <div className="text-center max-w-md mb-6 sm:mb-8 px-2">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Scan to Connect</h3>
                <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
                    Open <strong className="text-white">WhatsApp Business</strong> on your phone,
                    tap <strong className="text-white">Menu → Linked Devices</strong>,
                    and scan this code
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
                    <div className="flex items-center">
                        <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-green-500" />
                        <span>End-to-end encrypted</span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-yellow-500" />
                        <span>Expires in 2 minutes</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xs">
                <button
                    onClick={onRetry}
                    className="px-3 py-2 sm:px-4 sm:py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg flex items-center justify-center gap-1 sm:gap-2 transition-all text-sm sm:text-base"
                >
                    <RotateCw className="w-4 h-4 sm:w-5 sm:h-5" />
                    Refresh
                </button>
                <button
                    onClick={onRetry}
                    className="px-3 py-2 sm:px-4 sm:py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center justify-center gap-1 sm:gap-2 transition-all text-sm sm:text-base"
                >
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    Verify
                </button>
            </div>
        </motion.div>
    )
}

export default QrCodeReadyStatus;