import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginWithGoogle } from "../utils/api";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={loginWithGoogle}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
