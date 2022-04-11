import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import foodReducer from "./reducers/restaurant";

export const store = configureStore(
    {
        reducer: {
            foodReducer
        }
    },
    applyMiddleware(thunk)
);
