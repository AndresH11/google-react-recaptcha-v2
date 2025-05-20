interface IRenderparams {
  callback?: (token) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
  sitekey: string;
  size?: "compact" | "normal" | "invisible";
  tabindex?: number;
  theme?: "dark" | "light";
  badge?: "bottomright" | "bottomleft" | "inline";
}

declare const grecaptcha: {
  render(container: string | HTMLElement, parameters: IRenderparams);
  reset(opt_widget_id?: string);
  getResponse(opt_widget_id?: string);
  execute(opt_widget_id?: string);
};
