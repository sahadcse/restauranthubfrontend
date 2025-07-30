interface OAuthConfig {
  google: {
    clientId: string;
    redirectUri: string;
    scope: string;
  };
  facebook: {
    appId: string;
    redirectUri: string;
    scope: string;
  };
}

class SocialAuthService {
  private config: OAuthConfig | null = null;

  async getConfig(): Promise<OAuthConfig> {
    if (this.config) return this.config;

    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"
        }/auth/oauth/config`
      );
      const data = await response.json();
      this.config = data;
      return this.config!;
    } catch (error) {
      console.error("Failed to get OAuth config:", error);
      throw new Error("Failed to initialize social authentication");
    }
  }

  async initiateGoogleLogin(): Promise<void> {
    try {
      const config = await this.getConfig();
      const state = Math.random().toString(36).substring(2, 15);

      // Store state for validation
      sessionStorage.setItem("oauth_state", state);

      const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
      authUrl.searchParams.set("client_id", config.google.clientId);
      authUrl.searchParams.set("redirect_uri", config.google.redirectUri);
      authUrl.searchParams.set("response_type", "code");
      authUrl.searchParams.set("scope", config.google.scope);
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

  async initiateFacebookLogin(): Promise<void> {
    try {
      const config = await this.getConfig();
      const state = Math.random().toString(36).substring(2, 15);

      // Store state for validation
      sessionStorage.setItem("oauth_state", state);

      const authUrl = new URL("https://www.facebook.com/v18.0/dialog/oauth");
      authUrl.searchParams.set("client_id", config.facebook.appId);
      authUrl.searchParams.set("redirect_uri", config.facebook.redirectUri);
      authUrl.searchParams.set("response_type", "code");
      authUrl.searchParams.set("scope", config.facebook.scope);
      authUrl.searchParams.set("state", state);

      // Redirect to Facebook OAuth
      window.location.href = authUrl.toString();
    } catch (error) {
      console.error("Failed to initiate Facebook login:", error);
      throw error;
    }
  }
}

export const socialAuthService = new SocialAuthService();

// Export individual services for backward compatibility
export const googleAuthService = {
  getConfig: () =>
    socialAuthService.getConfig().then((config) => config.google),
  initiateGoogleLogin: () => socialAuthService.initiateGoogleLogin(),
};
