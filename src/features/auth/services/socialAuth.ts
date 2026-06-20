import type { SocialProfile } from "../types";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: Record<string, unknown>) => void;
          prompt: () => void;
        };
      };
    };
    FB?: {
      init: (options: Record<string, unknown>) => void;
      login: (
        cb: (response: { authResponse?: { accessToken: string } }) => void,
        options?: Record<string, unknown>
      ) => void;
      api: (
        path: string,
        params: Record<string, unknown>,
        cb: (response: Record<string, unknown>) => void
      ) => void;
    };
  }
}

function decodeJwt(token: string): Record<string, unknown> {
  const payload = token.split(".")[1];
  const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
  return JSON.parse(decoded);
}

export async function signInWithGooglePopup(): Promise<SocialProfile> {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new Error("Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID");
  }
  if (!window.google?.accounts?.id) {
    throw new Error("Google Identity Services SDK not loaded");
  }

  return new Promise<SocialProfile>((resolve, reject) => {
    window.google!.accounts.id.initialize({
      client_id: clientId,
      callback: (response: { credential?: string }) => {
        if (!response.credential) {
          reject(new Error("Google login failed"));
          return;
        }
        const payload = decodeJwt(response.credential);
        resolve({
          provider: "google",
          email: String(payload.email || ""),
          name: String(payload.name || "Google User"),
          picture: payload.picture ? String(payload.picture) : undefined,
        });
      },
      auto_select: false,
      ux_mode: "popup",
      context: "signup",
      prompt_parent_id: "google-signin-anchor",
    });

    window.google!.accounts.id.prompt();
  });
}

export async function signInWithFacebookPopup(): Promise<SocialProfile> {
  if (!window.FB) {
    throw new Error("Facebook SDK not loaded");
  }

  return new Promise<SocialProfile>((resolve, reject) => {
    window.FB!.login(
      (loginResponse) => {
        if (!loginResponse?.authResponse?.accessToken) {
          reject(new Error("Facebook login failed"));
          return;
        }

        window.FB!.api(
          "/me",
          { fields: "name,email,picture" },
          (profileResponse) => {
            resolve({
              provider: "facebook",
              email: String(profileResponse.email || "facebook.user@facebook.com"),
              name: String(profileResponse.name || "Facebook User"),
              picture: profileResponse.picture
                ? String(
                    (profileResponse.picture as { data?: { url?: string } }).data?.url || ""
                  )
                : undefined,
            });
          }
        );
      },
      { auth_type: "reauthenticate", scope: "public_profile,email" }
    );
  });
}
