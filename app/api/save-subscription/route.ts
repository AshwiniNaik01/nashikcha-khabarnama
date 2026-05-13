import { NextRequest, NextResponse } from "next/server";

// Note: In a real app, you would save this subscription to your database (MongoDB, PostgreSQL, etc.)
// For now, we simulate success so the flow works.
export async function POST(req: NextRequest) {
  try {
    const subscription = await req.json();

    // Save to DB (IMPORTANT)
    console.log("New Push Subscription received:", subscription);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving subscription:", error);
    return NextResponse.json({ success: false, error: "Failed to save subscription" }, { status: 500 });
  }
}
