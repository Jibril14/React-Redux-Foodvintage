import { configureStore } from "@reduxjs/toolkit";
import foodReducer from "./reducers/restaurant";

export const store = configureStore({
    reducer: {
        foodReducer
    }
});
