import { NextResponse } from "next/server";

// Step 2 of the Decap CMS GitHub OAuth flow: exchange the code for a token
// and hand it back to the CMS window via postMessage (Decap's protocol).
export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieState = req.headers
    .get("cookie")
    ?.match(/decap_oauth_state=([^;]+)/)?.[1];

  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;

  let payload: string;
  if (!code || !clientId || !clientSecret || !state || state !== cookieState) {
    payload = `authorization:github:error:${JSON.stringify({ error: "OAuth misconfigured or state mismatch" })}`;
  } else {
    try {
      const res = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
      });
      const data = (await res.json()) as { access_token?: string; error?: string };
      payload = data.access_token
        ? `authorization:github:success:${JSON.stringify({ token: data.access_token, provider: "github" })}`
        : `authorization:github:error:${JSON.stringify({ error: data.error ?? "no token" })}`;
    } catch {
      payload = `authorization:github:error:${JSON.stringify({ error: "token exchange failed" })}`;
    }
  }

  // Decap listens for a handshake message, then receives the result.
  const html = `<!doctype html><html><body><script>
    (function() {
      function receive(e) {
        window.opener.postMessage(${JSON.stringify(payload)}, e.origin);
        window.removeEventListener("message", receive, false);
      }
      window.addEventListener("message", receive, false);
      window.opener.postMessage("authorizing:github", "*");
    })();
  </script>Затваряне…</body></html>`;

  return new NextResponse(html, { headers: { "Content-Type": "text/html" } });
}
