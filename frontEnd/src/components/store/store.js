import {  configureStore } from "@reduxjs/toolkit"
import GetProductsSlice from "./GetProductsSlice.jsx"


export const store = configureStore({
    reducer:{
       productReducer: GetProductsSlice
    },
    middleware: (getDefaultMiddleware) =>
    [...getDefaultMiddleware()]
})

