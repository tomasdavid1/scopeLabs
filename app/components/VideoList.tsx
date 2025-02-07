
import VideoCard from "./VideoCard";

interface VideoListProps {
  videos: Video[];
}

export default function VideoList({ videos }: VideoListProps) {
  return (
    <div className="video-list">
      {videos.length === 0 ? (
        <p>No videos found.</p>
      ) : (
        videos.map((video) => <VideoCard key={video.id} video={video} />)
      )}
    </div>
  );
}
