import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token"); // Get token from URL

    if (token) {
      localStorage.setItem("token", token); // Store token
      navigate("/dashboard"); // Redirect to Dashboard
    } else {
      console.error("Authentication failed");
      navigate("/login");
    }
  }, [location, navigate]);

  return <div>Logging in...</div>;
};

export default GoogleCallback;
