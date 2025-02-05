import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { loginWithGoogle } from "../utils/api.js";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to URL Shortener</h1>
      <p className="mb-6 text-center">
        A simple and secure way to shorten your URLs and track their analytics.
      </p>

      {user ? (
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go to Dashboard
        </button>
      ) : (
        <button
          onClick={loginWithGoogle}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default Home;
