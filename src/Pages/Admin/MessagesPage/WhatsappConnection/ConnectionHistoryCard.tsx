import { Clock, Wifi, WifiOff, ChevronRight } from "lucide-react";

const ConnectionHistoryCard = ({ history }) => {
    return (
        <div className="mt-4 sm:mt-6 bg-gray-900 rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
            <div className="p-3 sm:p-4 border-b border-gray-800 flex items-center justify-between">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                <h3 className="font-medium sm:font-semibold text-white flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                    Connection History
                </h3>
            </div>
            <div className="divide-y divide-gray-800">
                {history.length > 0 ? (
                    state.history.map((event, i) => (
                        <div key={i} className="p-3 sm:p-4 hover:bg-gray-800 transition-colors cursor-pointer">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className={`p-1.5 sm:p-2 rounded-lg ${event.type === 'connected' ? 'bg-green-900 bg-opacity-20 text-green-400' : 'bg-red-900 bg-opacity-20 text-red-400'}`}>
                                        {event.type === 'connected' ?
                                            <Wifi className="w-3 h-3 sm:w-4 sm:h-4" /> :
                                            <WifiOff className="w-3 h-3 sm:w-4 sm:h-4" />
                                        }
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm font-medium text-white">
                                            {event.type === 'connected' ? 'Connected successfully' : 'Disconnected'}
                                        </p>
                                        <p className="text-[0.65rem] sm:text-xs text-gray-400">
                                            {new Date(event.timestamp).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-6 text-center">
                        <p className="text-sm text-gray-500">No connection events yet</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ConnectionHistoryCard;