import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// export const getTotalQuantity = (state) =>
//   state.cart.cart.reduce((acc, item) => acc + item.quantity, 0);

// export const getTotalPrice = (state) =>
//   state.cart.cart.reduce(
//     (acc, item) => acc + item.unitPrice * item.quantity,
//     0,
//   );

export const getCart = createSelector(
  (state) => state.cart.cart,
  (cart) => cart,
);

export const selectTotalQuantity = createSelector(
  (state) => state.cart.cart,
  (items) => items.reduce((acc, item) => acc + item.quantity, 0),
);

export const selectTotalPrice = createSelector(
  (state) => state.cart.cart,
  (items) =>
    items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0),
);

export const getCurrentQuantityById = (id) =>
  createSelector(
    (state) => state.cart.cart,
    (items) => items.find((item) => item.pizzaId === id)?.quantity ?? 0,
  );
