import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import {
  ReCaptchaV2Props,
  ReCaptchaV2Ref,
} from "./interfaces/reCaptchaV2.interface";

const siteKeyDevelop = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

/**
 * ReCaptchaV2 component - renders and manages an invisible Google reCAPTCHA v2 widget.
 *
 * @component
 * @param {ReCaptchaV2Props} props - Component props
 * @param {string} props.siteKey - Your reCAPTCHA v2 site key (production)
 * @param {boolean} [props.isDevelop=false] - If true, uses Google's test site key
 * @param {string} [props.badge='bottomright'] - Position of the reCAPTCHA badge
 * @param {string} [props.hl] - Language code to display reCAPTCHA (e.g., 'en', 'es')
 * @param {string} [props.size]
 * @param {() => void} [props.onError] - Called when the reCAPTCHA fails to load or validate
 * @param {() => void} [props.onExpired] - Called when the token expires before verification
 * @param {(token: string) => void} props.onSuccess - Called when the challenge is successfully solved
 * @param {React.Ref<ReCaptchaV2Ref>} ref - Ref exposing execute() and reset() methods
 *
 * @example
 * const recaptchaRef = useRef<ReCaptchaV2Ref>(null);
 *
 * <ReCaptchaV2
 *   ref={recaptchaRef}
 *   siteKey="your_site_key"
 *   onSuccess={(token) => console.log("Verified:", token)}
 * />
 *
 * recaptchaRef.current?.execute();
 */
const ReCaptchaV2 = forwardRef<ReCaptchaV2Ref, ReCaptchaV2Props>(
  (
    {
      siteKey,
      onSuccess,
      onError,
      onExpired,
      badge = "bottomright",
      hl,
      isDevelop = false,
      size = "invisible",
    },
    ref
  ) => {
    const recaptchaRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);

    // Expose imperative methods to parent via ref
    useImperativeHandle(ref, () => ({
      /**
       * Programmatically trigger the reCAPTCHA challenge.
       */
      execute: () => {
        if (grecaptcha && widgetIdRef.current !== null) {
          grecaptcha.execute(widgetIdRef.current.toString());
        }
      },
      /**
       * Reset the reCAPTCHA widget.
       */
      reset: () => {
        if (grecaptcha && widgetIdRef.current !== null) {
          grecaptcha.reset(widgetIdRef.current);
        }
      },
    }));

    // Load reCAPTCHA script and render the widget
    useEffect(() => {
      const scriptId = "recaptcha-script";
      const scriptSrc = `https://www.google.com/recaptcha/api.js?render=explicit${
        hl ? `&hl=${hl}` : ""
      }`;

      const loadScript = () => {
        if (!document.getElementById(scriptId)) {
          const script = document.createElement("script");
          script.id = scriptId;
          script.src = scriptSrc;
          script.async = true;
          script.defer = true;
          document.body.appendChild(script);
        }
      };

      loadScript();

      const renderRecaptcha = () => {
        if (
          grecaptcha &&
          recaptchaRef.current &&
          widgetIdRef.current === null
        ) {
          widgetIdRef.current = grecaptcha.render(recaptchaRef.current, {
            sitekey: isDevelop ? siteKeyDevelop : siteKey,
            size,
            badge,
            callback: onSuccess,
            "error-callback": onError,
            "expired-callback": onExpired,
          });
        }
      };

      const intervalId = setInterval(() => {
        if (grecaptcha) {
          clearInterval(intervalId);
          renderRecaptcha();
        }
      }, 500);

      return () => {
        clearInterval(intervalId);
      };
    }, [siteKey, onSuccess, onError, onExpired, badge, hl]);

    return <div ref={recaptchaRef} />;
  }
);

export default ReCaptchaV2;
