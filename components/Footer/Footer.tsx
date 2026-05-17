"use client";

import { useEffect, useState } from "react";
import "./Footer.css";

export default function Footer() {
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(new Date().toLocaleDateString("en-EG", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    }));
  }, []);

  return (
    <footer className="footer">
      <div className="ornament">— ✦ —</div>
      <p>COMPUMARTS · سوق الكمبيوتر · All prices in Egyptian Pounds (EGP) · Prices subject to change without notice</p>
      <p style={{ marginTop: 6 }}>رقم التسجيل الضريبي: 000 – 000 – 000 · {today}</p>
    </footer>
  );
}
