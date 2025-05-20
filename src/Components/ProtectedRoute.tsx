import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import LoadingScreen from "./LoadingScreen";

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();
    
    if (loading) {
        return (
            <>
                <LoadingScreen />
            </>
        )
    }

    if (!isAuthenticated) {
        return (
            <Navigate to="/login" replace />
        )
    }

    return <Outlet />
}

export default ProtectedRoute;