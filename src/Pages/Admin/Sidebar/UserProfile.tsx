import { ChevronDown } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const UserProfile = ({ userMenuOpen, setUserMenuOpen }) => {
    const { user: currentUser } = useAuth();

    const handleClick = (e) => {
        e.stopPropagation();
        setUserMenuOpen(!userMenuOpen);
    };

    return (
        <div
            className="relative p-4 border-b border-indigo-700 flex items-center space-x-3 cursor-pointer hover:bg-indigo-800/20 transition-colors duration-200"
            onClick={handleClick}
        >
            <div className="relative">
                <img
                    src={currentUser.avatar}
                    alt={currentUser.username}
                    className="w-10 h-10 rounded-full border-2 border-indigo-300"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-indigo-800"></div>
            </div>
            <div className="flex-1 flex flex-col justify-center min-w-0">
                <p className="text-sm font-medium truncate mb-0 pt-3">{currentUser.username}</p>
                <p className="text-xs text-indigo-300 truncate">{currentUser.role}</p>
            </div>
            <ChevronDown
                className={`w-4 h-4 text-indigo-300 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
            />
        </div>
    );
};

export default UserProfile;