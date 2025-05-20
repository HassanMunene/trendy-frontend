import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const MessagesPageHeader = () => {
    return (
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-md mb-1">
            <Link to="/admin" className="flex items-center group transition-all duration-200">
                <div className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
                    <ChevronLeft className="w-5 h-5 text-indigo-600 group-hover:text-indigo-800 transition-colors" />
                </div>
                <span className="ml-3 font-medium text-white hidden sm:inline transition-colors group-hover:text-gray-900">
                    Dashboard
                </span>
            </Link>
            <div className="flex items-center space-x-3">
                <h4 className="font-semibold text-white">Customer Messages</h4>
            </div>
        </div>
    )
}

export default MessagesPageHeader;