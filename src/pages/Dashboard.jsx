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
      const data = await fetchUrls(token);
      console.log("DATA:", data)
      console.log("urls state:", urls)
      setUrls(urls=>[...urls, ...data]);
      console.log("urls state:", urls)
    };

    if (user) loadUrls();
  }, [user]);

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold p-8">Welcome!</h1>
      <ShortenUrlForm onUrlCreated={(newUrl) => setUrls([...urls, newUrl])} />
      <UrlList urls={urls} />
    </div>
  );  
};

export default Dashboard;
