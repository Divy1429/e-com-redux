import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist, clearWishlist } from "../Features/wishlistSlice";
import { addToCart } from "../Features/cartSlice";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector((state) => state.wishlist.items);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Your wishlist is empty 💝</h2>
          <p className="text-gray-600 mb-6">Start adding products you love!</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Explore Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">My Wishlist ({items.length})</h2>
          <button
            className="text-sm text-red-500 hover:text-red-600 font-semibold"
            onClick={() => dispatch(clearWishlist())}
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div 
                className="relative bg-white p-6 flex items-center justify-center h-64 cursor-pointer"
                onClick={() => navigate(`/details/${item.id}`)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-contain h-full w-full max-h-52 transition-transform duration-300 hover:scale-110"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(removeFromWishlist(item.id));
                  }}
                  className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                  title="Remove from wishlist"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-6 flex flex-col grow bg-linear-to-b from-white to-gray-50">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2 min-h-14">
                  {item.title}
                </h3>

                {item.category && (
                  <span className="text-xs text-gray-500 mb-2 capitalize">
                    {item.category}
                  </span>
                )}

                <div className="mt-auto pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-green-600">
                      ${item.price}
                    </span>
                    {item.rating && (
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-yellow-500">★</span>
                        <span className="font-semibold">{item.rating.rate}</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      dispatch(addToCart(item));
                      dispatch(removeFromWishlist(item.id));
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    Move to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
