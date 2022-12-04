import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import movieReducer from "./movieReducer";

export const store = configureStore({
    reducer: {
        auth:authReducer,
        movies:movieReducer
    }
})



