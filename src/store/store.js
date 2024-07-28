import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import updateSlice from "./updateSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        update: updateSlice
    }
})

export default store