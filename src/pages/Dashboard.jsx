import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchUrls } from "../utils/api";
import ShortenUrlForm from "../components/ShortenUrlForm";
import UrlList from "../components/UrlList";
import { replace, useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {

  const TokenHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();
  
    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");
  
      if (token) {
        localStorage.setItem("token", token);
        params.delete("token");
  
        // Construct the new URL without the token
        const newUrl = `${location.pathname}?${params.toString()}`;
        navigate(newUrl, { replace: true });
      }
    }, [location, navigate]);
  
    return null; // This component doesn't render anything
  }

  TokenHandler()

  const { user } = useContext(AuthContext);
  const [urls, setUrls] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    if (!localStorage.getItem("token")){
      navigate('/', {replace:true});
    }
  }, [])

  useEffect(() => {
    const loadUrls = async () => {
      const token = localStorage.getItem("token");
      console.log("Dashboard token", token);
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
