"use client";

import { useEffect, useRef, useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button type="button" className="btn btn-solid btn-mono" onClick={copy} aria-label={`이메일 주소 ${email} 복사하기`}>
      <span>{email}</span>
      <span className="btn-hint" aria-live="polite">{copied ? "복사했어요 ✓" : "복사"}</span>
    </button>
  );
}
