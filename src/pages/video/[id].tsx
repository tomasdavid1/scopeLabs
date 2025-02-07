import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import CommentSection from "@components/CommentSection";
import { ArrowLeftIcon } from "@heroicons/react/24/outline"; 


export default function VideoDetail() {
  const router = useRouter();
  const { id } = router.query; 
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  // Video player state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(1);

  // Fetch video details
  useEffect(() => {
    if (!id) return;

    async function fetchVideo() {
      try {
        const res = await fetch(`/api/videos/${id}`);
        const data: Video = await res.json();
        console.log("Video Data:", data);
        setVideo(data);
      } catch (error) {
        console.error("Error fetching video:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchVideo();
  }, [id]);

  // Convert YouTube URL to Embed URL
  const getEmbedUrl = (url: string) => {
    const youtubeRegex = /(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu.be\/)([a-zA-Z0-9_-]+)/;
    const match = url.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  


  const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const speed = parseFloat(e.target.value);
    setPlaybackSpeed(speed);
    if (videoRef.current) videoRef.current.playbackRate = speed;
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) videoRef.current.volume = newVolume;
  };

  if (loading) return <p className="text-gray-500">Loading video...</p>;
  if (!video) return <p className="text-red-500">Video not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-2 text-gray-700 hover:text-black mb-4"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        <span>Home</span>
      </button>

      <div className="relative">
        {video.video_url.includes("youtube.com") || video.video_url.includes("drive.google.com") || video.video_url.includes("youtu.be") ? (
          <iframe
            width="100%"
            height="400"
            src={getEmbedUrl(video.video_url)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-md"
          ></iframe>
        ) : (
          <video ref={videoRef} controls className="w-full rounded-lg shadow-md">
            <source src={video.video_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Playback Controls (Only for non-YouTube Videos) */}
        {!video.video_url.includes("youtube.com") && !video.video_url.includes("youtu.be") && (
          <div className="mt-4 flex justify-between items-center">
            {/* Speed Control */}
            <div className="flex items-center gap-2">
              <label htmlFor="speed" className="text-gray-700 font-semibold">Speed:</label>
              <select
                id="speed"
                value={playbackSpeed}
                onChange={handleSpeedChange}
                className="border p-1 rounded"
              >
                <option value="0.5">0.5x</option>
                <option value="1">1x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <label htmlFor="volume" className="text-gray-700 font-semibold">Volume:</label>
              <input
                id="volume"
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* Video Details */}
      <h1 className="text-2xl font-bold mt-4">{video.title}</h1>
      <p className="text-gray-600">{video.description}</p>

      <CommentSection videoId={id as string} />
    </div>
  );
}
