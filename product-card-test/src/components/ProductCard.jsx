import React, { useState } from "react";

const ShoppingCart = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0h9" />
  </svg>
);

const Heart = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.682l-1.318-1.364a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const ChevronDown = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const Check = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default function ProductCard({ product }) {
  // Varianti ordinate secondo la tua richiesta
  const orderedVariants = [
    product.variants.find(v => v.id === "vRed"),
    product.variants.find(v => v.id === "vCrimson"),
    product.variants.find(v => v.id === "vBrown"),
    product.variants.find(v => v.id === "vMix"),
  ].filter(Boolean);

  const [selectedVariant, setSelectedVariant] = useState(orderedVariants[0]);
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isAvailable = selectedVariant.stock > 0;
  const discountPercentage = Math.round(((product.originalPrice - selectedVariant.price) / product.originalPrice) * 100);

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    setDropdownOpen(false);
  };
  
  const handleAddToCart = async () => {
    if (!isAvailable) return;
    
    setAddingToCart(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setAddingToCart(false);
    alert(`✨ ${product.name} (${selectedVariant.name}) added to cart!`);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<svg key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24" fill="currentColor"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>);
    }
    if (hasHalfStar) {
      stars.push(<svg key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" viewBox="0 0 24 24" fill="currentColor"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>);
    }
    
    return stars;
  };

  return (
    <div 
      className="group relative w-full max-w-sm mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 transition-all duration-500 hover:shadow-3xl hover:-translate-y-2">
        <div className="absolute inset-0 bg-slate-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-gray-50 to-gray-100">
          <img
            src={selectedVariant.image}
            alt={`${product.name} - ${selectedVariant.name}`}
            className="w-full h-72 object-cover transition-all duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {discountPercentage > 0 && (
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                -{discountPercentage}%
              </div>
            )}
            {selectedVariant.stock <= 3 && selectedVariant.stock > 0 && (
              <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                Only {selectedVariant.stock} left
              </div>
            )}
          </div>

          <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
              aria-label="Toggle favorite"
            >
              <Heart className={`w-5 h-5 transition-colors duration-200 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </button>
          </div>

          {!isAvailable && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center">
              <div className="text-center">
                <div className="text-white font-bold text-xl mb-2">Out of Stock</div>
                <div className="text-gray-300 text-sm">This variant is currently unavailable</div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="flex">
              {renderStars(product.rating)}
            </div>
            <span className="text-gray-600 font-medium">{product.rating}</span>
            <span className="text-gray-400">({product.reviews} reviews)</span>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 leading-tight">{product.name}</h3>

          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{product.description}</p>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-indigo-600">${selectedVariant.price.toFixed(2)}</span>
            {discountPercentage > 0 && (
              <span className="text-lg text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Select Variant:</label>
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between hover:border-indigo-300 focus:outline-none focus:border-indigo-500 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: selectedVariant.color }}
                    />
                    <div className="text-left">
                      <div className="font-medium text-gray-900">{selectedVariant.name}</div>
                      <div className="text-sm text-gray-500">${selectedVariant.price.toFixed(2)}</div>
                    </div>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      dropdownOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-20 overflow-auto max-h-52">
                    {orderedVariants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => handleVariantSelect(variant)}
                        disabled={variant.stock === 0}
                        className={`w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors duration-150 ${
                          variant.stock === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                        } ${selectedVariant.id === variant.id ? 'bg-indigo-50' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-6 h-6 rounded-full border-2 border-gray-300 relative"
                            style={{ backgroundColor: variant.color }}
                          >
                            {variant.stock === 0 && (
                              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                                <div className="w-4 h-px bg-white transform rotate-45" />
                              </div>
                            )}
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-gray-900">
                              {variant.name}
                              {variant.stock === 0 && (
                                <span className="text-red-500 text-sm ml-2">(Out of Stock)</span>
                              )}
                            </div>
                            <div className="text-sm text-gray-500">
                              ${variant.price.toFixed(2)}
                              {variant.stock > 0 && variant.stock <= 3 && (
                                <span className="text-orange-500 ml-2">Only {variant.stock} left</span>
                              )}
                            </div>
                          </div>
                        </div>
                        {selectedVariant.id === variant.id && (
                          <Check className="w-5 h-5 text-indigo-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-sm font-semibold text-gray-700">Quick Color Select:</span>
              <div className="flex gap-3">
                {orderedVariants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => handleVariantSelect(variant)}
                    disabled={variant.stock === 0}
                    className={`relative w-12 h-12 rounded-xl transition-all duration-300 ${
                      selectedVariant.id === variant.id
                        ? 'ring-4 ring-indigo-500 ring-offset-2 scale-110'
                        : 'hover:scale-105'
                    } ${variant.stock === 0 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                    style={{ backgroundColor: variant.color }}
                    title={`${variant.name} ${variant.stock === 0 ? '(Out of Stock)' : ''}`}
                  >
                    {selectedVariant.id === variant.id && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full shadow-lg" />
                      </div>
                    )}
                    {variant.stock === 0 && (
                      <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                        <div className="w-6 h-px bg-white transform rotate-45" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!isAvailable || addingToCart}
            className={`w-full py-4 px-6 rounded-2xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
              !isAvailable
                ? 'bg-gray-400 cursor-not-allowed'
                : addingToCart
                ? 'bg-indigo-400 cursor-wait'
                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-500/25 active:scale-95'
            }`}
          >
            {addingToCart ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Adding to Cart...
              </>
            ) : !isAvailable ? (
              "Out of Stock"
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="absolute -inset-1 bg-indigo-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
    </div>
  );
}
