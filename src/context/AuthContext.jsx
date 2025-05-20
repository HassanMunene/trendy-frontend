import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
        const userData = localStorage.getItem("user");

        if (storedToken && userData) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
        }

        setLoading(false);
    }, []);

    const login = (userData, token) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setIsAuthenticated(true);
        setUser(userData);
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
    }

    // this is the update profile function
    const updateProfile = async (profileData) => {
        const storedToken = localStorage.getItem("token");
        try {
            const response = await fetch(`${API_URL}/profile/update-profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${storedToken}`
                },
                body: JSON.stringify(profileData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to Update profile');
            }

            const data = await response.json();
            setUser(data.user);
            return data;
        } catch (error) {
            throw error;
        }
    }
    const updateUserToLocalstorage = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
    }
    // this is the change password function
    const updatePassword = async (currentPassword, newPassword) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/auth/change-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    currentPassword: currentPassword, 
                    newPassword: newPassword 
                })
            });

            console.log("We are herreeee", response);
            if (!response.ok) {
                const errorData = await response.json();
                console.log("We are herreeee", errorData);
                console.log("Error changing password", errorData);
                throw new Error(errorData.message || 'Failed to change password');
            }
            const data = await response.json()
            return data;
        } catch (error) {
            console.log("Error changing password", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            loading,
            login,
            logout,
            updateProfile,
            updateUserToLocalstorage,
            updatePassword
        }}>
            {children}
        </AuthContext.Provider>
    )
}

// Let us define our own custom hook to access these values easily and use the context we have
// just created
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}