import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setSearch,
  setCategory,
  setPriceRange,
} from "../Features/productsSlice";
import { addToCart } from "../Features/cartSlice";
import { addToWishlist, removeFromWishlist } from "../Features/wishlistSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, status, error, search, category, priceRange } = useSelector(
    (state) => state.products
  );
  const wishlistItems = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") return <div>Loading products...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  // Build category options from items
  const categories = ["all", ...new Set(items.map((item) => item.category))];

  // Filter step-by-step
  let filteredItems = items;

  // 1) Search filter
  if (search.trim() !== "") {
    filteredItems = filteredItems.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  // 2) Category filter
  if (category !== "all") {
    filteredItems = filteredItems.filter(
      (item) => item.category === category
    );
  }

  // 3) Price range filter
  if (priceRange !== "all") {
    const [min, max] = priceRange.split("-").map(Number);
    filteredItems = filteredItems.filter(
      (item) => item.price >= min && item.price <= max
    );
  }

  return (
    <div className="w-full min-h-screen py-8 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Our Products!
        </h1>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-full max-w-xs bg-white shadow-md rounded-lg p-4 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Filters
            </h2>

            {/* Search */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                placeholder="Search products..."
                value={search}
                onChange={(e) => dispatch(setSearch(e.target.value))}
              />
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                value={category}
                onChange={(e) => dispatch(setCategory(e.target.value))}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                value={priceRange}
                onChange={(e) => dispatch(setPriceRange(e.target.value))}
              >
                <option value="all">All Prices</option>
                <option value="0-50">$0 - $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="100-1000">$100 - $1000</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredItems.length === 0 && (
              <p className="text-center text-gray-500 mb-4">
                No products found with selected filters.
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col"
                  onClick={() => navigate(`/details/${item.id}`)}
                >
                  <div className="relative bg-white p-6 flex items-center justify-center h-64">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-contain h-full w-full max-h-52 transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      #{item.id}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const isInWishlist = wishlistItems.some((w) => w.id === item.id);
                        if (isInWishlist) {
                          dispatch(removeFromWishlist(item.id));
                        } else {
                          dispatch(addToWishlist(item));
                        }
                      }}
                      className={`absolute top-4 left-4 p-2 rounded-full transition-all duration-200 ${
                        wishlistItems.some((w) => w.id === item.id)
                          ? 'bg-pink-500 text-white'
                          : 'bg-white text-gray-400 hover:text-pink-500'
                      } shadow-md hover:shadow-lg`}
                      title={wishlistItems.some((w) => w.id === item.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
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

                  <div className="p-6 flex flex-col grow bg-linear-to-b from-white to-gray-50">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2 min-h-14">
                      {item.title}
                    </h3>

                    <div className="mt-auto pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-green-600">
                          ${item.price}
                        </span>
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(addToCart(item));
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
