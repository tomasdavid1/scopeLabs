import { useState } from "react";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline"; 

export default function UploadVideo() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleUpload = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const videoData = {
      user_id: "john_smith",
      title,
      description,
      video_url: videoUrl,
    };

    try {
      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(videoData),
      });

      if (!res.ok) throw new Error("Failed to upload video");


      setSuccess(true);
      setTimeout(() => router.push("/"), 1000); 
    } catch (err) {
      setError("Failed to upload video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-2 text-gray-700 hover:text-black mb-4"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        <span>Home</span>
      </button>
      <h1 className="text-2xl font-bold mb-4">Upload a Video</h1>

      {/* Title Input */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />

      {/* Description Input */}
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />

      {/* Video URL Input */}
      <input
        type="text"
        placeholder="Video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`w-full p-2 rounded ${loading ? "bg-gray-400" : "bg-blue-600 text-white"}`}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {/* Success & Error Messages */}
      {success && <p className="text-green-600 mt-2">✅ Video uploaded successfully! Redirecting...</p>}
      {error && <p className="text-red-600 mt-2">❌ {error}</p>}
    </div>
  );
}
