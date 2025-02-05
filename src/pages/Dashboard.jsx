import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchUrls } from "../utils/api";
import ShortenUrlForm from "../components/ShortenUrlForm";
import UrlList from "../components/UrlList";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [urls, setUrls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUrls = async () => {
      const token = localStorage.getItem("token");
      const data = await fetchUrls(token);
      setUrls(data);
    };

    if (user) loadUrls();
  }, [user]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Welcome, {user?.name}!</h1>
      <ShortenUrlForm onUrlCreated={(newUrl) => setUrls([...urls, newUrl])} />
      <UrlList urls={urls} />
      <button
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        onClick={() => navigate("/analytics")}
      >
        View Analytics
      </button>
    </div>
  );
};

export default Dashboard;
