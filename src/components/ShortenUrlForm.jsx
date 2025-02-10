import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { shortenUrl } from "../utils/api";

const ShortenUrlForm = ({ onUrlCreated }) => {
  const { user } = useContext(AuthContext);
  const [longUrl, setLongUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!longUrl) return;
    const token = localStorage.getItem("token");
    console.log("ShortenUrlForm token", token);
    const data = await shortenUrl(longUrl, token);
    onUrlCreated(data);
    setLongUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="url"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        placeholder="Enter URL"
        className="border p-2 flex-grow"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">
        Shorten
      </button>
    </form>
  );
};

export default ShortenUrlForm;
