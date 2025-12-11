import { createSlice } from '@reduxjs/toolkit'

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: { items: [] },
    reducers: {
        addToWishlist: (state, action) => {
            const product = action.payload;
            const existing = state.items.find((item) => item.id === product.id);
            if (!existing) {
                state.items.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    category: product.category,
                    rating: product.rating,
                });
            }
        },
        removeFromWishlist: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter((item) => item.id !== id);
        },
        clearWishlist: (state) => {
            state.items = [];
        },
    }
})

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
