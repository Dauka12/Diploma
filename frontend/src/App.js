import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Dashboard from "./pages/DoctorPage/Dashboard";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignIn from './pages/SignInPage';
import SignUp from './pages/SignUpPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/" element={<LandingPage />}></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
