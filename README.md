# 🛡️ React ReCaptchaV2

A lightweight and developer-friendly React component for rendering an **invisible Google reCAPTCHA v2 widget**. It supports custom callbacks, localization, badge positioning, and can be triggered programmatically using `ref`.

> ✅ Supports TypeScript  
> ✅ Works in development and production environments  
> ✅ Easily integrates with forms or async flows  
> ✅ Minimal and clean API

---

## 📦 Installation

```bash
npm install google-react-recaptcha-v2
# or
yarn add google-react-recaptcha-v2
# or
yarn add google-react-recaptcha-v2
```

---

## 🚀 Getting Started

### 1. Import the Component

```tsx
import { ReCaptchaV2, ReCaptchaV2Ref } from "google-react-recaptcha-v2";
```

### 2. Add the Component to Your Form

```tsx
import { useRef } from "react";
import { ReCaptchaV2, ReCaptchaV2Ref } from "google-react-recaptcha-v2";

export default function MyForm() {
  const recaptchaRef = useRef<ReCaptchaV2Ref>(null);

  const handleSubmit = (e) => {
    (e) => e.preventDefault();
    recaptchaRef.current?.execute();
  };

  const handleRecaptchaSuccess = (token: string) => {
    console.log("reCAPTCHA token:", token);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>

      <ReCaptchaV2
        ref={recaptchaRef}
        siteKey="YOUR_PRODUCTION_SITE_KEY"
        onSuccess={handleRecaptchaSuccess}
      />
    </>
  );
}
```

---

## 🧠 Props

### `ReCaptchaV2Props`

| Prop        | Type                                        | Required | Default         | Description                                                   |
| ----------- | ------------------------------------------- | -------- | --------------- | ------------------------------------------------------------- |
| `siteKey`   | `string`                                    | ✅       | –               | Your **production** Google reCAPTCHA v2 site key.             |
| `onSuccess` | `(token: string) => void`                   | ✅       | –               | Callback when reCAPTCHA is solved successfully.               |
| `onError`   | `() => void`                                | ❌       | –               | Callback when reCAPTCHA fails to render or complete.          |
| `onExpired` | `() => void`                                | ❌       | –               | Called when the token expires before verification.            |
| `badge`     | `"bottomright" \| "bottomleft" \| "inline"` | ❌       | `"bottomright"` | Position of the reCAPTCHA badge on screen.                    |
| `hl`        | `string`                                    | ❌       | –               | Language code (e.g., `"en"`, `"es"`) for localization.        |
| `isDevelop` | `boolean`                                   | ❌       | `false`         | Uses Google's default test key if true (`"6LeIxAcTAAAA..."`). |
| `size`      | `"invisible" \| "normal" \| "compact"`      | ❌       | `invisible`     | Size of the recaptcha                                         |

---

## 🧪 Ref Methods

### `ReCaptchaV2Ref`

| Method    | Type         | Description                                     |
| --------- | ------------ | ----------------------------------------------- |
| `execute` | `() => void` | Triggers the invisible reCAPTCHA challenge.     |
| `reset`   | `() => void` | Resets the widget and clears the current token. |

---

## 📌 Examples

### 🌐 With Custom Language

```tsx
<ReCaptchaV2
  ref={recaptchaRef}
  siteKey="YOUR_SITE_KEY"
  hl="es"
  onSuccess={(token) => console.log("Token:", token)}
/>
```

### 🧪 Development Mode

```tsx
<ReCaptchaV2
  isDevelop
  ref={recaptchaRef}
  siteKey="will-be-ignored"
  onSuccess={(token) => console.log("Test token:", token)}
/>
```

### 🧭 Custom Badge Position

```tsx
<ReCaptchaV2
  badge="bottomleft"
  ref={recaptchaRef}
  siteKey="YOUR_SITE_KEY"
  onSuccess={(token) => console.log("Token:", token)}
/>
```

---

## 🧰 Tips

- The reCAPTCHA will not trigger until you call `execute()` manually.
- Invisible reCAPTCHA is ideal for **non-intrusive** validation before submitting sensitive actions (e.g., form submit, comment, delete).
- If you need visible challenges, consider switching to size `"normal"` or `"compact"`

---

## 🧪 Test Key for Local Development

Use this key when testing locally (no need to register it):

```ts
siteKey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
```

---

## 📜 License

MIT © [Andrés Felipe Hernández Aldana](https://github.com/AndresH11)

---

## 💡 Credits

Built using:

- [Google reCAPTCHA v2](https://developers.google.com/recaptcha/docs/invisible)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
