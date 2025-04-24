import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

const ProtectedRoute = ({ children }) => {
    const { user, loading, error } = useAuth();
    const location = useLocation();

    if (loading) {
        return <LoadingIndicator />;
    }

    if (error) {
        return <Navigate to="/login" state={{ from: location, error }} replace />;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;