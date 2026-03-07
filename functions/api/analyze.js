export async function onRequestPost(context) {
  try {
    const formData = await context.request.formData();

    const response = await fetch(context.env.ANALYZER_URL, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + context.env.API_KEY
      }
    });

    return new Response(await response.text(), {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/json"
      }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "Function failed",
        error: String(error)
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}