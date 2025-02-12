import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  return (
    <Router>
      <Navbar setUser={setUser} user={user} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/register" element={<Register user={user} />} />
        <Route path="/admin" element={<Admin user={user} />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
