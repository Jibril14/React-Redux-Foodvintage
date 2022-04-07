import { configureStore } from "@reduxjs/toolkit";
import foodReducer from "./reducer";

export const store = configureStore({
    reducer: {
        foodReducer
    }
});
