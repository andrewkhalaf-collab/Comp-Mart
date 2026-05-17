"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "@/data/products";
import "./ProductModal.css";

const fmt = (n: number) => n.toLocaleString("en-EG") + " EGP";

interface ProductModalProps {
  product: Product;
  catIcon?: string;
  onClose: () => void;
}

export default function ProductModal({ product, catIcon, onClose }: ProductModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const [imgSrc, setImgSrc] = useState(product.image || '/product-placeholder.svg');

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-hdr">
          <div className="modal-title-wrapper">
            <div className="modal-title">{product.name}</div>
            {product.variant && <><span className="modal-dash">–</span><div className="modal-sub-inline">{product.variant}</div></>
            }
          </div>
          {product.badge && <span className="badge-inline">{product.badge}</span>}
        </div>
        <div className="modal-body">
          <div>
            <div className="modal-img">
              {product.image ? (
                <Image
                  src={imgSrc}
                  alt={product.name}
                  className="product-img-large"
                  fill
                  sizes="(max-width: 600px) 100vw, 50vw"
                  onError={() => setImgSrc('/product-placeholder.svg')}
                />
              ) : (
                catIcon
              )}
            </div>
            <div className="modal-price">{fmt(product.price)}</div>
          </div>
          <div>
            <p className="modal-desc">{product.desc}</p>
            <table className="spec-tbl">
              <tbody>
                {Object.entries(product.specs).map(([k, v]) => (
                  <tr key={k}>
                    <td>{k}</td>
                    <td>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
