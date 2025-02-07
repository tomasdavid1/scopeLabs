import { NextRequest } from "next/server";

const API_URL = "https://take-home-assessment-423502.uc.r.appspot.com/videos"; // FastAPI Base URL

export async function GET(request: NextRequest) {
  try {
    const urlParts = request.nextUrl.pathname.split("/");
    const videoId = urlParts[urlParts.length - 2]; 

    if (!videoId) {
      return new Response(JSON.stringify({ error: "Video ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const finalUrl = `${API_URL}/comments?video_id=${videoId}`
    
    const fastapiRes = await fetch(finalUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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
    console.error("Error fetching comments:", error);

    return new Response(JSON.stringify({ error: "Failed to fetch comments" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request: NextRequest) {
  try {
 
    const body = await request.json(); 



    if (!body.video_id || !body.content) {

      return new Response(JSON.stringify({ error: "Video ID and comment text are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const fastapiRes = await fetch(`${API_URL}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: body.content, video_id: body.video_id, user_id: body.user_id || "Anonymous" })
    });

    if (!fastapiRes.ok) {
      throw new Error(`FastAPI Error: ${fastapiRes.status} ${fastapiRes.statusText}`);
    }

    const data = await fastapiRes.json();

    return new Response(JSON.stringify(data), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error posting comment:", error);

    return new Response(JSON.stringify({ error: "Failed to post comment" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}