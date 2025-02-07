
declare global {
  export interface Video {
    id: string; 
    user_id: string;
    title: string;
    description: string;
    video_url: string;
    num_comments: number;
    created_at: string; 
  }
  

  interface Comment {
    video_id: string;
    user_id: string;
    content: string;
    timestamp?: string;
  }

  type VideoListResponse = Video[];
  type VideoResponse = Video;
  type CommentListResponse = Comment[];
}

export {}; 
