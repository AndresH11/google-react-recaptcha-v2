// ========================
// TypeScript Interfaces
// ========================

/**
 * Props for the ReCaptchaV2 component.
 */
export interface ReCaptchaV2Props {
  /**
   * Position of the reCAPTCHA badge on the screen.
   * - `bottomright` (default)
   * - `bottomleft`
   * - `inline`
   */
  badge?: "bottomright" | "bottomleft" | "inline";

  /**
   * Language code (optional).
   * Example: 'en', 'es', 'fr'.
   * Will be passed to the reCAPTCHA API script.
   */
  hl?: string;

  /**
   * Called when the reCAPTCHA verification fails due to an error.
   */
  onError?: () => void;

  /**
   * Called when the reCAPTCHA token expires before it is used.
   */
  onExpired?: () => void;

  /**
   * Called when the reCAPTCHA verification is successful.
   * Receives the token string as an argument.
   */
  onSuccess: (token: string) => void;

  /**
   * Your site key provided by Google reCAPTCHA.
   * This is required unless `isDevelop` is true.
   */
  siteKey: string;

  /**
   * Optional flag to use Google's test site key in development mode.
   * If true, overrides `siteKey` with a default testing key.
   */
  isDevelop?: boolean;

  size?: "invisible" | "normal" | "compact";
}

/**
 * Public methods exposed through the component ref.
 */
export interface ReCaptchaV2Ref {
  /**
   * Triggers the reCAPTCHA challenge manually.
   */
  execute: () => void;

  /**
   * Resets the reCAPTCHA widget and clears the token.
   */
  reset: () => void;
}
