import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
}
interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [
        {
            id: 1,
            name: "Product 1",
            image: "https://via.placeholder.com/150",
            price: 19.99,
            quantity: 1,
        },
        {
            id: 2,
            name: "Product 2",
            image: "https://via.placeholder.com/150",
            price: 29.99,
            quantity: 1,
        },
        {
            id: 3,
            name: "Product 3",
            image: "https://via.placeholder.com/150",
            price: 39.99,
            quantity: 1,
        },
        {
            id: 4,
            name: "Product 4",
            image: "https://via.placeholder.com/150",
            price: 49.99,
            quantity: 1,
        },
        {
            id: 5,
            name: "Product 5",
            image: "https://via.placeholder.com/150",
            price: 59.99,
            quantity: 1,
        }
    ],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find((item) => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        addManualOrder: (state, action: PayloadAction<CartItem>) => {
            state.items.push(action.payload);

        },
        applyDiscount: (state, action: PayloadAction<number>) => {
            state.items.forEach((item) => {
                item.price -= item.price * (action.payload / 100);
            });
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const item = state.items.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, addManualOrder, applyDiscount, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;