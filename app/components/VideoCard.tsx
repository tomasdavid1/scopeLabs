import { useRouter } from "next/router";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const router = useRouter();

  return (
    <div
      className="video-card border p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer"
      onClick={() => router.push(`/video/${video.id}`)}
    >
      {/* Thumbnail */}
      <img
        src={`https://img.youtube.com/vi/${getYouTubeId(video.video_url)}/hqdefault.jpg`}
        alt={video.title}
        className="video-thumbnail w-full rounded-lg"
      />

      <div className="video-info mt-2">
        <h3 className="font-bold text-lg">{video.title}</h3>
        <p className="text-gray-600 text-sm">{video.description}</p>

        <div className="flex justify-between items-center mt-2 text-gray-500 text-sm">

          <div className="flex items-center gap-1">
            <ChatBubbleLeftIcon className="w-4 h-4" />
            <span>{video.num_comments} comments</span>
          </div>

          {/* Formatted Date */}
          <span>{formatDate(video.created_at)}</span>
        </div>
      </div>
    </div>
  );
}

// Helper function to extract YouTube video ID
function getYouTubeId(url: string): string {
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/[^\/]+|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/);
  return match ? match[1] : "";
}

// 📌 Helper function to format date
function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
