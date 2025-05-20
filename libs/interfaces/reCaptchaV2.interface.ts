export interface ReCaptchaV2Props {
  badge?: "bottomright" | "bottomleft" | "inline";
  hl?: string;
  onError?: () => void;
  onExpired?: () => void;
  onSuccess: (token: string) => void;
  siteKey: string;
  isDevelop?: boolean;
}

export interface ReCaptchaV2Ref {
  execute: () => void;
  reset: () => void;
}
