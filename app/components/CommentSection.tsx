import { useEffect } from "react";
import { useAddComment } from "@hooks/useAddComment";

interface CommentSectionProps {
  videoId: string;
}

export default function CommentSection({ videoId }: CommentSectionProps) {
  const { fetchComments, comments, setComments, newComment, setNewComment, handleAddComment } = useAddComment(videoId);

  useEffect(() => {

  fetchComments();
  }, [videoId, setComments]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Comments</h2>

      {/* New Comment Input */}
      <div className="flex items-center gap-2 mt-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border rounded p-2"
        />
        <button onClick={handleAddComment} className="bg-blue-600 text-white px-4 py-2 rounded">
          Post
        </button>
      </div>

      {/* Display Comments */}
      <div className="mt-4 space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.timestamp} className="border p-3 rounded bg-white shadow">
              <p className="font-semibold">{comment.user_id}</p>
              <p>{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
