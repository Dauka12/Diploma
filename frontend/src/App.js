import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import SignIn from './pages/SignInPage';
import SignUp from './pages/SignUpPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
