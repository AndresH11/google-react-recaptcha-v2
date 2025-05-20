import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import {
  ReCaptchaV2Props,
  ReCaptchaV2Ref,
} from "./interfaces/reCaptchaV2.interface";

const siteKeyDevelop = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

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
    },
    ref
  ) => {
    const recaptchaRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);

    useImperativeHandle(ref, () => ({
      execute: () => {
        if (grecaptcha && widgetIdRef.current !== null) {
          grecaptcha.execute(widgetIdRef.current.toString());
        }
      },
      reset: () => {
        if (grecaptcha && widgetIdRef.current !== null) {
          grecaptcha.reset(widgetIdRef.current);
        }
      },
    }));

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
            size: "invisible",
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
