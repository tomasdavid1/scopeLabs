import { NextRequest } from "next/server";

const API_URL = "https://take-home-assessment-423502.uc.r.appspot.com/videos"; // FastAPI Base URL

export async function GET(request: NextRequest, { params }: { params: { videoId: string } }) {
  try {
    const videoId = params.videoId;


    console.log(API_URL)
    if (!videoId) {
      return new Response(JSON.stringify({ error: "Video ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Fetch video from FastAPI
    const fastapiRes = await fetch(`${API_URL}/single?video_id=${videoId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!fastapiRes.ok) {
      throw new Error(`FastAPI Error: ${fastapiRes.status} ${fastapiRes.statusText}`);
    }

    const data : {video : Video} = await fastapiRes.json(); // Parse JSON response

    return new Response(JSON.stringify(data.video), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error fetching video:", error);

    return new Response(JSON.stringify({ error: "Failed to fetch video" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// ✅ Handle PUT request to edit a video
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const videoId = params.id;
    const body = await request.json();
    const { title, description } = body;

    if (!videoId || !title || !description) {
      return new Response(JSON.stringify({ error: "Video ID, title, and description are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Send updated data to FastAPI
    const fastapiRes = await fetch(API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        video_id: videoId,
        title,
        description,
      }),
    });

    if (!fastapiRes.ok) {
      throw new Error(`FastAPI Error: ${fastapiRes.status} ${fastapiRes.statusText}`);
    }

    const data = await fastapiRes.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error updating video:", error);

    return new Response(JSON.stringify({ error: "Failed to update video" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
