import { useContext } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { UserContext } from "./context/userContext";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/SignupPage";
function App() {
  const { user } = useContext(UserContext);
  
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={user ? <Navigate to="/" /> : <LoginPage/>} />
      </Routes>
      <Routes>
        <Route path="/signup" element={<RegisterPage />} />
      </Routes>
      <Routes>
        <Route path="/" element={user ? <MainPage /> : <LoginPage />} />
      </Routes>
    

    </Router>
  );
}

export default App;
