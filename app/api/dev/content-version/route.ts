import { getDevContentVersion } from "@/lib/dev-content-version";

export const dynamic = "force-dynamic";

export async function GET() {
  const headers = { "Cache-Control": "no-store" };
  if (process.env.NODE_ENV !== "development") {
    return new Response(null, { status: 404, headers });
  }

  try {
    return Response.json({ version: await getDevContentVersion() }, { headers });
  } catch {
    // Keep the current page while generated JSON is unavailable or incomplete.
    return new Response(null, { status: 503, headers });
  }
}
