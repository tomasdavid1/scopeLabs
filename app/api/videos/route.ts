import { NextRequest } from "next/server";

const API_URL = "https://take-home-assessment-423502.uc.r.appspot.com/videos"; // FastAPI Base URL

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");

    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Fetch data from FastAPI backend
    const fastapiRes = await fetch(`${API_URL}?user_id=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });



    if (!fastapiRes.ok) {
      throw new Error(`FastAPI Error: ${fastapiRes.status} ${fastapiRes.statusText}`);
    }

    const data = await fastapiRes.json(); // Parse JSON response

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching videos:", error);

    return new Response(JSON.stringify({ error: "Failed to fetch videos" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// ✅ Handle POST request to create a new video
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, title, description, video_url } = body;

    if (!user_id || !title || !description || !video_url) {
      return new Response(JSON.stringify({ error: "All fields are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Send data to FastAPI
    const fastapiRes = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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
    console.error("Error creating video:", error);

    return new Response(JSON.stringify({ error: "Failed to create video" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
