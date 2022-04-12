import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import foodReducer from "./reducers/restaurant";
import orderReducer from "./reducers/order";

export const store = configureStore(
    {
        reducer: {
            restaurantFood: foodReducer,
            restaurantOrder: orderReducer
        }
    },
    applyMiddleware(thunk)
);
