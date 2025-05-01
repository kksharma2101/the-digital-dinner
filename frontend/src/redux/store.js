import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./reducers/menuReducer";
import cartReducer from "./reducers/cartReducer";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    cart: cartReducer,
  },
});

export default store;
