import webpush from "web-push";
import { NextRequest, NextResponse } from "next/server";

// We set vapid details outside the handler so it's initialized once.
// In a real application, ensure these env variables are set securely.
webpush.setVapidDetails(
  "mailto:contact@nasikchakhabarnama.com", // Replace with your actual email
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "",
  process.env.VAPID_PRIVATE_KEY || ""
);

export async function POST(req: NextRequest) {
  try {
    const { subscription, title, body } = await req.json();

    if (!subscription) {
      return NextResponse.json({ success: false, error: "Missing subscription" }, { status: 400 });
    }

    const payload = JSON.stringify({
      title: title || "Hello 👋",
      body: body || "This is a push notification from Nashikcha Khabarnama",
    });

    await webpush.sendNotification(subscription, payload);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending push notification:", error);
    return NextResponse.json({ success: false, error: "Failed to send notification" }, { status: 500 });
  }
}
