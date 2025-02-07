import { useState } from "react";

export function useAddComment(videoId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/videos/${videoId}/comments`);
      const data: { comments: Comment[] } = await res.json();
      setComments(data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const commentData = {
      video_id: videoId,
      content: newComment,
      user_id: "john_smith", // Replace with dynamic user
    };

    try {
      const res = await fetch(`/api/videos/${videoId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData),
      });

      if (res.ok) {
        console.log("✅ Comment added successfully");
        setNewComment(""); // Clear input
        await fetchComments(); // ✅ Re-fetch all comments
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return { comments, setComments, newComment, setNewComment, handleAddComment, fetchComments };
}
