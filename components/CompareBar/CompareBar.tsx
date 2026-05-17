"use client";

import { Product } from "@/data/products";
import "./CompareBar.css";

interface CompareBarProps {
  compareList: Product[];
  onToggle: (product: Product) => void;
  onShowCompare: () => void;
  onClear: () => void;
}

export default function CompareBar({ compareList, onToggle, onShowCompare, onClear }: CompareBarProps) {
  return (
    <div className={`cmp-bar ${compareList.length >= 2 ? "show" : ""}`}>
      <span className="cmp-label">Compare ({compareList.length}/3)</span>
      <div className="cmp-chips">
        {compareList.map((p) => (
          <div key={p.id} className="cmp-chip">
            {p.name}{p.variant ? ` — ${p.variant}` : ""}
            <span className="cmp-rm" onClick={() => onToggle(p)}>×</span>
          </div>
        ))}
      </div>
      <button className="cmp-go" onClick={onShowCompare}>Compare Now</button>
      <button className="cmp-clr" onClick={onClear}>Clear</button>
    </div>
  );
}
