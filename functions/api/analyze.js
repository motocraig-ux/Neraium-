export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const formData = await request.formData();

    const upstream = await fetch(env.BACKEND_ANALYZE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.NERAIUM_API_KEY}`
      },
      body: formData
    });

    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("Content-Type") || "application/json"
      }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        error: "Proxy request failed",
        message: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}