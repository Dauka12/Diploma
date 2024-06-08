import React from 'react';
import { Navigate } from 'react-router-dom';
import { getSession, isLoggedIn } from '../session';

interface SecuredRouteDoctorProps {
  element: React.ReactElement;
}

const SecuredRouteDoctor: React.FC<SecuredRouteDoctorProps> = ({ element }) => {
  const session = getSession();
  const isAuthorized = isLoggedIn() && session.role === 'ROLE_DOCTOR';

  if (!isAuthorized) {
    return <Navigate to="/sign-in" />;
  }

  return element;
};

export default SecuredRouteDoctor;
