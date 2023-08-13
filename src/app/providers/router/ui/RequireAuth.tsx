import { getUserAuthState } from 'entities/User';
import { JSX } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from '../routeConfig/routeConfig';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const auth = useSelector(getUserAuthState);
    const localtion = useLocation();
    if (!auth) {
        return (
            <Navigate to={RoutePath.main} state={{ from: localtion }} replace />
        );
    }

    return children;
};
