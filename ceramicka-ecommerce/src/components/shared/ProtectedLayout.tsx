import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedLayout = () => {
    const { isRecovering } = useAuth();
    
    if (isRecovering) {
        return <Navigate to="/reset-password" replace />;
    }
    
    return <Outlet />;
}