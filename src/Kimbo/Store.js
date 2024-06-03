import { configureStore } from "@reduxjs/toolkit";
import {Slice} from "./Slice";

const listReducer = Slice.reducer;

export const store = configureStore({
    reducer: {
        list: listReducer,
    }
});