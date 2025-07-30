interface GoogleOAuthConfig {
  clientId: string;
  redirectUri: string;
  scope: string;
}

class GoogleAuthService {
  private config: GoogleOAuthConfig | null = null;

  async getConfig(): Promise<GoogleOAuthConfig> {
    if (this.config) return this.config;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/auth/google/config`
      );
      const data = await response.json();
      this.config = data.google;
      return this.config!;
    } catch (error) {
      console.error("Failed to get Google OAuth config:", error);
      throw new Error("Failed to initialize Google authentication");
    }
  }

  async initiateGoogleLogin(): Promise<void> {
    try {
      const config = await this.getConfig();
      const state = Math.random().toString(36).substring(2, 15);
      
      // Store state for validation
      sessionStorage.setItem("oauth_state", state);
      
      const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
      authUrl.searchParams.set("client_id", config.clientId);
      authUrl.searchParams.set("redirect_uri", config.redirectUri);
      authUrl.searchParams.set("response_type", "code");
      authUrl.searchParams.set("scope", config.scope);
      authUrl.searchParams.set("access_type", "offline");
      authUrl.searchParams.set("prompt", "consent");
      authUrl.searchParams.set("state", state);

      // Redirect to Google OAuth
      window.location.href = authUrl.toString();
    } catch (error) {
      console.error("Failed to initiate Google login:", error);
      throw error;
    }
  }
}

export const googleAuthService = new GoogleAuthService();
