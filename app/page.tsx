"use client";

import { useState, useCallback } from "react";
import { CATEGORIES, PRODUCTS, Product } from "@/data/products";
import Masthead from "@/components/Masthead/Masthead";
import ProductCard from "@/components/ProductCard/ProductCard";
import ProductModal from "@/components/ProductModal/ProductModal";
import CompareModal from "@/components/CompareModal/CompareModal";
import CompareBar from "@/components/CompareBar/CompareBar";
import Footer from "@/components/Footer/Footer";
import "./CompuMarts.css";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("GPU");
  const [compareList, setCompareList]       = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCompare, setShowCompare]       = useState(false);
  const [search, setSearch]                 = useState("");
  const [sortBy, setSortBy]                 = useState("default");

  const catMeta = CATEGORIES.find((c) => c.id === activeCategory);

  const filtered = (PRODUCTS[activeCategory] || [])
    .filter((p: Product) => {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        (p.variant || "").toLowerCase().includes(q) ||
        (p.badge || "").toLowerCase().includes(q)
      );
    })
    .sort((a: Product, b: Product) => {
      if (sortBy === "price-asc")  return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name")       return a.name.localeCompare(b.name);
      return 0;
    });

  const toggleCompare = useCallback((product: Product) => {
    setCompareList((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev.filter((p) => p.id !== product.id);
      if (prev.length >= 3) return [...prev.slice(1), product];
      return [...prev, product];
    });
  }, []);

  const isInCompare = (id: string) => compareList.some((p) => p.id === id);

  const handleCatChange = (catId: string) => {
    setActiveCategory(catId);
    setCompareList([]);
    setSearch("");
    setSortBy("default");
  };

  return (
    <div id="root">
      <Masthead 
        categories={CATEGORIES} 
        products={PRODUCTS} 
        activeCategory={activeCategory} 
        onCatChange={handleCatChange} 
      />

      <main className="main">
        {/* Section header */}
        <div className="sec-hdr">
          <div className="sec-line" />
          <div className="sec-title">{catMeta?.icon} {catMeta?.label}</div>
          <div className="sec-line r" />
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <input
            className="search-in"
            type="text"
            placeholder={`Search ${activeCategory}…`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="sort-sel" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name">Name: A – Z</option>
          </select>
          <div className="results-count">{filtered.length} item{filtered.length !== 1 ? "s" : ""}</div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="empty">No products found for &quot;{search}&quot;</div>
        ) : (
          <div className="grid">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                catIcon={catMeta?.icon}
                inCompare={isInCompare(product.id)}
                onToggle={() => toggleCompare(product)}
                onView={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        )}

        <Footer />
      </main>

      <CompareBar 
        compareList={compareList} 
        onToggle={toggleCompare} 
        onShowCompare={() => setShowCompare(true)} 
        onClear={() => setCompareList([])} 
      />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          catIcon={catMeta?.icon}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {showCompare && compareList.length >= 2 && (
        <CompareModal items={compareList} onClose={() => setShowCompare(false)} />
      )}
    </div>
  );
}
