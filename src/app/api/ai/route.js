import { NextResponse } from "next/server";

export async function POST(request) {
    const url = process.env.AI_URL;    
    const body = await request.json();
    console.log(body)

    const payload = {
        "query": body.query,
        "k": 3, 
        "dataset": body.dataset,
        "conversation": body.conversation
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const result = await response.json();
        return NextResponse.json(result);
    } else {
        return NextResponse.error("Failed to get a response from the server.");
    }
}