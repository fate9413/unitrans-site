import { NextResponse } from "next/server";

// Step 1 of the Decap CMS GitHub OAuth flow: redirect to GitHub's consent page.
export async function GET(req: Request) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      { error: "GITHUB_OAUTH_CLIENT_ID is not configured" },
      { status: 501 }
    );
  }
  const url = new URL(req.url);
  const state = crypto.randomUUID();
  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", clientId);
  authorize.searchParams.set("redirect_uri", `${url.origin}/api/oauth/callback`);
  authorize.searchParams.set("scope", "repo,user");
  authorize.searchParams.set("state", state);

  const res = NextResponse.redirect(authorize.toString());
  res.cookies.set("decap_oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 600,
    path: "/",
  });
  return res;
}
