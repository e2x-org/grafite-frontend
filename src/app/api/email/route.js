import { NextResponse } from "next/server";

export async function GET(request) {
    const WEBHOOK = process.env.WEBHOOK;
    const email = request.nextUrl.searchParams.get("email");

    const response = await fetch(WEBHOOK, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "content": `Email: ${email}`,
            "embeds": null,
            "attachments": []
        })
    });

    if (response.ok) {
        return NextResponse.json({ message: "Email sent successfully" });
    } else {
        return NextResponse.error("Failed to send email");
    }
}