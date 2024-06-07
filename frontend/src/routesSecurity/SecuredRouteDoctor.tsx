// SecuredRouteDoctor.tsx
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { getSession, isLoggedIn } from '../session';

const SecuredRouteDoctor = ({ element: Element, ...rest }: any) => {
    const session = getSession();
    const isAuthorized = isLoggedIn() && session.role === 'ROLE_DOCTOR';
    if (!isAuthorized) {
        return <Navigate to="/sign-in" />;
    }

    return <Route {...rest} element={<Element />} />;
};

export default SecuredRouteDoctor;
