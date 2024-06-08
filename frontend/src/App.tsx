import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CDSupportPage from './pages/CDSupportPage/App.tsx';
import CDSupportMedicamentsManagementPage from './pages/CDSupportPage/ManagementPage.tsx';
import CDSupportUsersManagementPage from './pages/CDSupportPage/UsersPage.tsx';
import Dashboard from './pages/DoctorPage/Dashboard.tsx';
import LandingPage from './pages/LandingPage/LandingPage.tsx';
import MessagesPage from './pages/MessagePage/MessagesPage.tsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.tsx';
import SignIn from './pages/SignInPage/index.tsx';
import SignUp from './pages/SignUpPage/index.tsx';
import SecuredRouteCDS from './routesSecurity/SecuredRouteCDS.tsx';
import SecuredRouteDoctor from './routesSecurity/SecuredRouteDoctor.tsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/doctor-prescription" element={<SecuredRouteDoctor element={<Dashboard />} />} />
          <Route path="/doctor-profile" element={<SecuredRouteDoctor element={<ProfilePage />} />} />
          <Route path="/clinical-decision-support/prescriptions-management" element={<SecuredRouteCDS element={<CDSupportPage />} />} />
          <Route path="/clinical-decision-support/medicaments-management" element={<SecuredRouteCDS element={<CDSupportMedicamentsManagementPage />} />} />
          <Route path="/clinical-decision-support/users-management" element={<SecuredRouteCDS element={<CDSupportUsersManagementPage />} />} />
          <Route path="/doctor-chat" element={<SecuredRouteDoctor element={<MessagesPage />} />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
