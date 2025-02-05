import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../utils/api";

const Analytics = () => {
  const { alias } = useParams();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/api/analytics/${alias}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAnalytics(response.data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [alias]);

  if (loading) return <p>Loading analytics...</p>;
  if (!analytics) return <p>Analytics data not available.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Analytics for {alias}</h1>

      <p className="mt-2">Total Clicks: {analytics.totalClicks}</p>
      <p>Unique Users: {analytics.uniqueUsers}</p>

      <h2 className="text-xl mt-4">Clicks Over Time</h2>
      <ul>
        {analytics.clicksByDate.map((entry, index) => (
          <li key={index} className="mt-1">
            {entry.date}: {entry.clicks} clicks
          </li>
        ))}
      </ul>

      <h2 className="text-xl mt-4">Device Breakdown</h2>
      <ul>
        {analytics.deviceType.map((device, index) => (
          <li key={index}>
            {device.deviceName}: {device.uniqueClicks} clicks
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Analytics;
