import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Features/cartSlice";
import { addToWishlist, removeFromWishlist } from "../Features/wishlistSlice";
import { fetchProducts } from "../Features/productsSlice";
import { useExperiment } from "@growthbook/growthbook-react";
import { growthbook } from "../growthbook";

const experimentConfig = {
  key: "pdp-pricing-test",
  variations: ["control", "variant-a", "variant-b"],
  weights: [0.34, 0.33, 0.33] // Even split
};

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, status } = useSelector(state => state.products);
  const wishlistItems = useSelector(state => state.wishlist.items);

  const productId = Number(id);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const item = items.find((p) => p.id === productId);

  // GrowthBook Experiment Implementation
  const experiment = experimentConfig;
  const result = useExperiment(experiment) || {};
  const variant = result.value || "control";

  useEffect(() => {
    if (!variant) return;

    console.log("Experiment Viewed", {
      experiment_id: "pdp-pricing-test",
      variation_id: variant
    });

    if (window.gtag) {
      window.gtag("event", "experiment_viewed", {
        experiment_id: "pdp-pricing-test",
        variation_id: variant
      });
    }

    // GrowthBook warehouse tracking
    if (growthbook && typeof growthbook.track === "function") {
      growthbook.track("experiment_viewed", {
        experiment_id: "pdp-pricing-test",
        variation_id: variant
      });
    }
  }, [variant]);

  if (!item) return <div className="text-center py-20 text-xl">Loading...</div>

  // Dynamic pricing and offer based on variant
  let displayPrice = item.price;
  let bundleDetails = null;

  if (variant === "variant-a") {
    displayPrice = 79.95;
    bundleDetails = {
      title: "Limited Time Offer: Test A",
      description: "2 pairs bundle with an exclusive 10% discount!",
      savings: "Save 10% on your total"
    };
  } else if (variant === "variant-b") {
    displayPrice = 79.95;
    bundleDetails = {
      title: "Premium Bundle: Test B",
      description: "Buy 2 for $159.95 and get 1 Free pair of Insoles (Value $29.95)",
      savings: "FREE $29.95 Insoles included!"
    };
  } else {
    // Control
    displayPrice = 69.95;
    bundleDetails = {
      title: "Current Best Value",
      description: "Standard 3 pairs bundle for maximum savings.",
      savings: "Most popular choice"
    };
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 mt-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
        >
          ← Back to Products
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Image Section */}
            <div className="relative bg-gray-50 p-8 flex items-center justify-center rounded-lg">
              <img
                src={item.image}
                alt={item.title}
                className="object-contain max-h-96 w-full transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-sm">
                ID: #{item.id}
              </div>

              {/* Variant Badge for Testing/Demo */}
              <div className="absolute bottom-4 right-4 bg-gray-800 text-white text-[10px] uppercase tracking-widest px-2 py-1 rounded opacity-50">
                Experiment: {variant}
              </div>

              <button
                onClick={() => {
                  const isInWishlist = wishlistItems.some((w) => w.id === item.id);
                  if (isInWishlist) {
                    dispatch(removeFromWishlist(item.id));
                  } else {
                    dispatch(addToWishlist(item));
                  }
                }}
                className={`absolute top-4 left-4 p-3 rounded-full transition-all duration-200 ${wishlistItems.some((w) => w.id === item.id)
                    ? 'bg-pink-500 text-white'
                    : 'bg-white text-gray-400 hover:text-pink-500'
                  } shadow-md hover:shadow-lg`}
                title={wishlistItems.some((w) => w.id === item.id) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {item.title}
                </h1>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {item.description || 'No description available.'}
                </p>

                {/* GrowthBook Bundle Banner */}
                <div className={`mb-6 p-4 rounded-lg border-l-4 ${variant === 'control' ? 'bg-blue-50 border-blue-500' :
                    variant === 'variant-a' ? 'bg-green-50 border-green-500' : 'bg-purple-50 border-purple-500'
                  }`}>
                  <h3 className="font-bold text-gray-800">{bundleDetails.title}</h3>
                  <p className="text-sm text-gray-600">{bundleDetails.description}</p>
                  <span className="text-xs font-bold uppercase tracking-wider mt-2 block text-indigo-600">
                    {bundleDetails.savings}
                  </span>
                </div>

                {item.category && (
                  <div className="mb-4">
                    <span className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                  </div>
                )}

                {item.rating && (
                  <div className="mb-6 flex items-center gap-2">
                    <span className="text-yellow-500 text-lg">★</span>
                    <span className="font-semibold">{item.rating.rate}</span>
                    <span className="text-gray-500">({item.rating.count} reviews)</span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex flex-col mb-6">
                  <div className="flex items-center justify-between">
                    <span className={`text-4xl font-bold ${variant === 'control' ? 'text-green-600' : 'text-blue-600'
                      }`}>
                      ${displayPrice}
                    </span>
                    {variant !== 'control' && (
                      <span className="text-gray-400 line-through text-lg">
                        ${variant === 'variant-a' ? '88.85' : '109.90'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      const isInWishlist = wishlistItems.some((w) => w.id === item.id);
                      if (isInWishlist) {
                        dispatch(removeFromWishlist(item.id));
                      } else {
                        dispatch(addToWishlist(item));
                      }
                    }}
                    className={`flex-1 font-bold py-4 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl text-lg ${wishlistItems.some((w) => w.id === item.id)
                        ? 'bg-pink-500 hover:bg-pink-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      }`}
                  >
                    {wishlistItems.some((w) => w.id === item.id) ? '💝 In Wishlist' : '🤍 Add to Wishlist'}
                  </button>
                  <button
                    onClick={() => {
                      // Track conversion for the experiment
                      console.log("Experiment Conversion", {
                        experimentId: "pdp-pricing-test",
                        variationId: variant,
                        action: "add_to_cart",
                        price: displayPrice
                      });

                      // Send conversion to GA4 with both GB IDs and standard Ecommerce fields
                      if (window.gtag) {
                        window.gtag("event", "add_to_cart", {
                          experiment_id: experiment?.key || "pdp-pricing-test",
                          variation_id: result?.key || variant,
                          currency: "USD",
                          value: displayPrice,
                          items: [{
                            item_id: item.id,
                            item_name: item.title,
                            price: displayPrice
                          }]
                        });
                      }

                      // GrowthBook Managed Warehouse Tracking
                      if (growthbook && typeof growthbook.track === "function") {
                        growthbook.track("add_to_cart", {
                          product_id: item.id,
                          price: displayPrice,
                          variant: variant
                        });
                      }

                      // Dispatch to cart
                      dispatch(addToCart({ ...item, price: displayPrice, variantUsed: variant }));
                      navigate('/cart');
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl text-lg"
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
