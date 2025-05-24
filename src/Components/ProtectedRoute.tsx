import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import LoadingScreen from "../components/LoadingScreen";

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();
    console.log("Somememem", isAuthenticated)
    
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