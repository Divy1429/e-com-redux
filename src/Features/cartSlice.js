import { createSlice } from '@reduxjs/toolkit'


const cartSlice = createSlice({
    name: "cart",
    initialState: { items: [] },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existing = state.items.find((item) => item.id === product.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                });
            }
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter((item) => item.id !== id);
        },
        increaseQuantity: (state, action) => {
            const id = action.payload;
            const item = state.items.find((item) => item.id === id);
            if (item) item.quantity += 1;
        },
        decreaseQuantity: (state, action) => {
            const id = action.payload;
            const item = state.items.find((item) => item.id === id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else if (item && item.quantity === 1) {
                // optional: remove item if quantity goes to 0
                state.items = state.items.filter((it) => it.id !== id);
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    }
})

export const { addToCart, removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart, } = cartSlice.actions;

export default cartSlice.reducer;