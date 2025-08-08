import React, { useState } from "react";

export default function ProductCard({ product }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  const handleVariantChange = (e) => {
    const variant = product.variants.find((v) => v.id === e.target.value);
    setSelectedVariant(variant);
  };

  const isAvailable = selectedVariant?.stock > 0;

  return (
    <div className="max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-500">
      <div className="relative overflow-hidden rounded-t-3xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover transform hover:scale-105 transition-transform duration-700"
        />
        {!isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-t-3xl">
            <span className="text-white text-lg font-semibold tracking-wider">
              OUT OF STOCK
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
          {product.name}
        </h2>

        <select
          value={selectedVariant.id}
          onChange={handleVariantChange}
          className="mb-6 p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
          aria-label="Select variant"
        >
          {product.variants.map((variant) => (
            <option key={variant.id} value={variant.id}>
              {variant.name}
            </option>
          ))}
        </select>

        <p className="text-4xl font-bold text-indigo-600 mb-8">
          ${selectedVariant.price.toFixed(2)}
        </p>

        <button
          disabled={!isAvailable}
          className={`mt-auto py-4 rounded-2xl font-semibold text-white shadow-lg transition
            ${
              isAvailable
                ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 hover:shadow-2xl"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          onClick={() =>
            isAvailable &&
            alert(`Added ${product.name} - ${selectedVariant.name} to cart`)
          }
        >
          {isAvailable ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}
