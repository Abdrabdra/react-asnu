import { createSlice } from "@reduxjs/toolkit";

const basketReducer = createSlice({
  name: "basket",
  initialState: {
    basket: [],
  },
  reducers: {
    addBasket(state, action) {
      state.basket.push({
        id: action.payload._id,
        title: action.payload.title,
        price: action.payload.price,
        picture: action.payload.picture,
        completed: false,
      });
    },
    // toggleComplete(state, action) {
    //   const toggledBasket = state.basket.find(
    //     (basket) => basket.id === action.payload.id
    //   );
    //   toggledBasket.completed = !toggledBasket.completed;
    // },
    removeBasket(state, action) {
      state.basket = state.basket.filter(
        (basket) => basket.id !== action.payload.id
      );
    },
  },
});

export const { addBasket, removeBasket } = basketReducer.actions;

export default basketReducer.reducer;
