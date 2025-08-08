import React from "react";
import ProductCard from "./components/ProductCard";
import sampleProduct from "./data/sampleProduct";

function App() {
  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <ProductCard product={sampleProduct} />
    </main>
  );
}

export default App;
