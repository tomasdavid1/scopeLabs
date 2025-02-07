import { NextRequest } from "next/server";

const API_URL = "https://take-home-assessment-423502.uc.r.appspot.com/videos"; // FastAPI Base URL

export async function GET(request: NextRequest) {
  try {
    const urlParts = request.nextUrl.pathname.split("/");
    const videoId = urlParts[urlParts.length - 1]; 

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

