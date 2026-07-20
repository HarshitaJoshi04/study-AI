import { useEffect, useState } from "react";
import api from "../services/api";

const useVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    try {
      const res = await api.get("/videos");
      setVideos(res.data.videos);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();

    const interval = setInterval(fetchVideos, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    videos,
    loading,
    refreshVideos: fetchVideos,
  };
};

export default useVideos;