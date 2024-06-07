import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import CDSupportPage from './pages/CDSupportPage/App.tsx';
import CDSupportMedicamentsManagementPage from './pages/CDSupportPage/ManagementPage.tsx';
import CDSupportUsersManagementPage from './pages/CDSupportPage/UsersPage.tsx';
import Dashboard from "./pages/DoctorPage/Dashboard.tsx";
import LandingPage from "./pages/LandingPage/LandingPage.tsx";
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
          <SecuredRouteDoctor path="/doctor-prescription" element={<Dashboard />} />
          <SecuredRouteDoctor path="/doctor-profile" element={<ProfilePage />} />
          <SecuredRouteCDS path="/clinical-decision-support/prescriptions-management" element={<CDSupportPage />} />
          <SecuredRouteCDS path="/clinical-decision-support/medicaments-management" element={<CDSupportMedicamentsManagementPage />} />
          <SecuredRouteCDS path="/clinical-decision-support/users-management" element={<CDSupportUsersManagementPage />} />
          <SecuredRouteDoctor path="/doctor-chat" element={<MessagesPage />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
