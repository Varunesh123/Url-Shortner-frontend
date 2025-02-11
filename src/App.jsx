import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import GoogleCallback from "./pages/GoogleCallback"; // ✅ Import the new component

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <div className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth/google/callback" element={<GoogleCallback />} /> 
        </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
