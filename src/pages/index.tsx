import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import VideoList from "app/components/VideoList";
import { PlusIcon } from "@heroicons/react/24/solid"; // ✅ Importing the "+" icon


export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();


  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch("/api/videos?user_id=john_smith");

        if (!res.ok) {
          setError(`Error ${res.status}: ${await res.text()}`);
          return;
        }

        const data: { videos: Video[] } = await res.json();


        if (data.videos.length === 0) {
          setError("No videos found."); // Show "No results" if empty
          return;
        }

      
        console.log("Raw API Response:", data); // ✅ Check what API returns

        setVideos(data.videos);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching videos:", error);
        setError("Failed to load videos. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">

<div className="flex items-center justify-around mb-6">
      
      <h1 className="text-3xl font-bold mb-6">🎓 Educational Videos</h1>

      <button
          onClick={() => router.push("/upload")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Upload New Video</span>
        </button>

        </div>

      

      {loading && <p className="text-gray-500">Loading videos...</p>}

      {!loading && error && (
        
        <div className="text-center text-gray-600">
          <p className="text-red-500 font-medium">{error}</p>
        </div>
      )}



      {!loading && !error && videos.length > 0 && (
        <VideoList videos={videos} />
      )}
    </div>
  );
}
