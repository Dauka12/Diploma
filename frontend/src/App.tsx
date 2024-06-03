import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import CDSupportPage from './pages/CDSupportPage/App.tsx';
import Dashboard from "./pages/DoctorPage/Dashboard.tsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import MessagesPage from './pages/MessagePage/MessagesPage.tsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.tsx';
import SignIn from './pages/SignInPage/index.tsx';
import SignUp from './pages/SignUpPage/index.tsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/prescription" element={<Dashboard />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/clinical-decision-support" element={<CDSupportPage />}></Route>
          <Route path="/messages" element={<MessagesPage />}></Route>
          <Route path="/" element={<LandingPage />}></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
