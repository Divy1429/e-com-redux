import React from 'react'
import Home from './Components/Home';
import { BrowserRouter as Router, Route, Routes , Link} from 'react-router-dom';
import Details from './Components/Details';
import Cart from './Components/Cart';
import Wishlist from './Components/Wishlist';
import { useSelector } from 'react-redux';

const App = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <Router>
      <div>
        {/* simple navbar */}
        <nav className="bg-white gap-10 fixed shadow mb-4 px-6 py-3 flex justify-between items-center">
          <Link to="/" className="font-bold text-lg text-gray-800 hover:text-blue-600 transition">
            🛍️ Store
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/wishlist" className="text-pink-600 font-semibold hover:text-pink-700 transition flex items-center gap-2">
              💝 Wishlist {wishlistCount > 0 && <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">{wishlistCount}</span>}
            </Link>
            <Link to="/cart" className="text-blue-600 font-semibold hover:text-blue-700 transition flex items-center gap-2">
              🛒 Cart {cartCount > 0 && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{cartCount}</span>}
            </Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details  />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App