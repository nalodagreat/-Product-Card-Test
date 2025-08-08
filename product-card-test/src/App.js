import React from "react";
import ProductCard from "./components/ProductCard";
import sampleProduct from "./data/sampleProduct";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Modern Product Card
          </h1>
          <p className="text-gray-600 text-lg">Sleek, interactive, and fully responsive design</p>
        </div>
        
        <div className="flex justify-center">
          <ProductCard product={sampleProduct} />
        </div>
      </div>
    </div>
  );
}