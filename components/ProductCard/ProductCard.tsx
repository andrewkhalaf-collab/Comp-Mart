"use client";

import Image from "next/image";
import { useState } from "react";
import { Product } from "@/data/products";
import "./ProductCard.css";

const fmt = (n: number) => n.toLocaleString("en-EG") + " EGP";

interface ProductCardProps {
  product: Product;
  catIcon?: string;
  inCompare: boolean;
  onToggle: () => void;
  onView: () => void;
}

export default function ProductCard({ product, catIcon, inCompare, onToggle, onView }: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState(product.image || '/product-placeholder.svg');
  const entries = Object.entries(product.specs).slice(0, 4);
  return (
    <div className={`card ${inCompare ? "in-compare" : ""}`} onClick={onView}>
      {product.badge && <div className="card-badge">{product.badge}</div>}
      <div className="card-img">
        {product.image ? (
          <Image
            src={imgSrc}
            alt={product.name}
            className="product-img"
            fill
            sizes="(max-width: 480px) 100vw, 33vw"
            onError={() => setImgSrc('/product-placeholder.svg')}
          />
        ) : (
          <span className="card-icon">{catIcon}</span>
        )}
        <span className="card-img-label">COMPUMARTS</span>
      </div>
      <div className="card-body">
        <div className="card-header">
          <div className="card-name">{product.name}</div>
          {product.variant && <><span className="card-dash">–</span><div className="card-variant">{product.variant}</div></>
          }
        </div>
        <ul className="card-specs">
          {entries.map(([k, v]) => (
            <li key={k}><span className="sk">{k}</span><span className="sv">{v}</span></li>
          ))}
        </ul>
        <div className="card-price">
          {fmt(product.price)}
          <span className="price-sub">Egyptian Pounds · incl. VAT</span>
        </div>
      </div>
      <div className="card-actions">
        <button className="c-btn" onClick={(e) => { e.stopPropagation(); onView(); }}>
          ◈ Details
        </button>
        <button
          className={`c-btn ${inCompare ? "cmp-on" : ""}`}
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
        >
          {inCompare ? "✓ Comparing" : "+ Compare"}
        </button>
      </div>
    </div>
  );
}
