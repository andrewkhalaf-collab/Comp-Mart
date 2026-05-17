"use client";

import { useEffect } from "react";
import { Product } from "@/data/products";
import "./CompareModal.css";

const fmt = (n: number) => n.toLocaleString("en-EG") + " EGP";

interface CompareModalProps {
  items: Product[];
  onClose: () => void;
}

export default function CompareModal({ items, onClose }: CompareModalProps) {
  const allKeys = [...new Set(items.flatMap((p: Product) => Object.keys(p.specs)))];
  const prices = items.map((p: Product) => p.price);
  const minPrice = Math.min(...prices);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal cmp-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-hdr">
          <div className="modal-title">Side-by-Side Comparison</div>
          <div className="modal-sub">{items.length} products selected — lowest price highlighted</div>
        </div>
        <div className="cmp-scroll">
          <table className="cmp-tbl">
            <thead>
              <tr>
                <th>Specification</th>
                {items.map((p) => (
                  <th key={p.id}>
                    <span>{p.name}</span>
                    {p.variant && <><span className="compare-dash">–</span><span className="variant-inline">{p.variant}</span></>
                    }
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Price</td>
                {items.map((p) => (
                  <td key={p.id} className={p.price === minPrice ? "best" : ""}>
                    {fmt(p.price)}{p.price === minPrice && " ✓"}
                  </td>
                ))}
              </tr>
              {allKeys.map((key) => (
                <tr key={key}>
                  <td>{key}</td>
                  {items.map((p) => (
                    <td key={p.id}>{p.specs[key] ?? "—"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
