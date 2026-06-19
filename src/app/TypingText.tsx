"use client";

import { useEffect, useState } from "react";

const WORDS = [
  "백엔드 개발자",
  "Java / Spring Boot",
  "기본기에 충실한 개발자",
  "문제를 즐기는 개발자",
];

const TYPE_SPEED   = 60;
const DELETE_SPEED = 35;
const PAUSE        = 1800;

export default function TypingText() {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx]     = useState(0);
  const [typing, setTyping]       = useState(true);

  useEffect(() => {
    const target = WORDS[wordIdx];

    if (typing) {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), TYPE_SPEED);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), PAUSE);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), DELETE_SPEED);
        return () => clearTimeout(t);
      } else {
        setWordIdx(i => (i + 1) % WORDS.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, wordIdx]);

  return (
    <span className="typing-text">
      {displayed}
      <span className="typing-cursor" aria-hidden="true" />
    </span>
  );
}
