import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Features/cartSlice";
import { addToWishlist, removeFromWishlist } from "../Features/wishlistSlice";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items } = useSelector(state => state.products);
  const wishlistItems = useSelector(state => state.wishlist.items);
  
  const productId = Number(id);
  const item = items.find((p) => p.id === productId); 

  if (!item) return <div className="text-center py-20 text-xl">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
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
              <div className="absolute top-4 right-4 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-full">
                ID: #{item.id}
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
                className={`absolute top-4 left-4 p-3 rounded-full transition-all duration-200 ${
                  wishlistItems.some((w) => w.id === item.id)
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
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-bold text-green-600">
                    ${item.price}
                  </span>
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
                    className={`flex-1 font-bold py-4 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl text-lg ${
                      wishlistItems.some((w) => w.id === item.id)
                        ? 'bg-pink-500 hover:bg-pink-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    {wishlistItems.some((w) => w.id === item.id) ? '💝 In Wishlist' : '🤍 Add to Wishlist'}
                  </button>
                  <button 
                    onClick={() => {
                      dispatch(addToCart(item));
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