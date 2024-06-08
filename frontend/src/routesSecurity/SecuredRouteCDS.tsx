import React from 'react';
import { Navigate } from 'react-router-dom';
import { getSession, isLoggedIn } from '../session';

interface SecuredRouteCDSProps {
  element: React.ReactElement;
}

const SecuredRouteCDS: React.FC<SecuredRouteCDSProps> = ({ element }) => {
  const session = getSession();
  const isAuthorized = isLoggedIn() && session.role === 'ROLE_ADMIN';

  if (!isAuthorized) {
    return <Navigate to="/sign-in" />;
  }

  return element;
};

export default SecuredRouteCDS;
