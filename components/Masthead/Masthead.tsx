"use client";

import { useEffect, useState } from "react";
import { Category, Product } from "@/data/products";
import "./Masthead.css";

interface MastheadProps {
  categories: Category[];
  products: Record<string, Product[]>;
  activeCategory: string;
  onCatChange: (catId: string) => void;
}

export default function Masthead({ categories, products, activeCategory, onCatChange }: MastheadProps) {
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(new Date().toLocaleDateString("en-EG", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    }));
  }, []);

  return (
    <header className="masthead">
      <div className="mast-top">
        <span>رقم التسجيل الضريبي: 000 – 000 – 000</span>
        <span>☎ ترقبوا المزيد من عروضنا المميزة</span>
        <span>{today}</span>
      </div>
      <div className="mast-center">
        <div className="shop-name">COMPUMARTS</div>
        <div className="shop-arabic">سوق الكمبيوتر</div>
        <div className="shop-tagline">Your Premier Destination for Computing Excellence · Since 1995</div>
      </div>
      <nav className="cat-nav">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`cat-btn ${activeCategory === cat.id ? "active" : ""}`}
            onClick={() => onCatChange(cat.id)}
          >
            {cat.icon} {cat.label}
            <span className="cat-count">{products[cat.id].length}</span>
          </button>
        ))}
      </nav>
    </header>
  );
}
