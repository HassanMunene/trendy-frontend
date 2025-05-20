import { Search } from "lucide-react";

const SearchBarComponent = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className="p-3 bg-white border-b border-gray-200 sticky top-0 z-10 rounded-md">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
            </div>
        </div>
    )
}

export default SearchBarComponent;