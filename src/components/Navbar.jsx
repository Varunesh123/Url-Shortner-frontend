import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <h1>URL Shortener</h1>
      {user ? (
        <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
          Logout
        </button>
      ) : null}
    </nav>
  );
};

export default Navbar;
